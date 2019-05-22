const express = require("express");

const db = require("./db");

const router = express.Router();

const ROUTE_PREFIX = "/users";

router.get(`${ROUTE_PREFIX}/create`, async (req, res) => {
  console.log("Got the request");
});

module.exports = router;
