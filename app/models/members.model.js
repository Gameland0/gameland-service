module.exports = (sequelize, Sequelize) => {
  // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
  const Members = sequelize.define("members", {
    name: {
      type: Sequelize.STRING
    },
    guildId: {
      type: Sequelize.BIGINT
    },
    address: {
      type: Sequelize.STRING
    },
    rank: {
      type: Sequelize.STRING
    },
    joinDate:{
      type: Sequelize.DATE
    },
    contribute:{
      type: Sequelize.BIGINT
    },
    rating:{
      type: Sequelize.BIGINT
    }

  });

  return Members;
};