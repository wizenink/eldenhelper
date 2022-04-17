const assert = require('assert');
const {createHelper, seed} = require('./seed_database')
const Helper = require('../src/models/helperModel')
const  dbConnect = require('./test_helper');
const { exit } = require('process');


let currentHelper = {}
describe('Creating documents in MongoDB', () => {
    before((done) => {
        dbConnect();
        done();
    })
    it('Creates a New Helper', (done) => {
        const newHelper = createHelper();
        newHelper.save().then( (res) => {
            currentHelper = res;
            done();
        }) // returns a promise after some time
    });
    it('Checks if newly created helper exists', (done) => {
        Helper.findById(currentHelper._id, (err,res) => {
            if(err)
            {
                throw err;    
            }
            else
             done();
        })
         // returns a promise after some time
    });
});
