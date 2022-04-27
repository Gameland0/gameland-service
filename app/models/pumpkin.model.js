module.exports = (sequelize, Sequelize) => {
  // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
  const Pumpkin = sequelize.define("pumpkin", {
    nftId: {
      type: Sequelize.STRING
    },
    gamelandNftId: {
      type: Sequelize.BIGINT
    },
    contractAddress: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    img: {
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
    owner: {
      type: Sequelize.STRING
    },
    originOwner: {
      type: Sequelize.STRING
    }
  });

  return Pumpkin;
};