const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "mockUsers.js");
const { mockUsers } = require(filePath);

const getPasswordByRole = (role) => {
  switch (role) {
    case "admin":
      return "testAdmin123";
    case "moderator":
      return "testMod123";
    default:
      return "testUser123";
  }
};

const hashAndInjectPasswords = async () => {
  const enrichedUsers = [];

  for (const user of mockUsers) {
    const passwordPlain = getPasswordByRole(user.role);
    const passwordHash = await bcrypt.hash(passwordPlain, 10);
    enrichedUsers.push({ ...user, passwordHash });
  }

  const output = `const mockUsers = ${JSON.stringify(
    enrichedUsers,
    null,
    2
  )};\nmodule.exports = { mockUsers };`;

  fs.writeFileSync(filePath, output);
  console.log("✅ mockUsers.js updated with hashed passwords.");
};

hashAndInjectPasswords();
