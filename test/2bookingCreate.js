const request = require("supertest")("https://restful-booker.herokuapp.com");
const expect = require("chai").expect;
const should = require("chai").should();
const { writeFile } = require("../helper/fileHelper.js");

const bookingData = {
  "firstname" : "Ary",
  "lastname" : "Setiyawan",
  "totalprice" : 500000,
  "depositpaid" : true,
  "bookingdates" : {
    "checkin" : "2022-11-25",
    "checkout" : "2022-11-28"
  },
  "additionalneeds" : "Breakfast"
};

describe("POST /booking", () => {
  it("successfull create a booking", async () => {

    const response = await request
      .post("/booking")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
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

    // Get Response Data and save to json
    const responseData = JSON.parse(response.text);
    writeFile("bookingid", responseData.bookingid);

    expect(response.status).to.eql(200);
    expect(response.body.booking.firstname).to.eql(bookingData.firstname);
    expect(response.body.booking.lastname).to.eql(bookingData.lastname);
    expect(response.body.booking.totalprice).to.eql(bookingData.totalprice);
    should.exist(response.body.bookingid);
  });
});