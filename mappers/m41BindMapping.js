const { Converter } = require("../convertHelper");

function getBindingMap() {
  return  {
      skipObjectIf: new Map([
        ['regexc', [ '41.01', '41.20', '41.30', '41.80', '41.99' ],],
      ]),
      bindings: [
          { destination: 'key.identifier', source: 'numrec',                  type: 'copy' },
          { destination: 'key.deliveryLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
          { destination: 'key.deliveryLocation.identifier', source: 'codact', type: 'copy' },
          { destination: 'key.deliveryLocation.type',                         type: 'fixed', value: 'warehouse' },
          { destination: 'key.shippingLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
          { destination: 'key.shippingLocation.identifier', source: 'codfou', type: 'copy' },
          { destination: 'key.shippingLocation.type',                         type: 'fixed', value: 'supplier' },
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

function bind__date_epoch(currentObject) {
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
  const packagesArray = [];
  for (let i = 0; i < forthcomingObjectList.length; i++) {
    if (forthcomingObjectList[i].codexc === 41 && forthcomingObjectList[i].scoexc === 20) {
      packagesArray.push({...forthcomingObjectList[i]});
    } else if (forthcomingObjectList[i].codexc === 41 && forthcomingObjectList[i].scoexc === 00) {
      break;
    }
  }

  return new Converter().convert(packagesArray, [getPackagesBindingMap()]);
};

function bind__packages_quantity(currentObject) { 
  const firstChild = currentObject.children4130[0];
  if (firstChild.pcbpro !== 0) {
    if (firstChild.spcpro !== 0) {
      return (currentObject.uvcrec + currentObject.uvcimm) / firstChild.pcbpro / firstChild.spcpro;
    }
    return (currentObject.uvcrec + currentObject.uvcimm) / firstChild.pcbpro;
  }
  return currentObject.uvcrec + currentObject.uvcimm;
};

function bind__businessUnitIdentifier(currentObject, header) {
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
      { destination: 'blockedStockMovement',                  type: 'function', value: bind__receptionLines_blockedStockMovement },
    ]
  };
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

  return new Converter().convert(receptionLinesArray, [getReceptionLinesMap()]);
};

function bind__receptionLines_physicalStockExpirationDate(currentObject) {
  if (currentObject.datfvi) return currentObject.datfvi.getTime();
  return null;
};

function getBlockedStockMovementBindingMap() {
  return {
    bindings: [
      { destination: 'blockingType', type: 'function', value: bind__blockingType },
      { destination: 'movementDate', type: 'function', value: bind__movementDate },
      { destination: 'quantity', type: 'function', value: bind__quantity },
      { destination: 'reason', type: 'fixed', value: null },
    ]
  };
};

function bind__receptionLines_blockedStockMovement(currentObject) {  
  const filtered4130 = currentObject.children4130.filter((item) => item.motimm !== null);
  if (filtered4130.length > 0) {
    return new Converter().convert(filtered4130, [getBlockedStockMovementBindingMap()]);
  }
  return null;
};

function bind__blockingType(currentObject) {
  return currentObject.motimm === 'CAS' ? 'broken' : 'dispute';
};

function bind__movementDate(currentObject) {
  return currentObject.parent.parent.dtrrec.getTime();
};

function bind__quantity(currentObject) {
  return currentObject.uvcmvt / currentObject.parent.codmtr;
};


module.exports = {
  getBindingMap,
};
