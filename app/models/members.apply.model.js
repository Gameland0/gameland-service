module.exports = (sequelize, Sequelize) => {
  // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
  const MembersApply = sequelize.define("members-apply", {
    ddress: {
      type: Sequelize.STRING
    },
    guildId: {
      type: Sequelize.BIGINT
    },
    status: {
      type: Sequelize.INTEGER
    }
  });

  return MembersApply;
};