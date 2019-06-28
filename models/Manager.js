module.exports = function(sequelize, DataTypes) {
  var Manager = sequelize.define("Manager", {
    name: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [1, 140]
      }
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [1, 140]
      }
    }
  });

  // Manager.associate = function(models) {
  //   Manager.hasMany(models.User, {
  //     onDelete: "cascade"
  //   });
  // };

  return Manager;
};
