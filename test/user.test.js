let chai = require('chai')
let chai_http = require('chai-http')
var should = chai.should()
chai.use(chai_http)
let server = require('../server')

describe('User', () => {
    describe('GET /api/user', () => {
        it('it should GET all the user', (done) => {
            chai.request(server)
                .get('/api/user')
                .end((err, res) => {
                    (res).should.have.status(200)
                        (done)
                })
        })
    })
})