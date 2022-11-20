const request = require("supertest")("http://restapi.adequateshop.com/api/");
const expect = require("chai").expect;
const should = require("chai").should();
const { readFile, writeFile } = require("../helper/fileHelper.js");

describe("POST /authaccount/login", () => {
  it("successfully login", async () => {

    /* Read Json File First */
    const file = readFile();

    const response = await request
      .post("/authaccount/login")
      .send({
        "email": file.data.email,
        "password": 123456
      });

    // Get Response Data and save to json
    const responseData = JSON.parse(response.text);
    writeFile("token", responseData.data.Token);
    writeFile("id", responseData.data.Id);

    expect(response.status).to.eql(200);
    expect(response.body.code).to.eql(0);
    expect(response.body.data.Email).to.eql(file.data.email);
    should.exist(response.body.data['Id']);
    should.exist(response.body.data['Token']);
  });

  it("login with wrong password", async () => {

    /* Read Json File First */
    const file = readFile();

    const response = await request
      .post("/authaccount/login")
      .send({
        "email": file.data.email,
        "password": 112233
      });

    expect(response.status).to.eql(200);
    expect(response.body.code).to.eql(1);
    expect(response.body.message).to.eql("invalid username or password");
    should.not.exist(response.body.data);
  });
});