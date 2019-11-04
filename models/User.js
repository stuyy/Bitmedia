
const { Sequelize, Model, DataTypes } = require('sequelize');

class User extends Model { 
    static init(sequelize) {
        return super.init({
            email: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING
            },
            lastName: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            }
        }, {
            sequelize: sequelize,
            tableName: 'Users',
            timestamps: true
        })
    }
}

module.exports = User;