const fs = require('fs');
const os = require('os');
const moment = require('moment');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m90FileMapping");
const { getBindingMap } = require("./mappers/m90BindMapping");

fs.readFile('./files/358M9020122900148760.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    // console.log(dataObjects);
    const eventObjects = new Converter().convert(dataObjects, [getBindingMap()], { header: 0, footer: -1});

    const timestamp = moment().format('YYYYMMDDhhmmssSSSSS');
    const fileName = `./files/m90-output-${timestamp}.txt`;
    fs.open(fileName, 'a', (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
    const writer = fs.createWriteStream(fileName, { flags: 'a' });
    eventObjects.forEach(async obj => {
      writer.write(JSON.stringify(obj) + '\n', (err) => {
          if (err) {
            console.log(err);
          }
        }
      )
    })
    console.log(JSON.stringify(eventObjects, null, 2));
});
