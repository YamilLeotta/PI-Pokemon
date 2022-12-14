const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.STRING(4), // Formato 'C123'
      primaryKey: true,
      allowNull: false,
      validate: {
        is: {
          args: /^C[1-9][0-9]*$/g,
          msg: 'Format should be "C1", "C12", "C123", (etc.) styled'
        }
      }
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        isLowercase: true
      },
      set(value) {
        this.setDataValue('name', value.toLowerCase());
      }
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      },
    }
  }, {
    timestamps: false
  });
};
