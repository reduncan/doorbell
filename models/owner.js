module.exports = function(sequelize, DataTypes) {
    const Owner = sequelize.define("Owner", {
      first_name: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      phone_number: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      email_address:{
        type: DataTypes.STRING(30),
        allowNull: false
      },
      email_password:{
        type: DataTypes.STRING(30),
        allowNull: false
      }
    });
    return Owner;
  };