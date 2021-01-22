const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m80FileMapping");
const { getBindingMap8010, getBindingMap8080minus, getBindingMap8080plus } = require("./mappers/m80BindMapping");
const { DB, dataTransfers, dataTransferLines, dataTransferEvents } = require('./dbConnection');

// fs.readFile('./files/358M8020122900148776.txt', 'utf8', (err, data) => {
fs.readFile('./files/358M80SUMcrlf.txt', 'utf8', async (err, data) => {
  const dataObjects = getObjectsFromFile(data, getFileMapping());

  await DB.sync({ force: true });

  const footer = [...dataObjects].pop();
  const [header, ...lines] = dataObjects;
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

  const eventObjects = new Converter().convert(dataObjects, [getBindingMap8080minus(), getBindingMap8080plus(), getBindingMap8010()], { header: 0, footer: -1});
  const eventObjs = eventObjects.map(obj => {
    const { key, ...json } = obj;
    return { key: JSON.stringify(key), json: JSON.stringify(json) };
  })

  await dataTransferEvents.bulkCreate(eventObjs);

  // console.log(JSON.stringify(eventObjs, null, 2));
});
