const request = require("supertest")("https://restful-booker.herokuapp.com");
const expect = require("chai").expect;
const should = require("chai").should();
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

describe("PUT /booking/{id}", () => {
  it("successfull update a booking", async () => {
    /* Read Json File First */
    const file = readFile();

    const response = await request
      .put(`/booking/${file.data.bookingid}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Cookie", `token=${file.data.token}`)
      .send({
        "firstname" : bookingData.firstname,
        "lastname" : bookingData.lastname,
        "totalprice" : bookingData.totalprice,
        "depositpaid" : bookingData.depositpaid,
        "bookingdates" : {
            "checkin" : bookingData.bookingdates.checkin,
            "checkout" : bookingData.bookingdates.checkout
        },
        "additionalneeds" : bookingData.additionalneeds
    });

    expect(response.status).to.eql(200);
    expect(response.body).to.eql(bookingData);
  });

  it("unsuccessfull update a booking by empty token", async () => {
    /* Read Json File First */
    const file = readFile();

    const response = await request
      .put(`/booking/${file.data.bookingid}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Cookie", `token=`)
      .send({
        "firstname" : bookingData.firstname,
        "lastname" : bookingData.lastname,
        "totalprice" : bookingData.totalprice,
        "depositpaid" : bookingData.depositpaid,
        "bookingdates" : {
            "checkin" : bookingData.bookingdates.checkin,
            "checkout" : bookingData.bookingdates.checkout
        },
        "additionalneeds" : bookingData.additionalneeds
    });

    expect(response.status).to.eql(403);
    expect(response.text).to.contain("Forbidden");
  });
});