module.exports = (sequelize, Sequelize) => {
  // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
  const Guilds = sequelize.define("guilds", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    subtitle: {
      type: Sequelize.STRING
    },
    founderAddress: {
      type: Sequelize.STRING
    },
    founderEmail: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.STRING
    },
    membership: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.STRING
    },
    members: {
      type: Sequelize.BIGINT
    }

  });

  return Guilds;
};