const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m41FileMapping");
const { getBindingMap } = require('./mappers/m41BindMapping');
const { DB, dataTransfers, dataTransferLines, dataTransferEvents } = require('./dbConnection');


fs.readFile('./files/358M4121010500151789.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    // console.log(JSON.stringify(dataObjects, null, 2));

    await DB.sync({ alter: true });

    const [header, ...lines] = dataObjects;
    const footer = lines.pop();
    const headerFooterObj = {};
    Object.keys(header).forEach(key => {
      headerFooterObj[`h_${key}`] = header[key];
    })
    Object.keys(footer).forEach(key => {
      headerFooterObj[`f_${key}`] = footer[key];
    })

    const dataTransfer = await dataTransfers.create(headerFooterObj);

    const lineObjects = lines.map(item => ({...item, transfer_id: dataTransfer.id }))
    await dataTransferLines.bulkCreate(lineObjects);

    const eventObjects = new Converter().convert(dataObjects, [getBindingMap()], { header: 0, footer: -1});
    const eventObjs = eventObjects.map(obj => {
      const { key, ...json } = obj;
      return { key: JSON.stringify(key), json: JSON.stringify(json) };
    })

    await dataTransferEvents.bulkCreate(eventObjs);

    // console.log(JSON.stringify(eventObjects, null, 2));
});
