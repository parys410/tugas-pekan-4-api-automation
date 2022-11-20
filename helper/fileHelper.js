const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, '..', "/data/data.json");

async function readFile() {
  try {
    console.log(fileName);
    const fileContent = await fs.promises.readFile(fileName);
    const jsonData = await JSON.parse(fileContent);
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

async function writeFile(key, data) {
  try {
    const fileContent = await fs.promises.readFile(fileName);
    const jsonData = await JSON.parse(fileContent);
    jsonData[key] = data;

    const stringifiedContent = JSON.stringify(jsonData);
    const writeData = await fs.promises.writeFile(fileName, stringifiedContent);
    return {
      success: true,
      message: 'The File is successfully saved',
    };
  } catch (e) {
    return {
      success: false,
      message: 'Could not save file',
    };
  }
}

module.exports = { readFile, writeFile };
