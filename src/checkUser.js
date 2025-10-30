import { router } from "./router.js";
import { doc, getDoc } from "firebase/firestore";
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

// Helper: redirect based on user role
function redirectByRole(role, next) {
  switch (role) {
    case "patient":
      // return next({ path: "/profile/home" });
      return next({ path: "/patient/home" });
    case "doctor":
      return next({ path: "/dashboard/calendar" });
    case "admin":
      return next({ path: "/admin/dashboard" });
    default:
      return next({ path: "/login" });
  }
}

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();

  // Require auth
  if (to.meta?.requiresAuth && !user) return next({ path: "/login" });

  // If user exists but not verified -> prevent access to dashboards
  if (user && !user.emailVerified) {
    if (to.meta?.requiresAuth) return next({ path: "/login" });
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
          role = patientSnap.data()?.role || "patient";
        } else {
          const doctorSnap = await getDoc(doc(db, "doctors", uid));
          if (doctorSnap.exists()) {
            role = doctorSnap.data()?.role || "doctor";
          } else {
            const adminSnap = await getDoc(doc(db, "admin", uid));
            if (adminSnap.exists()) {
              role = adminSnap.data()?.role || "admin";
            }
          }
        }
      }

      return redirectByRole(role, next);
    } catch (err) {
      console.error("Error resolving role in guard:", err);
      return next({ path: "/login" });
    }
  }

  return next();
});
