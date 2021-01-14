const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m90FileMapping");
const { getBindingMap } = require("./mappers/m90BindMapping");

fs.readFile('./files/358M9020122900148760.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    // console.log(dataObjects);
    const eventObjects = new Converter().convert(dataObjects, [getBindingMap()], { header: 0, footer: -1});
    console.log(JSON.stringify(eventObjects, null, 2));
});
