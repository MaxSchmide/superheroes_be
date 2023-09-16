const chai = require("chai");
const chaiHttp = require("chai-http");
const { default: app } = require("../build/server.js");
const { Hero } = require("../build/models/hero.model.js");
const hero = require("./hero.json");
chai.use(chaiHttp);
chai.should();

describe("Read one hero", () => {
  let server;
  var mockHero;

  before(async () => {
    mockHero = await new Hero(hero);

    mockHero.save();

    server = app.listen(3000);
  });

  after((done) => {
    server.close(() => {
      Hero.findByIdAndDelete(mockHero._id);
      done();
    });
  });

  it("Should return hero data", (done) => {
    chai
      .request(app)
      .get(`/heroes/${mockHero._id}`)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        }
      });
  });
});
