const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m90FileMapping");

fs.readFile('./files/358M9020122900148760.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    // console.log(dataObjects);
    const eventObjects = new Converter().convert(dataObjects, [getBindingMap()], { header: 0, footer: -1});
    console.log(JSON.stringify(eventObjects, null, 2));
});

function getBindingMap() {
  return  {
      header: 0,   //null for no header
      footer: -1,  //null for no footer
      skipObjectIf: new Map([
        ['regexc', [ '90.60',],],
      ]),
      bindings: [
              { destination: 'snapshotDate',                                              type: 'function', value: bind__date_epoch },
              { destination: 'productReferenceAdeo',                                      type: 'fixed', value: null },
              { destination: 'productReferenceBU', source: 'codpro',                      type: 'copy' },
              { destination: 'physicalStockQuantity',                                     type: 'function', value: bind__physicalStockQuantity },
              { destination: 'blockedStockQuantity',                                      type: 'function', value: bind__blockedStockQuantity },
              { destination: 'sourcingLocation.businessUnitIdentifier', source: 'edisit', type: 'header' },
              { destination: 'sourcingLocation.identifier', source: 'codact',             type: 'copy' },
              { destination: 'sourcingLocation.type',                                     type: 'fixed', value: 'warehouse' },
              { destination: 'physicalStocks',                                            type:'function', value: bind__physicalStocksArray },
              { destination: 'blockedStocks',                                             type:'function', value: bind__blockedStocksArray },
          ]
      }            
};

function bind__date_epoch(currentObject, header, footer, forthcomingObjectList) {
  return header.datexc.getTime();
};

function bind__physicalStockQuantity(currentObject, header, footer, forthcomingObjectList) {
  let sum = 0; 
  for (i = 0; i < forthcomingObjectList.length; i++) {
    if (forthcomingObjectList[i].codexc === 90 && forthcomingObjectList[i].scoexc === 60) {
      if (forthcomingObjectList[i].motimm === null) sum += forthcomingObjectList[i].nbruvc01;
    } else break;
  }
  return sum;
};

function bind__blockedStockQuantity(currentObject, header, footer, forthcomingObjectList) {
  let sum = 0; 
  for (let i = 0; i < forthcomingObjectList.length; i++) {
    if (forthcomingObjectList[i].codexc === 90 && forthcomingObjectList[i].scoexc === 60) {
      if (forthcomingObjectList[i].motimm !== null) sum += forthcomingObjectList[i].nbruvc01;
    } else break;
  }
  return sum;
};

function getPhysicalStocksBindingMap() {
  return {
    bindings: [
      { destination: 'quantity', source: 'nbruvc01', type: 'copy' },
      { destination: 'expirationDate',               type: 'function', value: bind__physicalStock_expirationDate  },
      { destination: 'qualification',                type: 'fixed', value: null },
      { destination: 'status',                       type: 'fixed', value: null },
    ]
  }
};

function bind__physicalStock_expirationDate(currentObject) {
  return currentObject.datfvi ? currentObject.datfvi.getTime() : null
};

function bind__physicalStocksArray(currentObject, header, footer, forthcomingObjectList) {
  const physicalStocksArray = [];
  for (let i = 0; i < forthcomingObjectList.length; i++) {
    if (forthcomingObjectList[i].codexc === 90 && forthcomingObjectList[i].scoexc === 60) {
      if (forthcomingObjectList[i].motimm === null) physicalStocksArray.push(forthcomingObjectList[i]);
    } else break;
  }

  return new Converter().convert(physicalStocksArray, [getPhysicalStocksBindingMap()])
};

function getBlockedStocksBindingMap() {
  return {
    bindings: [
      { destination: 'quantity', source: 'nbruvc01', type: 'copy' },
      { destination: 'type',                         type: 'function', value: bind__blockedStock_type  },
      { destination: 'reason',                       type: 'function', value: bind__blockedStock_reason },
      { destination: 'date',                         type: 'function', value: bind__blockedStock_date_epoch },
    ]
  }
};

function bind__blockedStock_type(currentObject) {
  if (currentObject.motimm === 'LIT' || currentObject.motimm === 'E') {
    return 'dispute';
  } else if (currentObject.motimm === 'CAS') {
    return 'broken';
  }
  return 'blocked';
};

function bind__blockedStock_reason(currentObject) {
  if ((currentObject.motimm !== 'LIT' || currentObject.motimm !== 'E') && currentObject.motimm !== 'CAS') {
    return currentObject.motimm;
  }
  return null;
};

function bind__blockedStock_date_epoch(currentObject) {
  return currentObject.datimm1.getTime();
}

function bind__blockedStocksArray(currentObject, header, footer, forthcomingObjectList) {
  const blockedStocksArray = [];
  for (let i = 0; i < forthcomingObjectList.length; i++) {
    if (forthcomingObjectList[i].codexc === 90 && forthcomingObjectList[i].scoexc === 60) {
      if (forthcomingObjectList[i].motimm !== null) blockedStocksArray.push(forthcomingObjectList[i]);
    } else break;
  }

  return new Converter().convert(blockedStocksArray, [getBlockedStocksBindingMap()])
};
