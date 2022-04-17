
const Helper = require('../models/helperModel');

const getHelpers = (query) => {
    return Helper.find(
        {
            platform:query.platform,
            bosses:{
                "$in":query.bosses
            }
        }).then(function(err,res) {
            if(err) return err;
            return res;
        })
}

const addHelper = (query) =>  {
    //console.log(query);
    const newHelper = new Helper(
        {
            platform:query.input.platform,
            bosses:query.input.bosses,
            password:query.input.password,
            name:query.input.name
        }
    );
    //console.log(newHelper)
    newHelper.save().then(() => console.log("saved ",newHelper));
}

module.exports = {
    getHelpers,
    addHelper
};