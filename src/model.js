module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name"
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name"
    },
    fatherName: {
      type: DataTypes.STRING,
      field: "father_name"
    },
    panNumber: {
      type: DataTypes.STRING,
      field: "pan_number"
    },
    dob: {
      type: DataTypes.DATEONLY
    },
    gender: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    profileImage: {
      type: DataTypes.STRING,
      field: "profile_image"
    }
  });
  Users.sync();
  return Users;
};
