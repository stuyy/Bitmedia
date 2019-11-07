const { Model, DataTypes } = require('sequelize');
class StatusUpdate extends Model {
    static init(sequelize) {
        return super.init({
            author: {
                type: DataTypes.STRING
            },
            authorId: {
                type: DataTypes.STRING,
                references: {
                    model: 'Users',
                    key: 'email',
                }
            },
            statusContent: {
                type: DataTypes.TEXT
            }
        }, { sequelize, tableName: 'StatusUpdate', timestamps: true })
    }
}

module.exports = StatusUpdate;