module.exports = function(sequelize, DataTypes) {
    const Visitor = sequelize.define("Visitor", {
      first_name: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      image_url: {
          type: DataTypes.STRING(140),
          allowNull: false
      }
    });
    return Visitor;
  };