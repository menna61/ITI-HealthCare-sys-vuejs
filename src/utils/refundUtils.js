import { doc, getDoc, updateDoc, setDoc, addDoc, collection } from "firebase/firestore";

/**
 * Calculates the refund amount and type based on cancellation rules.
 * @param {Object} appointment - The appointment object containing date, time, and price.
 * @param {string} cancellerRole - The role of the canceller ('patient' or 'doctor').
 * @returns {Object} - { refundAmount, refundType }
 */
export function calculateRefund(appointment, cancellerRole) {
  const appointmentDateTime = new Date(`${appointment.date} ${appointment.time}`);
  const now = new Date();
  const timeDiffHours = (appointmentDateTime - now) / (1000 * 60 * 60);

  let refundAmount;
  let refundType;

  if (cancellerRole === "patient") {
    if (timeDiffHours > 12) {
      refundAmount = appointment.price;
      refundType = "Full refund";
    } else {
      refundAmount = appointment.price * 0.15;
      refundType = "15% refund";
    }
  } else {
    // doctor or admin
    refundAmount = appointment.price;
    refundType = "Full refund";
  }

  return { refundAmount, refundType };
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
