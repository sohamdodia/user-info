"use strict";
require("dotenv").config();

const jwtSecret = "E=MC2";

exports.const = {
  apiPort: process.env.PORT || process.env.API_PORT || 6005,
  dbHost: process.env.DB_HOST || "localhost",
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "",
  database: process.env.DATABASE || "tricog",
  token: {
    secret: jwtSecret,
    expiryTime: 36 * 36 * 720
  }
};
