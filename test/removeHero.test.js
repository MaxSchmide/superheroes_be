const chai = require("chai");
const chaiHttp = require("chai-http");
const { default: app } = require("../build/server.js");
const { Hero } = require("../build/models/hero.model.js");
const hero = require("./hero.json");
chai.use(chaiHttp);
chai.should();

describe("Delete hero", () => {
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

  it("Should delete hero by id", (done) => {
    chai
      .request(app)
      .delete(`/heroes/${mockHero._id}`)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(204);
          done();
        }
      });
  });
});
