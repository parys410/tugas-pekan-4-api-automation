const request = require("supertest")("http://restapi.adequateshop.com/api/");
const expect = require("chai").expect;
const should = require("chai").should();
const { readFile } = require("../helper/fileHelper.js");

describe("GET /users/{id}", () => {
  it("successfully get user by id", async () => {

    /* Read Json File First */
    const file = readFile();

    const response = await request
      .get(`/users/${file.data.id}`)
      .set('Authorization',`bearer ${file.data.token}`);

    expect(response.status).to.eql(200);
    expect(response.body.id).to.eql(file.data.id);
    expect(response.body.email).to.eql(file.data.email);
    should.exist(response.body.id);
    should.exist(response.body.email);
  });

  it("invalid request of get user by id", async () => {

    /* Read Json File First */
    const file = readFile();

    const response = await request
      .get(`/users/parys410`)
      .set('Authorization',`bearer ${file.data.token}`);

    expect(response.status).to.eql(400);
    expect(response.body.Message).to.contains("The request is invalid");
  });
});