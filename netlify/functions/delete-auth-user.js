import admin from "firebase-admin";

// ✅ Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  if (!process.env.FIREBASE_CLIENT_EMAIL || !privateKey || !process.env.FIREBASE_PROJECT_ID) {
    console.error("❌ Missing Firebase Admin credentials in environment variables");
    throw new Error("Missing Firebase Admin credentials");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { uid } = JSON.parse(event.body);

    if (!uid) {
      console.error("❌ Error: Missing uid");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "uid is required" }),
      };
    }

    console.log("🗑️ Deleting user from Firebase Auth:", uid);
    await admin.auth().deleteUser(uid);
    console.log("✅ User deleted successfully from Firebase Auth:", uid);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User deleted successfully from Authentication" }),
    };
  } catch (error) {
    console.error("❌ Error deleting auth user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Failed to delete user from Authentication" }),
    };
  }
};
