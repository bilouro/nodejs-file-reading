const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m41FileMapping");
const { getBindingMap } = require('./mappers/m41BindMapping');


fs.readFile('./files/358M4121010500151789.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    // console.log(JSON.stringify(dataObjects, null, 2));
    const eventObjects = new Converter().convert(dataObjects, [getBindingMap()], { header: 0, footer: -1});
    console.log(JSON.stringify(eventObjects, null, 2));
});
