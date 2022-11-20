const request = require("supertest")("http://restapi.adequateshop.com/api/");
const expect = require("chai").expect;
const should = require("chai").should();
const { readFile } = require("../helper/fileHelper.js");

const page = 1;

describe("GET /users", () => {
  it("successfully get all users", async () => {

    /* Read Json File First */
    const file = readFile();

    const response = await request
      .get(`/users?page=${page}`)
      .set('Authorization',`bearer ${file.data.token}`);

    expect(response.status).to.eql(200);
    expect(response.body.page).to.eql(page);
    expect(response.body.data.length).to.eql(response.body['per_page']);
    should.exist(response.body.data);
  });

  it("get users without authorization", async () => {

    const response = await request
      .get(`/users?page=${page}`);

    expect(response.status).to.eql(401);
    expect(response.body).to.contain("please send bearer token in header");
  });
});