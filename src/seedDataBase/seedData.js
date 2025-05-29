import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase.js";
import { mockBlogs } from "./mockBlogs.js";

export const seedBlogs = async () => {
  try {
    for (const blog of mockBlogs) {
      const blogRef = doc(db, "blogs", blog.id);
      await setDoc(blogRef, blog);
      console.log(`✅ Seeded blog: ${blog.title}`);
    }
    console.log("🎉 All mock blogs have been seeded.");
  } catch (error) {
    console.error("🔥 Error seeding blog data:", error.message);
  }
};

// Optional: Run directly in dev mode (comment this line in production)
seedBlogs();
