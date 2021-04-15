// ===========
// IMPORTS
// ===========
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const Concert = require("../../../models/concert.model");

// ===========
// MIDDLEWARE
// ===========

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

// ===========
// TESTS
// ===========

describe("GET /api/concerts", () => {
  before(async () => {
    const testPerfOne = new Concert({
      performer: "Performer One",
      genre: "Rock",
      price: 20,
      day: 1,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });
    await testPerfOne.save();
    const testPerfTwo = new Concert({
      performer: "Performer Two",
      genre: "R&B",
      price: 50,
      day: 2,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });
    await testPerfTwo.save();
    const testPerfThree = new Concert({
      performer: "Performer Three",
      genre: "Pop",
      price: 100,
      day: 3,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });
    await testPerfThree.save();
    const testPerfFour = new Concert({
      performer: "Performer Three",
      genre: "Pop",
      price: 100,
      day: 4,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });
    await testPerfFour.save();
  });
  it("/performer/:performer should return array of concerts by :preformer ", async () => {
    const res = await request(server).get(
      "/api/concerts/performer/performer-three"
    );
    const expectedLenght = 2;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.lenght).to.not.equal(expectedLenght);
  });
  it("/genre/:genre should return array of concerts by :genre ", async () => {
    const res = await request(server).get("/api/concerts/genre/Rock");
    const expectedLenght = 1;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.lenght).to.not.equal(expectedLenght);
  });
  it("/price/:price_min/:price_max should return array of concerts in range of :price_min to :price_max ", async () => {
    const res = await request(server).get("/api/concerts/price/20/50");
    const expectedLenght = 2;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.lenght).to.not.equal(expectedLenght);
  });
  it("/price/:price_min/:price_max should return error if :price_min is greater than :price_max ", async () => {
    const res = await request(server).get("/api/concerts/price/100/50");
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.an("object");
    expect(res.body.message).to.be.equal("error");
  });
  it("/day/:day should return array of concerts by :day ", async () => {
    const res = await request(server).get("/api/concerts/day/2");
    const expectedLenght = 1;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.lenght).to.not.equal(expectedLenght);
  });
  after(async () => {
    await Concert.deleteMany();
  });
});
