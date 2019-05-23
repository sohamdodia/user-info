const express = require("express");
const Joi = require("joi");
const multer = require("multer");

const schema = require("../schema");
const messages = require("../messages");

const utils = require("./utils");
const db = require("./db");

const Op = db.Sequelize.Op;
const router = express.Router();
const upload = multer();

const ROUTE_PREFIX = "/users";

router.post(
  `${ROUTE_PREFIX}/create`,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const validationResult = Joi.validate(
        Object.assign({}, req.body, { file: req.file }),
        schema.createUser,
        {
          abortEarly: false
        }
      );

      if (validationResult.error) {
        return res
          .status(400)
          .send(
            utils.getErrorMessage(
              validationResult.error,
              validationResult.error.details[0].message
            )
          );
      }
      const { email, panNumber } = req.body;

      const condition = {
        where: {
          [Op.or]: [
            {
              email
            },
            {
              panNumber
            }
          ]
        }
      };
      const retrivedUser = await db.users.findOne(condition);
      if (retrivedUser) {
        return res
          .status(400)
          .send(utils.getErrorMessage({}, messages.userExists));
      }

      //Upload Image to S3;
      // let name = data.file.originalname;
      // name = name.split('.');
      // const Key = `${new Date().getTime()}.${name[name.length - 1]}`;
      // const url = await utils.uploadMedia(req.file.buffer, Key, 'images')
      // req.body.profileImage = url

      req.body.profileImage =
        "https://d1qb2nb5cznatu.cloudfront.net/startups/i/1091501-2dda92b28ad6e4309d1f23977cd8f5ce-medium_jpg.jpg?buster=1460432983";

      const user = await db.users.create(req.body);
      const token = utils.generateToken(user.id);
      return res.status(200).send(
        utils.getSuccessMessage({
          user,
          token
        })
      );
    } catch (error) {
      return res.status(500).send(utils.getErrorMessage());
    }
  }
);

router.get(`${ROUTE_PREFIX}`, utils.validteToken, async (req, res) => {
  return res.status(200).send(utils.getSuccessMessage(req.user));
});

module.exports = router;
