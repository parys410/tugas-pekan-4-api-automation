const request = require("supertest")("https://restful-booker.herokuapp.com");
const expect = require("chai").expect;
const { readFile } = require("../helper/fileHelper.js");

const bookingData = {
  "firstname" : "Bangkit",
  "lastname" : "Aryawan",
  "totalprice" : 400000,
  "depositpaid" : false,
  "bookingdates" : {
    "checkin" : "2022-11-25",
    "checkout" : "2022-11-27"
  },
  "additionalneeds" : "Breakfast and Baby Cot"
};

describe("GET /booking/{id}", () => {
  it("successfull get a booking by id after update", async () => {

    /* Read Json File First */
    const file = readFile();

    const response = await request
      .get(`/booking/${file.data.bookingid}`)
      .set("Accept", "application/json");

    expect(response.status).to.eql(200);
    expect(response.body).to.eql(bookingData);
  });

  it("unsuccessfull get a booking by wrong id", async () => {

    const response = await request
      .get(`/booking/abcde`)
      .set("Accept", "application/json");

    expect(response.status).to.eql(404);
    expect(response.text).to.contains("Not Found");
  });
});