import { router } from "./router.js";
import { doc, getDoc } from 'firebase/firestore'
import { onAuthChange, db } from "/src/authHandler.js";
// Helper: wait for auth state to be known
function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthChange((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();

  // Require auth
  if (to.meta?.requiresAuth && !user) return next({ path: "/login" });

  // If user exists but not verified -> prevent access to dashboards
  if (user && !user.emailVerified) {
    // If trying to access non-guest page, block and send to login with message
    if (to.meta?.requiresAuth) return next({ path: "/login" });
    // if visiting guest page, allow but don't redirect to dashboard
    if (to.meta?.guest) return next();
  }

  // guest route: if logged in and verified, redirect based on role
  if (to.meta?.guest && user && user.emailVerified) {
    try {
      const uid = user.uid;
      let role = null;
      if (db) {
        const patientSnap = await getDoc(doc(db, "patients", uid));
        if (patientSnap.exists()) {
          const data = patientSnap.data();
          role = data?.role || "patient";
        } else {
          const doctorSnap = await getDoc(doc(db, "doctors", uid));
          if (doctorSnap.exists()) {
            const data = doctorSnap.data();
            role = data?.role || "doctor";
          }
        }
      }

      if (role === "patient") return next({ path: "/patientDashboard" });
      if (role === "doctor") return next({ path: "/doctorDashboard" });
      return next({ path: "/login" });
    } catch (err) {
      console.error("Error resolving role in guard:", err);
      return next({ path: "/login" });
    }
  }

  return next();
});
