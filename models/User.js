var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
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
    },
    displayName: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [1, 140]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    }
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  // Associate users with managers
  // User.associate = function(models) {
  //   User.belongsTo(models.Manager, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  // Associate to tasks
  User.associate = function(models) {
    User.hasMany(models.Task, {
      onDelete: "cascade"
    });
  };

  return User;
};
