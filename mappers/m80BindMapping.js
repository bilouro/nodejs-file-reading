// StockAdjustmentHasBeenDone -> 80.00.CODMVT = 10
function getBindingMap8010() {
  return  {
      processObjectOnlyIf: new Map([
        ['codmvt', [ '10',],],
      ]),
      bindings: [
              { destination: 'event', type: 'fixed', value: 'StockAdjustmentHasBeenDone' },
              { destination: 'key.productReferenceBU', source: 'codpro',          type: 'function', value: bindProductReferenceBU },
              { destination: 'key.sourcingLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
              { destination: 'key.sourcingLocation.identifier', source: 'codact', type: 'copy' },
              { destination: 'key.sourcingLocation.type',                         type: 'fixed', value: 'warehouse' },
              { destination: 'identifier', source: 'refmvt',                      type: 'copy' },
              { destination: 'collaboratorIdentifier',                            type: 'fixed', value: null },
              { destination: 'productReferenceAdeo',                              type: 'fixed', value: null },
              { destination: 'productReferenceBU', source: 'codpro',              type: 'function', value: bindProductReferenceBU },
              { destination: 'goodsReceivingIdentifier',                          type: 'fixed', value: null },
              { destination: 'adjustmentDate',                                    type: 'function', value: bind__date_epoch },
              { destination: 'quantity',                                          type: 'function', value: bind__stockAdjustmentHasBeenDone_quantity },
              { destination: 'reason', source: 'motmvt',                          type: 'copy' },
              { destination: 'blockedStock',                                      type: 'fixed', value: null },
              { destination: 'sourcingLocation.businessUnitIdentifier',           type: 'function', value: bind__businessUnitIdentifier },
              { destination: 'sourcingLocation.identifier', source: 'codact',     type: 'copy' },
              { destination: 'sourcingLocation.type',                             type: 'fixed', value: 'warehouse' },
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
              { destination: 'event', type: 'fixed', value: 'ProductHasBeenBlocked' },
              { destination: 'key.productReferenceBU', source: 'codpro',          type: 'function', value: bindProductReferenceBU},
              { destination: 'key.sourcingLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
              { destination: 'key.sourcingLocation.identifier', source: 'codact', type: 'copy' },
              { destination: 'key.sourcingLocation.type',                         type: 'fixed', value: 'warehouse' },
              { destination: 'identifier', source: 'refmvt',                      type: 'copy' },
              { destination: 'collaboratorIdentifier',                            type: 'fixed', value: null },
              { destination: 'productReferenceAdeo',                              type: 'fixed', value: null },
              { destination: 'productReferenceBU', source: 'codpro',              type: 'function', value: bindProductReferenceBU },
              { destination: 'blockingType',                                      type: 'fixed', value: 'blocked' },
              { destination: 'reason', source: 'edimvt',                          type: 'copy' },
              { destination: 'previousType',                                      type: 'fixed', value: null },
              { destination: 'previousReason',                                    type: 'fixed', value: null },
              { destination: 'movementDate',                                      type: 'function', value: bind__date_epoch },
              { destination: 'quantity', source: 'uvcmvt',                        type: 'copy' },
              { destination: 'sourcingLocation.businessUnitIdentifier',           type: 'function', value: bind__businessUnitIdentifier },
              { destination: 'sourcingLocation.identifier', source: 'codact',     type: 'copy' },
              { destination: 'sourcingLocation.type',                             type: 'fixed', value: 'warehouse' },
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
              { destination: 'event', type: 'fixed', value: 'ProductHasBeenUnblocked' },
              { destination: 'key.productReferenceBU', source: 'codpro',          type: 'function', value: bindProductReferenceBU },
              { destination: 'key.sourcingLocation.businessUnitIdentifier',       type: 'function', value: bind__businessUnitIdentifier },
              { destination: 'key.sourcingLocation.identifier', source: 'codact', type: 'copy' },
              { destination: 'key.sourcingLocation.type',                         type: 'fixed', value: 'warehouse' },
              { destination: 'identifier', source: 'refmvt',                      type: 'copy' },
              { destination: 'collaboratorIdentifier',                            type: 'fixed', value: null },
              { destination: 'productReferenceAdeo',                              type: 'fixed', value: null },
              { destination: 'productReferenceBU', source: 'codpro',              type: 'function', value: bindProductReferenceBU },
              { destination: 'previousType',                                      type: 'fixed', value: 'blocked' },
              { destination: 'previousReason', source: 'edimvt',                  type: 'copy' },
              { destination: 'movementDate',                                      type: 'function', value: bind__date_epoch },
              { destination: 'quantity', source: 'uvcmvt',                        type: 'copy' },
              { destination: 'sourcingLocation.businessUnitIdentifier',           type: 'function', value: bind__businessUnitIdentifier },
              { destination: 'sourcingLocation.identifier', source: 'codact',     type: 'copy' },
              { destination: 'sourcingLocation.type',                             type: 'fixed', value: 'warehouse' },
          ]
      }            
};

function bindProductReferenceBU(currentObject) {
  return String(Number(currentObject.codpro))
}


function bind__date_epoch(currentObject) {
  return currentObject.datmvt.getTime();
};

function bind__stockAdjustmentHasBeenDone_quantity(currentObject) {
  if (currentObject.senmvt === '-') {
    return Number(currentObject.senmvt + currentObject.uvcmvt);
  }
  return currentObject.uvcmvt;
};

function bind__businessUnitIdentifier(currentObject, header) {
  return header.edisit;
};

module.exports = {
  getBindingMap8010,
  getBindingMap8080minus,
  getBindingMap8080plus,
};
