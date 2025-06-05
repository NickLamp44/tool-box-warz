import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase.js";
import { MockShowCase } from "./mockShowCASE.js";

export const seedShowCases = async () => {
  try {
    for (const showCase of MockShowCase) {
      const showCaseRef = doc(db, "showcases", showCase.id);
      await setDoc(showCaseRef, showCase);
      console.log(`✅ Seeded showcase: ${showCase.id}`);
    }
    console.log("🎉 All mock showcases have been seeded.");
  } catch (error) {
    console.error("🔥 Error seeding showcase data:", error.message);
  }
};

// Optional: Run directly in dev mode (comment this line in production)
seedShowCases();
