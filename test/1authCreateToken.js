const request = require("supertest")("https://restful-booker.herokuapp.com");
const expect = require("chai").expect;
const should = require("chai").should();
const { writeFile } = require("../helper/fileHelper.js");

const credential = {
  "username" : "admin",
  "password" : "password123"
};

describe("POST /auth", () => {
  it("successfull get a token", async () => {

    const response = await request
      .post("/auth")
      .set("Content-Type", "application/json")
      .send({
        "username": credential.username,
        "password": credential.password
      });

    // Get Response Data and save to json
    const responseData = JSON.parse(response.text);
    writeFile("token", responseData.token);

    expect(response.status).to.eql(200);
    should.exist(response.body.token);
  });
});