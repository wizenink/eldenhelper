const config = require('../config')
var mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const possible_bosses = require('../src/models/bosses');
const platforms = ["PC","XBOX","PLAYSTATION"];
const Helper = require('../src/models/helperModel');
const nData = 100;


function createHelper()
{
    const shuffled = possible_bosses.sort(() => 0.5 - Math.random());
    let nbosses = Math.floor(Math.random() * possible_bosses.length);

    let bosses = shuffled.slice(0, nbosses);
    let platform = platforms[Math.floor(Math.random() * platforms.length)];
    let name = faker.name.findName();
    let password = faker.random.alphaNumeric(5);

    let newHelper = new Helper({
        platform: platform,
        bosses: bosses,
        name:name,
        password:password
    })

    return newHelper;
}

function seed()
{
    const mongoUrl = `mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority&ssl=true`
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    !db ? console.log("Error connecting db") : console.log("Db connected successfully");

    for(i = 0; i < nData; i++)
    {
        newHelper = createHelper();
        newHelper.save().then(() => console.log("saved ",newHelper));
    }
}


module.exports = {createHelper,seed}
