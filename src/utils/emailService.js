import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_CANCELLATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CANCELLATION_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Send telemedicine appointment confirmation email
 * @param {Object} params - Email parameters
 * @param {string} params.patientEmail - Patient's email address
 * @param {string} params.patientName - Patient's name
 * @param {string} params.doctorName - Doctor's name
 * @param {string} params.appointmentDate - Appointment date
 * @param {string} params.appointmentTime - Appointment time
 * @param {string} params.sessionLink - Telemedicine session link
 * @returns {Promise} EmailJS response
 */
export const sendTelemedicineEmail = async ({
  patientEmail,
  patientName,
  doctorName,
  appointmentDate,
  appointmentTime,
  sessionLink,
}) => {
  try {
    const templateParams = {
      to_email: patientEmail,
      patient_name: patientName,
      doctor_name: doctorName,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      session_link: sessionLink,
    };

    // Log the parameters being sent for debugging
    console.log('📧 Email Parameters being sent:', templateParams);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Send appointment cancellation email
 * @param {Object} params - Email parameters
 * @param {string} params.patientEmail - Patient's email address
 * @param {string} params.patientName - Patient's name
 * @param {string} params.doctorName - Doctor's name
 * @param {string} params.appointmentDate - Appointment date
 * @param {string} params.appointmentTime - Appointment time
 * @param {number} params.refundAmount - Refund amount
 * @param {string} params.cancellationReason - Reason for cancellation
 * @returns {Promise} EmailJS response
 */
export const sendCancellationEmail = async ({
  patientEmail,
  patientName,
  doctorName,
  appointmentDate,
  appointmentTime,
  refundAmount,
  cancellationReason,
}) => {
  try {
    const templateParams = {
      to_email: patientEmail,
      patient_name: patientName,
      doctor_name: doctorName,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      refund_amount: refundAmount,
      cancellation_reason: cancellationReason,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CANCELLATION_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Cancellation email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    throw error;
  }
};
