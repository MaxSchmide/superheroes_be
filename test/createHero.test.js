const chai = require("chai");
const chaiHttp = require("chai-http");
const { default: app } = require("../build/server.js");
const hero = require("./hero.json");
chai.use(chaiHttp);
chai.should();
describe("Creacte hero", () => {
  let server;

  before((done) => {
    server = app.listen(3000, () => {
      done();
    });
  });

  after((done) => {
    server.close(() => {
      done();
    });
  });

  it("Should create a new hero", (done) => {
    chai
      .request(app)
      .post("/heroes")
      .send(hero)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(201);
          done();
        }
      });
  });

  it("Should return a new hero", (done) => {
    chai
      .request(app)
      .post("/heroes")
      .send(hero)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.body.should.be.a("object");
          done();
        }
      });
  });
});
