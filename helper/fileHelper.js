const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, '..', "/data/data.json");

function readFile() {
  try {
    console.log(fileName);
    const fileContent = fs.readFileSync(fileName, "utf8");
    const jsonData = JSON.parse(fileContent);
    return {
      success: true,
      data: jsonData,
    };
  } catch (e) {
    return {
      success: false,
      data: null,
    };
  }
}

function writeFile(key, data) {
  try {
    const fileContent = fs.readFileSync(fileName, "utf8");
    const jsonData = JSON.parse(fileContent);
    jsonData[key] = data;

    const stringifiedContent = JSON.stringify(jsonData);
    fs.writeFileSync(fileName, stringifiedContent);
  } catch (e) {
    // Do nothing
  }
}

function getRandomNumber() {
  const randomNumber = Math.floor((Math.random() * 1000000) + 1);
  return randomNumber;
}

module.exports = { readFile, writeFile, getRandomNumber };
