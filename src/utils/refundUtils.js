import { doc, getDoc, updateDoc, setDoc, addDoc, collection } from "firebase/firestore";

/**
 * Calculates the refund amount and type based on cancellation rules.
 * @param {Object} appointment - The appointment object containing date, time, and price.
 * @param {string} cancellerRole - The role of the canceller ('patient' or 'doctor').
 * @returns {Object} - { refundAmount, refundType, doctorEarnings, adminCommission }
 */
export function calculateRefund(appointment, cancellerRole) {
  const appointmentDateTime = new Date(`${appointment.date} ${appointment.time}`);
  const now = new Date();
  const timeDiffHours = (appointmentDateTime - now) / (1000 * 60 * 60);

  let refundAmount;
  let refundType;
  let doctorEarnings = 0;
  let adminCommission = 0;

  if (cancellerRole === "patient") {
    if (timeDiffHours > 12) {
      // Full refund to patient, nothing to doctor or admin
      refundAmount = appointment.price;
      refundType = "Full refund";
      doctorEarnings = 0;
      adminCommission = 0;
    } else {
      // Patient gets 15%, remaining 85% split between doctor and admin
      refundAmount = appointment.price * 0.15;
      refundType = "15% refund";
      
      const remainingAmount = appointment.price * 0.85;
      adminCommission = remainingAmount * 0.05; // 5% من الـ 85% = 4.25% من الإجمالي
      doctorEarnings = remainingAmount * 0.95; // 95% من الـ 85% = 80.75% من الإجمالي
    }
  } else {
    // doctor or admin cancels - full refund to patient
    refundAmount = appointment.price;
    refundType = "Full refund";
    doctorEarnings = 0;
    adminCommission = 0;
  }

  return { refundAmount, refundType, doctorEarnings, adminCommission };
}

/**
 * Processes the refund by updating the patient's wallet and adding a transaction record.
 * @param {Object} db - Firestore database instance.
 * @param {string} patientId - The patient's user ID.
 * @param {number} refundAmount - The amount to refund.
 * @param {string} refundType - The type of refund (e.g., "Full refund").
 * @param {string} description - Description for the transaction.
 * @returns {Promise<void>}
 */
export async function processRefund(db, patientId, refundAmount, refundType, description) {
  const patientRef = doc(db, "patients", patientId);
  const patientSnap = await getDoc(patientRef);
  if (patientSnap.exists()) {
    const currentWallet = patientSnap.data().wallet || 0;
    const newWallet = currentWallet + refundAmount;
    await updateDoc(patientRef, { wallet: newWallet });
  } else {
    await setDoc(patientRef, { wallet: refundAmount }, { merge: true });
  }

  // Add transaction record
  await addDoc(collection(db, "patients", patientId, "transactions"), {
    description,
    amount: refundAmount,
    date: new Date(),
  });
}
