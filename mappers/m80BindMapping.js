// StockAdjustmentHasBeenDone -> 80.00.CODMVT = 10
function getBindingMap8010() {
  return  {
      processObjectOnlyIf: new Map([
        ['codmvt', [ '10',],],
      ]),
      bindings: [
              { destination: 'identifier', source: 'refmvt',                  type: 'copy' },
              { destination: 'collaboratorIdentifier',                        type: 'fixed', value: null },
              { destination: 'productReferenceAdeo',                          type: 'fixed', value: null },
              { destination: 'productReferenceBU', source: 'codpro',          type: 'copy' },
              { destination: 'receptionIdentifier',                           type: 'fixed', value: null },
              { destination: 'adjustmentDate',                                type: 'function', value: bind__date_epoch },
              { destination: 'quantity',                                      type: 'function', value: bind__stockAdjustmentHasBeenDone_quantity },
              { destination: 'reason', source: 'motmvt',                      type: 'copy' },
              { destination: 'blockedStock.type',                             type: 'fixed', value: null },
              { destination: 'blockedStock.reason',                           type: 'fixed', value: null },
              { destination: 'sourcingLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
              { destination: 'sourcingLocation.identifier', source: 'codact', type: 'copy' },
              { destination: 'sourcingLocation.type',                         type: 'fixed', value: 'warehouse' },
          ]
      }            
};


// ProductHasBeenBlocked -> 80.00.CODMVT = 80 and 80.00.SENMVT = "-"
function getBindingMap8080minus() {
  return  {
      processObjectOnlyIf: new Map([
        ['codmvt', [ '80',],],
        ['senmvt', [ '-',],],
      ]),
      bindings: [
              { destination: 'identifier', source: 'refmvt',                  type: 'copy' },
              { destination: 'collaboratorIdentifier',                        type: 'fixed', value: null },
              { destination: 'productReferenceAdeo',                          type: 'fixed', value: null },
              { destination: 'productReferenceBU', source: 'codpro',          type: 'copy' },
              { destination: 'blockingType',                                  type: 'fixed', value: 'blocked' },
              { destination: 'reason', source: 'edimvt',                      type: 'copy' },
              { destination: 'previousType',                                  type: 'fixed', value: null },
              { destination: 'previousReason',                                type: 'fixed', value: null },
              { destination: 'movementDate',                                  type: 'function', value: bind__date_epoch },
              { destination: 'quantity', source: 'uvcmvt',                    type: 'copy' },
              { destination: 'sourcingLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
              { destination: 'sourcingLocation.identifier', source: 'codact', type: 'copy' },
              { destination: 'sourcingLocation.type',                         type: 'fixed', value: 'warehouse' },
          ]
      }            
};

// ProductHasBeenUnblocked -> 80.00.CODMVT = 80 and 80.00.SENMVT = "+"
function getBindingMap8080plus() {
  return  {
      processObjectOnlyIf: new Map([
        ['codmvt', [ '80',],],
        ['senmvt', [ '+',],],
      ]),
      bindings: [
              { destination: 'identifier', source: 'refmvt',                  type: 'copy' },
              { destination: 'collaboratorIdentifier',                        type: 'fixed', value: null },
              { destination: 'productReferenceAdeo',                          type: 'fixed', value: null },
              { destination: 'productReferenceBU', source: 'codpro',          type: 'copy' },
              { destination: 'previousType',                                  type: 'fixed', value: 'blocked' },
              { destination: 'previousReason', source: 'edimvt',              type: 'copy' },
              { destination: 'movementDate',                                  type: 'function', value: bind__date_epoch },
              { destination: 'quantity', source: 'uvcmvt',                    type: 'copy' },
              { destination: 'sourcingLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
              { destination: 'sourcingLocation.identifier', source: 'codact', type: 'copy' },
              { destination: 'sourcingLocation.type',                         type: 'fixed', value: 'warehouse' },
          ]
      }            
};


function bind__date_epoch(currentObject) {
  return currentObject.datmvt.getTime();
};

function bind__stockAdjustmentHasBeenDone_quantity(currentObject, header, footer, forthcomingObjectList) {
  if (currentObject.senmvt === '-') {
    return currentObject.senmvt + currentObject.uvcmvt;
  }
  return currentObject.uvcmvt;
};

function bind__businessUnitIdentifier(currentObject, header, footer, forthcomingObjectList) {
  return header.edisit;
};

module.exports = {
  getBindingMap8010,
  getBindingMap8080minus,
  getBindingMap8080plus,
};
