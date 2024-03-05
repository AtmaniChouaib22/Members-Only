const crypto = require("crypto");
require("dotenv").config();

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return {
    salt,
    hash,
  };
}

function validatePassword(password, hash, salt) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVerify;
}

function ValidateAdminRegistration(adminPass) {
  if (adminPass === process.env.ADMINPASS) {
    return true;
  } else {
    return false;
  }
}

module.exports = { genPassword, validatePassword, ValidateAdminRegistration };
