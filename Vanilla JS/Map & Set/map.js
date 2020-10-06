const u1 = { name: "Cynthia" };
const u2 = { name: "Jackson" };
const u3 = { name: "Olive" };
const u4 = { name: "James" };

const userRoles = new Map();

userRoles.set(u1, "User").set(u2, "User").set(u3, "Admin");
userRoles.set(u1, "Admin");

for (let [u, r] of userRoles) console.log(`${u.name}: ${r}`);

const arr = [...userRoles.values()];
