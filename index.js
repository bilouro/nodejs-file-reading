const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m80FileMapping");
const { getBindingMap8010, getBindingMap8080minus, getBindingMap8080plus } = require("./mappers/m80BindMapping");

// fs.readFile('./files/358M8020122900148776.txt', 'utf8', (err, data) => {
  fs.readFile('./files/358M80SUMcrlf.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    // console.log(dataObjects);
    const eventObjects = new Converter().convert(dataObjects, [getBindingMap8080minus(), getBindingMap8080plus(), getBindingMap8010()], { header: 0, footer: -1});
    console.log(JSON.stringify(eventObjects, null, 2));
});
