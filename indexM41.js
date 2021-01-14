const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m41FileMapping");


fs.readFile('./files/358M4121010500151789.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    // console.log(JSON.stringify(dataObjects, null, 2));
    const eventObjects = new Converter().convert(dataObjects, [getBindingMap()], { header: 0, footer: -1});
    console.log(JSON.stringify(eventObjects, null, 2));
});

function getBindingMap() {
  return  {
      skipObjectIf: new Map([
        ['regexc', [ '41.01', '41.20', '41.30', '41.80', '41.99' ],],
      ]),
      bindings: [
          { destination: 'identifier', source: 'numrec',                  type: 'copy' },
          { destination: 'supplyCircuitType',                             type: 'fixed', value: 'stock' },
          { destination: 'validationDate',                                type: 'function', value: bind__date_epoch },
          { destination: 'startDate',                                     type: 'function', value: bind__date_epoch },
          { destination: 'closedDate',                                    type: 'function', value: bind__date_epoch },
          { destination: 'deliveryNoteNumber',                            type: 'fixed', value: null },
          { destination: 'shipmentIdentifier',                            type: 'fixed', value: null },
          { destination: 'expectedPackages',                              type: 'function', value: bind__expectedPackages },
          { destination: 'packages',                                      type: 'function', value: bind__packages },
          { destination: 'deliveryLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
          { destination: 'deliveryLocation.identifier', source: 'codact', type: 'copy' },
          { destination: 'deliveryLocation.type',                         type: 'fixed', value: 'warehouse' },
          { destination: 'shippingLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
          { destination: 'shippingLocation.identifier', source: 'codfou', type: 'copy' },
          { destination: 'shippingLocation.type',                         type: 'fixed', value: 'supplier' },
          { destination: 'receptionLines',                                type: 'function', value: bind__receptionLines },
        ]
  }            
};

function bind__date_epoch(currentObject, header, footer, forthcomingObjectList) {
  return currentObject.dtrrec.getTime();
};

function getExpectedPackagesBindingMap() {
  return {
    bindings: [
      { destination: 'quantity', type: 'fixed', value: null },
      { destination: 'type',     type: 'fixed', value: null },
    ]
  }
};

function bind__expectedPackages(currentObject) {
  return new Converter().convert([currentObject], [getExpectedPackagesBindingMap()])
};

function getPackagesBindingMap() {
  return {
    bindings: [
      { destination: 'quantity', type: 'function', value: bind__packages_quantity },
      { destination: 'type',     type: 'fixed', value: 'parcel' },
    ]
  }
};

function bind__packages(currentObject, header, footer, forthcomingObjectList) {
  // creating array of 41.20 lines with children array of 41.30 lines
  const packagesArray = [];
  for (let i = 0; i < forthcomingObjectList.length; i++) {
    if (forthcomingObjectList[i].codexc === 41 && forthcomingObjectList[i].scoexc === 20) {
      packagesArray.push({...forthcomingObjectList[i]});
    } else if (forthcomingObjectList[i].codexc === 41 && forthcomingObjectList[i].scoexc === 30) {
      const lastPushedParentObject = packagesArray[packagesArray.length - 1];
      if (!lastPushedParentObject.children) lastPushedParentObject.children = [];
      lastPushedParentObject.children.push({...forthcomingObjectList[i]});
    } else break;
  }

  return new Converter().convert(packagesArray, [getPackagesBindingMap()]);
};

function bind__packages_quantity(currentObject) { 
  const firstChild = currentObject.children[0];
  if (firstChild.pcbpro !== 0) {
    if (firstChild.spcpro !== 0) {
      return (currentObject.uvcrec + currentObject.uvcimm) / firstChild.pcbpro / firstChild.spcpro;
    }
    return (currentObject.uvcrec + currentObject.uvcimm) / firstChild.pcbpro;
  }
  return currentObject.uvcrec + currentObject.uvcimm;
};

function bind__businessUnitIdentifier(currentObject, header, footer, forthcomingObjectList) {
  return header.edisit;
};

function getReceptionLinesMap() {
  return {
    bindings: [
      { destination: 'identifier', source: 'nlirec',          type: 'copy' },
      { destination: 'productReferenceBU', source: 'codpro',  type: 'copy' },
      { destination: 'productReferenceAdeo',                  type: 'fixed', value: null },
      { destination: 'quantity', source: 'uvcrec',            type: 'copy' },
      { destination: 'deliveryNoteQuantity',                  type: 'fixed', value: null },
      { destination: 'differenceQuantity',                    type: 'fixed', value: 0 },
      { destination: 'physicalStockExpirationDate',           type: 'function', value: bind__receptionLines_physicalStockExpirationDate },
      { destination: 'transferID',                            type: 'fixed', value: null },
      { destination: 'purchaseOrderID', source: 'refrec',     type: 'copy' },
      { destination: 'customerOrderNumber',                   type: 'fixed', value: null },
    ]
  }
};

function bind__receptionLines(currentObject, header, footer, forthcomingObjectList) {
  const receptionLinesArray = [];
  for (let i = 0; i < forthcomingObjectList.length; i++) {
    if (forthcomingObjectList[i].codexc === 41 && forthcomingObjectList[i].scoexc === 20) {
      receptionLinesArray.push(forthcomingObjectList[i]);
    } else if (forthcomingObjectList[i].codexc === 41 && forthcomingObjectList[i].scoexc === 00) {
      break;
    }
  }
  // console.log(JSON.stringify(receptionLinesArray, null, 2));

  return new Converter().convert(receptionLinesArray, [getReceptionLinesMap()]);
};

function bind__receptionLines_physicalStockExpirationDate(currentObject, header, footer, forthcomingObjectList) {
  if (currentObject.datfvi) return currentObject.datfvi.getTime();
  return null;
}
