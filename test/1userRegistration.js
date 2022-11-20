const request = require("supertest")("http://restapi.adequateshop.com/api/");
const expect = require("chai").expect;
const should = require("chai").should();
const { readFile, writeFile } = require("../helper/fileHelper.js");

const registerAccountSuccess = {
  "name": "Ary",
  "email": "parys" + getRandomNumber() + "@gmail.com",
  "password": 123456
};

describe("POST /authaccount/registration", () => {
  it("successfull register a user", async () => {

    const response = await request
      .post("/authaccount/registration")
      .send({
        "name": registerAccountSuccess.name,
        "email": registerAccountSuccess.email,
        "password": registerAccountSuccess.password
      });

    // Get Response Data and save to json
    const responseData = JSON.parse(response.text);
    writeFile("email", responseData.data.Email);

    expect(response.status).to.eql(200);
    expect(response.body.data.Name).to.eql(registerAccountSuccess.name);
    expect(response.body.data.Email).to.eql(registerAccountSuccess.email);
    should.exist(response.body.data.Token);
  });

  it("an email is already registered", async () => {

    /* Read Json File First */
    const file = readFile();

    const response = await request
      .post("/authaccount/registration")
      .send({
        "name": registerAccountSuccess.name,
        "email": file.data.email,
        "password": registerAccountSuccess.password
      });

    expect(response.status).to.eql(200);
    expect(response.body.code).to.eql(1);
    expect(response.body.message).to.eql("The email address you have entered is already registered");
    should.not.exist(response.body.data);
  });
});

function getRandomNumber() {
  const randomNumber = Math.floor((Math.random() * 1000000) + 1);
  return randomNumber;
}