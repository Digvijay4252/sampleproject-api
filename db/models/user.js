
module.exports = (sequelize, DataTypes) => {

    const user = sequelize.define('users', {
      id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
      config: {
        type: DataTypes.JSON,
        defaultValue: null
      },
      google_config: {
        type: DataTypes.JSON,
        defaultValue: null
      }
    })
  
     return user;
  };