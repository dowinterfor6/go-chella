const mongoose = require('mongoose');
const Group = require('../models/Group');

const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Groups', () => {
    beforeEach(done => {
        
    })
    describe('/GET group', ()=> {
        it('it should get all a users groups', done => {

        })
    })
})