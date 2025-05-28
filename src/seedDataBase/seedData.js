import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase.js";
import { mockMerch, sizesByCategory, colors } from "./mockMerch.js";
import { mockBlogs } from "./mockBlogs.js";

const seedMerchData = async () => {
  try {
    const merchCollection = collection(db, "merch");

    for (const item of mockMerch) {
      const numericPrice = parseFloat(item.price.replace("$", ""));

      const merchDoc = {
        ...item,
        price: numericPrice,
        sizes: sizesByCategory[item.category] || [],
        colors,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(merchCollection, item.id), merchDoc);
      console.log(`✅ Seeded merch item: ${item.title}`);
    }

    console.log("🎉 All merch items seeded successfully.");
  } catch (error) {
    console.error("🔥 Error seeding merch data:", error);
  }
};

const seedBlogData = async () => {
  try {
    const blogCollection = collection(db, "blogs");

    for (const blog of mockBlogs) {
      const blogDoc = {
        ...blog,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(blogCollection, blog.id), blogDoc);
      console.log(`✅ Seeded blog: ${blog.title}`);
    }

    console.log("🎉 All blogs seeded successfully.");
  } catch (error) {
    console.error("🔥 Error seeding blog data:", error);
  }
};

// Run both seeders when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedMerchData().then(seedBlogData);
}
