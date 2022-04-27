module.exports = (sequelize, Sequelize) => {
  // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
  const Opensea = sequelize.define("opensea", {
    nftId: {
      type: Sequelize.STRING
    },
    contractAddress: {
      type: Sequelize.STRING
    },
    gamelandNftId: {
      type: Sequelize.STRING,
      unique: true
    },
    metadata: {
      type: Sequelize.STRING
    },
    originOwner: {
      type: Sequelize.STRING
    },
    isLending: {
      type: Sequelize.BOOLEAN
    },
    isBorrowed: {
      type: Sequelize.BOOLEAN
    },
    price: {
      type: Sequelize.FLOAT
    },
    days: {
      type: Sequelize.INTEGER
    },
    collateral: {
      type: Sequelize.DOUBLE
    },
    borrower: {
      type: Sequelize.STRING
    },
    borrowAt: {
      type: Sequelize.DATE
    },
    withdrawable:{
      type: Sequelize.BOOLEAN
    },
    isExpired: {
      type: Sequelize.BOOLEAN
    },
    standard: {
      type: Sequelize.STRING
    }
  });

  return Opensea;
};