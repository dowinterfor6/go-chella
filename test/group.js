const mongoose = require('mongoose');
const Group = require('../models/Group');

const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const request = require('supertest')(server);

chai.use(chaiHttp);

describe('Groups', () => {

    describe('User login', () => {
        it('should return 200 and token for valid credentials', done => {
            setTimeout(done(), 30000);
            const user = {
                "username": "kevin",
                "password": "password"
            }

            request
                .post(`/api/users/login`)
                .send(user)
                .then(res => {
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                });
        });
    });

    describe('GET group', () => {
        let auth = {};
        beforeEach(loginUser(auth));

        it('should resopnd with JSON array', done => {
            setTimeout(done(), 30000);
            request
                .get(`/api/users/5cdafba39f82fb344e8a45e0/groups`)
                .set('Authorization', 'Bearer ' + auth.token)
                .end((err, response) => {
                    if(err) return done(err);
                });
        });

        it('it should get all of a users groups', done => {
            setTimeout(done(), 30000);
            request
                .get(`/api/users/5cdafba39f82fb344e8a45e0/groups`)
                .set('Authorization', 'Bearer ' + auth.token)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                });
        });
    });

    describe('POST group', () => {
        let auth = {};
        before(loginUser(auth));

        it('it should not create a group with no name', done => {
            setTimeout(done(), 30000);
            let group = {
                name: ''
            }
            request
                .post('/api/groups')
                .set('Authorization', 'Bearer ' + auth.token)
                .send(group)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('errors');
                    response.body.errors.should.have.property('name');
                    response.body.errors.pages.should.have.property('kind').eql('required');
                });
        });

        it('should create a group with proper inputs', done => {
            setTimeout(done(), 30000);
            let group = {
                name: 'Chad n the Bros'
            }
            request
                .post('/api/groups')
                .set('Authorization', 'Bearer ' + auth.token)
                .send(group)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.group.should.have.property('owner');
                    response.body.group.should.have.property('acts');
                    response.body.group.should.have.property('members');
                });
        });
    });
});

function loginUser(auth) {
    return function(done) {
        request
            .post(`/api/users/login`)
            .send({
                username: 'kevin',
                password: 'password'
            })
            .expect(200)
            .end(onResponse);

            function onResponse(err, res) {
                auth.token = res.body.token;
                return done();
            };
    };
};