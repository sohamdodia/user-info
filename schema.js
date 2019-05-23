const Joi = require("joi");
const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const dobRegex = /^(19[5-9][0-9]|20[0-4][0-9]|2050)[/-](0?[1-9]|1[0-2])[/-](0?[1-9]|[12][0-9]|3[01])$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.createUser = Joi.object({
  firstName: Joi.string()
    .required()
    .options({
      language: {
        any: {
          empty: "is required"
        }
      }
    })
    .label("First Name"),
  lastName: Joi.string()
    .required()
    .options({
      language: {
        any: {
          empty: "is required"
        }
      }
    })
    .label("Last Name"),
  fatherName: Joi.string()
    .required()
    .options({
      language: {
        any: {
          empty: "is required"
        }
      }
    })
    .label("Father Name"),
  panNumber: Joi.string()
    .required()
    .regex(panRegex, "AAAAA9999A")
    .options({
      language: {
        any: {
          empty: "is required"
        }
      }
    })
    .label("Pan Number"),
  dob: Joi.string()
    .required()
    .regex(dobRegex, "yyyy/mm/dd")
    .options({
      language: {
        any: {
          empty: "is required"
        }
      }
    })
    .label("Date of birth"),
  gender: Joi.any()
    .valid("male", "female")
    .required()
    .options({
      language: {
        any: {
          empty: "is required"
        }
      }
    })
    .label("Gender"),
  email: Joi.string()
    .required()
    .regex(emailRegex, "johndoe@gmail.com")
    .options({
      language: {
        any: {
          empty: "is required"
        }
      }
    })
    .label("Email"),
  address: Joi.string()
    .required()
    .options({
      language: {
        any: {
          empty: "is required"
        }
      }
    })
    .label("Address"),
  file: Joi.object()
    .required()
    .options({ language: { any: { empty: "is required" } } })
    .label("Profile Image")
});
