const request = require("supertest")("https://restful-booker.herokuapp.com");
const expect = require("chai").expect;
const { readFile } = require("../helper/fileHelper.js");

describe("DELETE /booking/{id}", () => {
  it("successfull delete a booking by id", async () => {

    /* Read Json File First */
    const file = readFile();

    const response = await request
      .delete(`/booking/${file.data.bookingid}`)
      .set("Cookie", `token=${file.data.token}`)
      .set("Content-Type", "application/json");

    expect(response.status).to.eql(201);
    expect(response.text).to.contain("Created");
  });

  it("unsuccessfull delete a booking by wrong id", async () => {
    /* Read Json File First */
    const file = readFile();

    const response = await request
      .delete(`/booking/abcde`)
      .set("Cookie", `token=${file.data.token}`)
      .set("Content-Type", "application/json");

    expect(response.status).to.eql(405);
    expect(response.text).to.contains("Method Not Allowed");
  });
});