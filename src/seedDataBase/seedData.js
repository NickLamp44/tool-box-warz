import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase.js";
import { mockComments } from "./mockComments.js";

export const seedComments = async () => {
  try {
    for (const comment of mockComments) {
      const commentRef = doc(db, "comments", comment.id);
      await setDoc(commentRef, comment);
      console.log(`✅ Seeded comment: ${comment.id}`);
    }
    console.log("🎉 All mock comments have been seeded.");
  } catch (error) {
    console.error("🔥 Error seeding comment data:", error.message);
  }
};

// Optional: Run directly in dev mode (comment this line in production)
seedComments();
