const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");

const config = require("../config");
const messages = require("../messages");

const db = require("./db");

AWS.config.update({
  accessKeyId: "accessKey",
  secretAccessKey: "secretKey"
});

const s3 = new AWS.S3();

// Generate error message
const getErrorMessage = (error = {}, message = "Something went wrong.") => {
  const result = {};

  result.status = false;
  result.message = message;
  result.data = null;
  result.error = error;

  return result;
};

// Generate success message
const getSuccessMessage = (
  data = {},
  message = "Request completed successfully."
) => {
  const result = {};

  result.status = true;
  result.message = message;
  result.data = data;
  result.error = null;

  return result;
};

const generateToken = id =>
  jwt.sign({ id }, config.const.token.secret, {
    expiresIn: config.const.token.expiryTime
  });

const validteToken = async (req, res, next) => {
  try {
    if (req.headers.hasOwnProperty("authorization")) {
      const parts = req.headers.authorization.split(" ");
      const [, token] = parts;
      if (token) {
        //decode token if token found
        jwt.verify(token, config.const.token.secret, async (err, decoded) => {
          //verifies token and checks exp
          if (err) {
            return res
              .status(401)
              .json(getErrorMessage({}, messages.userUnauthorized));
          }
          const user = await db.users.findByPk(decoded.id);
          if (!user) {
            return res
              .status(401)
              .json(getErrorMessage({}, messages.userUnauthorized));
          }
          req.user = user;
          next();
        });
      } else {
        // if there is no token return error
        return res
          .status(401)
          .json(getErrorMessage({}, messages.userUnauthorized));
      }
    } else {
      return res
        .status(401)
        .json(customErrorMessage({}, messages.userUnauthorized));
    }
  } catch (error) {
    return res.status(401).json(getErrorMessage({}, messages.userUnauthorized));
  }
};

const uploadMedia = (data, Key, bucket) => {
  let params = {
    ACL: "public-read",
    Bucket: bucket,
    Key: Key,
    Body: data
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getErrorMessage,
  getSuccessMessage,
  generateToken,
  validteToken,
  uploadMedia
};
