const mongoose = require('mongoose');
const Group = require('../models/Group');

const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Groups', () => {
    describe('/GET group', () => {
        it('it should get all of a users groups', done => {
            chai.request(server)
                .get(`/api/users/5cdafb8c9f82fb344e8a45df/groups`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });
    });

    describe('/POST group', () => {
        it('it should not create a group with no name', done => {
            let group = {
                name: ''
            }
            chai.request(server)
                .post('/api/groups')
                .send(group)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('errors');
                    response.body.errors.should.have.property('name');
                    response.body.errors.pages.should.have.property('kind').eql('required');
                done();
                });
        });
        it('should create a group with proper inputs', done => {
            let group = {
                name: 'Chad n the Bros'
            }
            chai.request(server)
                .post('/api/groups')
                .send(group)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.group.should.have.property('owner');
                    response.body.group.should.have.property('acts');
                    response.body.group.should.have.property('members');
                done();
                })
        })
    });
});