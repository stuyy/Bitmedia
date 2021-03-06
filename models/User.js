
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
            tableName: 'Users',
            timestamps: true,
            sequelize: sequelize,
        })
    }
    static async hashPassword(pw) {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(pw, salt);
        return hash ? hash : null;
    }
    async comparePassword(pass, hash) {
        return await bcrypt.compare(pass, hash);
    }
}

module.exports = User;
