module.exports = (sequelize, Sequelize) => {
  const otpTable = sequelize.define("otpSequelize", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    useremail: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    otp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expiresIn: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  return otpTable;
};
