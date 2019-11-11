require('dotenv').config();
const { Sequelize, Model } = require('sequelize');
const fs = require('fs').promises;
const path = require('path');

const connection = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    logging: false
});

(async function registerModels(dir = 'models') {
    // Read the directory/file.
    let files = await fs.readdir(path.join(__dirname, '..', dir));
    // Loop through each file.
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, '..', dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerModels(path.join(dir, file));
        else {
            // Check if file is a .js file.
            if(file.endsWith(".js")) {
                // Require the model.
                let model = require(path.join(__dirname, '..', dir, file));
                // Check if the model's prototype is an instance of Sequelize Model.
                if(model.prototype instanceof Model) {
                    model.init(connection).sync(); // Initialize and Sync model.
                    console.log("Initialized and Synced " + model.name);
                }
            }
        }
    }
})()
.then(() => console.log("Registered all models successfully."))
.catch(err => {
    console.log(err);
    process.exit(1)
})
module.exports = connection;
