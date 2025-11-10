import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_ocr8arp";
const EMAILJS_TEMPLATE_ID = "template_72mbtqk";
const EMAILJS_PUBLIC_KEY = "jPio5EtzFqeJ_k9wB";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Store OTPs temporarily (in production, use backend/database)
const otpStore = new Map();

/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit OTP
 */
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP via EmailJS
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} userType - 'patient' or 'doctor'
 * @returns {Promise<{success: boolean, otp?: string, error?: string}>}
 */
export async function sendOTP(email, name, userType = "user") {
  try {
    const otp = generateOTP();
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP with expiration
    otpStore.set(email, {
      otp,
      expirationTime,
      attempts: 0,
    });

    // Prepare email template parameters
    const templateParams = {
      to_email: email,
      to_name: name,
      otp_code: otp,
      user_type: userType === "doctor" ? "Doctor" : "Patient",
      expiry_minutes: "5",
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log("OTP sent successfully:", response);

    return {
      success: true,
      otp, // In production, don't return OTP
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      error: error.text || error.message || "Failed to send OTP",
    };
  }
}

/**
 * Verify OTP
 * @param {string} email - User email
 * @param {string} inputOTP - OTP entered by user
 * @returns {{success: boolean, error?: string}}
 */
export function verifyOTP(email, inputOTP) {
  const storedData = otpStore.get(email);

  if (!storedData) {
    return {
      success: false,
      error: "OTP not found. Please request a new one.",
    };
  }

  // Check if OTP expired
  if (Date.now() > storedData.expirationTime) {
    otpStore.delete(email);
    return {
      success: false,
      error: "OTP has expired. Please request a new one.",
    };
  }

  // Check attempts (max 5 attempts)
  if (storedData.attempts >= 5) {
    otpStore.delete(email);
    return {
      success: false,
      error: "Too many failed attempts. Please request a new OTP.",
    };
  }

  // Verify OTP
  if (storedData.otp === inputOTP) {
    otpStore.delete(email);
    return {
      success: true,
    };
  } else {
    storedData.attempts += 1;
    otpStore.set(email, storedData);
    return {
      success: false,
      error: `Invalid OTP. ${5 - storedData.attempts} attempts remaining.`,
    };
  }
}

/**
 * Get remaining time for OTP
 * @param {string} email - User email
 * @returns {number} Remaining time in seconds, or 0 if expired/not found
 */
export function getRemainingTime(email) {
  const storedData = otpStore.get(email);

  if (!storedData) {
    return 0;
  }

  const remaining = Math.max(0, Math.floor((storedData.expirationTime - Date.now()) / 1000));
  return remaining;
}

/**
 * Clear OTP for email
 * @param {string} email - User email
 */
export function clearOTP(email) {
  otpStore.delete(email);
}

/**
 * Check if OTP exists and is valid
 * @param {string} email - User email
 * @returns {boolean}
 */
export function hasValidOTP(email) {
  const storedData = otpStore.get(email);
  if (!storedData) return false;
  return Date.now() <= storedData.expirationTime;
}
