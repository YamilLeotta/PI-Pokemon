const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tipo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(10),
      unique: true,
      validate: {
        notEmpty: true,
        isAlpha: true,
        isLowercase: true
      },
      set(value) {
        this.setDataValue('name', value.toLowerCase());
      }
    }
  }, {
      timestamps: false
  })
};
