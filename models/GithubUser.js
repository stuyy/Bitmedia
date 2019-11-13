const { Model, DataTypes } = require('sequelize');

/**
 * GithubUser and User have a One-to-One relationship. 
 * A User is an account registered either locally, or through Google, Facebook, GitHub
 * OAuth2 Strategy. If a User chooses to connect their Google account, only one may be
 * connected at once. Likewise, only one Google account may correspond to a User.
 */
class GithubUser extends Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            githubId: {
                type: DataTypes.STRING
            },
            connected: {
                type: DataTypes.BOOLEAN
            }
        },
        {
            tableName: 'GithubUser',
            sequelize: sequelize,
            timestamps: true
        })
    }
}

module.exports = GithubUser;