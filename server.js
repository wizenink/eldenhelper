var config = require('./config')

var express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var mongoose = require('mongoose');

//MongoDB connection data
const mongoUrl = `mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority&ssl=true`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
!db ? console.log("Error connecting db") : console.log("Db connected successfully");


//Controller data
const controller = require("./src/controllers/controller"); 



// GraphQL schema
var schema = buildSchema(`
    type Query {
        helpers(platform:String!,bosses:[String!]): [Helper]
    }
    type Mutation {
        addHelper(input:HelperInput): Helper
    }

    enum Platform {
        PLAYSTATION
        XBOX
        PC
        OTHER
    }
    input HelperInput {
        platform: Platform!
        bosses: [String]!
        password: String!
        name:String!
    }
    type Helper {
        id: ID!
        platform: Platform!
        bosses: [String]!
        password: String!
        name: String!
    }

`);

var helpersData = [
    {
        id: 1,
        platform: "PLAYSTATION",
        boss: ["BOSS1"]
    },
    {
        id: 2,
        platform: "PC",
        boss: ["BOSS4"]
    },
    {
        id: 3,
        platform: "XBOX",
        boss: ["BOSS3"]
    },
    {
        id: 4,
        platform: "PLAYSTATION",
        boss: ["BOSS2","BOSS3"]
    },
]

/*var getHelpers = function(args)
{
    if(args.platform)
    {
        var platform = args.platform;
        return helpersData.filter(helper => helper.platform == platform);
    }
    else
    {
        return helpersData;
    }
}*/
// Root resolver
var root = {
    helpers: controller.getHelpers,
    addHelper: controller.addHelper
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));