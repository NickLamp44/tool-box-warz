import { seedBlogs } from "../src/seedDataBase/seedData.js";

// Run seeding
(async () => {
  console.log("🚀 Seeding Firestore blog data...");
  await seedBlogs();
  console.log("✅ Done.");
})();
