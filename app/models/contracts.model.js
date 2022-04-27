module.exports = (sequelize, Sequelize) => {
  // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
  const Contracts = sequelize.define("contracts", {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    standard: {
      type: Sequelize.STRING
    }
  });

  return Contracts;
};