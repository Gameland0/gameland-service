module.exports = (sequelize, Sequelize) => {
  // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
  const TestNfts = sequelize.define("test-nfts", {
    name: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    used: {
      type: Sequelize.BOOLEAN
    }
  });

  return TestNfts;
};