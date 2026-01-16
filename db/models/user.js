
module.exports = (sequelize, DataTypes) => {

    const user = sequelize.define('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
      name: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: null
      }
    }, {
      timestamps: true,
      underscored: true,
      tableName: 'users'
    })
    return user;
  };