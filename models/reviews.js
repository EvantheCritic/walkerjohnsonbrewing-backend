const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const reviews = sequelize.define("Reviews", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return reviews;
}