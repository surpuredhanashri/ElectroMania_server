module.exports = (sequelize, Sequelize) => {
  let orderTable = sequelize.define("orderSequelize", {
    id: {
      type: Sequelize.INTEGER,
    },
    title: { type: Sequelize.STRING },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },

    quantity: {
      type: Sequelize.INTEGER,
    },
    img: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    cid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });
  return orderTable;
};
