const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
require('../server');

describe('iteration1', () =>{
    it('Can access index.ejs', (done) => {
        chai.request('http://0.0.0.0:5000/')
            .get("")
            .end((err, res) =>{
                expect(res.statusCode).to.equal(200);
                done();
            })

    })

    it('Can post user information for registration', (done) => {
        let js = {
            registerUsername : 'user1',
            registerPassword : 'xx',
            registerPasswordConfirm : 'xx'
        }
        chai.request('http://0.0.0.0:5000/')
            .post('register/new-user')
            .send(js)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.property('body');
                done();
            })
    })

    it('Can remove a book from the wish list', (done) => {
        chai.request('http://0.0.0.0:5000/')
            .post('wishlist/remove')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            })
    })

})