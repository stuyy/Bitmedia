const { Model, DataTypes } = require('sequelize');

class Task extends Model {
    static init(sequelize) {
        return super.init({
            author: {
                type: DataTypes.STRING
            },
            title: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            authorId: {
                type: DataTypes.STRING,
                references: {
                    model: 'Users',
                    key: 'email'
                }
            },
            completed: {
                type: DataTypes.BOOLEAN
            }
        }, 
        {
            sequelize: sequelize,
            tableName: 'Tasks',
            timestamps: true
        })
    }
}

module.exports = Task;