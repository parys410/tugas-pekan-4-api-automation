const request = require("supertest")("http://restapi.adequateshop.com/api/");
const expect = require("chai").expect;
const should = require("chai").should();
const { readFile, writeFile, getRandomNumber } = require("../helper/fileHelper.js");

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

describe("POST /users", () => {
  it("successfully create a new user", async () => {
    /* Read Json File First */
    const file = readFile();

    /* Set New User Data */
    const newUser = {
      name:"Setiyawan",
      email:"parys"+ getRandomNumber() +"@gmail.com",
      location:"INDONESIA"
    };

    const response = await request
      .post(`/users`)
      .set('Authorization',`bearer ${file.data.token}`)
      .send({
        "name": newUser.name,
        "email": newUser.email,
        "location": newUser.location
      });

    // Get Response Data and save to json
    const responseData = JSON.parse(response.text);
    writeFile("newID", responseData.id);

    expect(response.status).to.eql(201);
    expect(response.body.name).to.eql(newUser.name);
    expect(response.body.email).to.eql(newUser.email);
    expect(response.body.location).to.eql(newUser.location);
    should.exist(response.body.id);
  });

  it("failed to create a new user with existing email", async () => {
    /* Read Json File First */
    const file = readFile();

    /* Set New User Data */
    const newUser = {
      name:"Setiyawan",
      email: file.data.email,
      location:"INDONESIA"
    };

    const response = await request
      .post(`/users`)
      .set('Authorization',`bearer ${file.data.token}`)
      .send({
        "name": newUser.name,
        "email": newUser.email,
        "location": newUser.location
      });

    expect(response.status).to.eql(400);
    expect(response.body.Message).to.contains("try with different email address");
    should.exist(response.body.Message);
  });
});