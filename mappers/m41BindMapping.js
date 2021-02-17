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
          { destination: 'goodsReceivingLines',                                type: 'function', value: bind__receivingLines },
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
      { destination: 'quantity', source: 'quantity', type: 'copy'},
      { destination: 'type', type: 'fixed', value: 'parcel' },
    ]
  }
};

function bind__packages(currentObject) {
  let quantity = 0;
  currentObject.children4120.forEach(child4120 => {
    const firstChild = child4120.children4130[0];
    if (firstChild.pcbpro !== 0) {
      if (firstChild.spcpro !== 0) {
        quantity += Math.ceil((child4120.uvcrec + child4120.uvcimm) / firstChild.pcbpro / firstChild.spcpro);
        return;
      }
      quantity += Math.ceil((child4120.uvcrec + child4120.uvcimm) / firstChild.pcbpro);
      return;
    }
    quantity += child4120.uvcrec + child4120.uvcimm;
  });

  return new Converter().convert([{ quantity }], [getPackagesBindingMap()]);
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

function bind__receivingLines(currentObject) {
  return new Converter().convert(currentObject.children4120, [getReceptionLinesMap()]);
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
