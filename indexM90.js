const fs = require('fs');
const os = require('os');
const moment = require('moment');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m90FileMapping");
const { getBindingMap, getNotificationBindingMap } = require("./mappers/m90BindMapping");

// fs.readFile('./files/358M9020122900148760.txt', 'utf8', (err, data) => {
fs.readFile('./files/358M9021010200150467.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    // console.log(dataObjects);
    const notificationEventObjects = new Converter().convert(dataObjects, [getNotificationBindingMap()], { header: 0, footer: -1});
    const eventObjects = new Converter().convert(dataObjects, [getBindingMap()], { header: 0, footer: -1});

    const timestamp = moment().format('YYYYMMDDHHmmssSSSSS');
    const fileName = `./files/m90-output-${timestamp}.txt`;

    const notificationEvent = notificationEventObjects[0]
    notificationEvent.fileNamePath = fileName;

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

    // object to be written on the DB
    const notificationEventData = { key: `${timestamp}`, json: JSON.stringify(notificationEvent) };

    console.log(JSON.stringify(notificationEventData, null, 2));
    // console.log(JSON.stringify(eventObjects, null, 2));
});
