const chai = require("chai");
const chaiHttp = require("chai-http");
const { default: app } = require("../build/server.js");
const { Hero } = require("../build/models/hero.model.js");
const hero = require("./hero.json");
chai.use(chaiHttp);
chai.should();

describe("Update hero", () => {
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

  it("Should update data", (done) => {
    chai
      .request(app)
      .put(`/heroes/${mockHero._id}`)
      .send({
        nickname: "Green Arrow",
      })
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
