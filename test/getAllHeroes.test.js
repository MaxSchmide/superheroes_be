const chai = require("chai");
const chaiHttp = require("chai-http");
const { default: app } = require("../build/server.js");
const allHeroes = require("./allHeroes.json");
chai.use(chaiHttp);
chai.should();

describe("Read all heroes", () => {
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

  it("Should return data with list and total number", (done) => {
    chai
      .request(app)
      .get("/heroes")
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.should.have.property("totalHeroes");
          res.body.should.have.property("heroes");
          const actualKeys = Object.keys(res.body);
          const expectedKeys = Object.keys(allHeroes);

          actualKeys.should.deep.equal(expectedKeys);
          done();
        }
      });
  });

  it("should return maximum 5 heroes", (done) => {
    chai
      .request(app)
      .get("/heroes")
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.body.heroes.should.be.an("array").and.have.length.at.most(5);
          done();
        }
      });
  });
});
