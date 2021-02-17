const { Converter } = require("../convertHelper");
// import { Converter } from '../utils/convertHelper'

/**
 * @param currentObject
 * @param header
 */
function bindBusinessUnitIdentifier (currentObject, header) {
  return header.edisit
};

/**
 * @param currentObject
 */
function bindDateEpoch (currentObject) {
  return currentObject.dtrrec.getTime()
};

/**
 *
 */
function getExpectedPackagesBindingMap () {
  return {
    bindings: [
      { destination: 'quantity', type: 'fixed', value: null },
      { destination: 'type', type: 'fixed', value: null }
    ]
  }
};

/**
 * @param currentObject
 */
function bindExpectedPackages (currentObject) {
  return new Converter().convert([currentObject], [getExpectedPackagesBindingMap()])
};

/**
 *
 */
function getPackagesBindingMap () {
  return {
    bindings: [
      { destination: 'quantity', source: 'quantity', type: 'copy' },
      { destination: 'type', type: 'fixed', value: 'parcel' }
    ]
  }
};

/**
 * @param currentObject
 */
function bindPackages (currentObject) {
  if (currentObject.children4120) {
    let quantity = 0
    currentObject.children4120.forEach((child4120) => {
      if (child4120.children4130) {
        const firstChild = child4120.children4130[0]
        if (firstChild.pcbpro !== 0) {
          if (firstChild.spcpro !== 0) {
            quantity += Math.ceil((child4120.uvcrec + child4120.uvcimm) / firstChild.pcbpro / firstChild.spcpro)
            return
          }
          quantity += Math.ceil((child4120.uvcrec + child4120.uvcimm) / firstChild.pcbpro)
          return
        }
        quantity += child4120.uvcrec + child4120.uvcimm
      }
    })
    if (quantity === 0 ) return null
  
    return new Converter().convert([{ quantity }], [getPackagesBindingMap()])
  }
  return null
};

/**
 * @param currentObject
 */
function bindReceptionLinesPhysicalStockExpirationDate (currentObject) {
  if (currentObject.datfvi) return currentObject.datfvi.getTime()
  return null
};

/**
 * @param currentObject
 */
function bindBlockingType (currentObject) {
  return currentObject.motimm === 'CAS' ? 'broken' : 'dispute'
};

/**
 * @param currentObject
 */
function bindMovementDate (currentObject) {
  return currentObject.parent.parent.dtrrec.getTime()
};

/**
 * @param currentObject
 */
function bindQuantity (currentObject) {
  return currentObject.uvcmvt / currentObject.parent.codmtr
};

/**
 *
 */
function getBlockedStockMovementBindingMap () {
  return {
    bindings: [
      { destination: 'blockingType', type: 'function', value: bindBlockingType },
      { destination: 'movementDate', type: 'function', value: bindMovementDate },
      { destination: 'quantity', type: 'function', value: bindQuantity },
      { destination: 'reason', type: 'fixed', value: null }
    ]
  }
};

/**
 * @param currentObject
 */
function bindReceptionLinesBlockedStockMovement (currentObject) {
  if (currentObject.children4130) {
    const filtered4130 = currentObject.children4130.filter((item) => item.motimm !== null)
    if (filtered4130.length > 0) {
      return new Converter().convert(filtered4130, [getBlockedStockMovementBindingMap()])
    }
  }
  return null
};

/**
 *
 */
function getReceptionLinesMap () {
  return {
    bindings: [
      { destination: 'identifier', source: 'nlirec', type: 'copy' },
      { destination: 'productReferenceBU', source: 'codpro', type: 'copy' },
      { destination: 'productReferenceAdeo', type: 'fixed', value: null },
      { destination: 'quantity', source: 'uvcrec', type: 'copy' },
      { destination: 'deliveryNoteQuantity', type: 'fixed', value: null },
      { destination: 'differenceQuantity', type: 'fixed', value: 0 },
      { destination: 'physicalStockExpirationDate', type: 'function', value: bindReceptionLinesPhysicalStockExpirationDate },
      { destination: 'transferID', type: 'fixed', value: null },
      { destination: 'purchaseOrderID', source: 'refrec', type: 'copy' },
      { destination: 'customerOrderNumber', type: 'fixed', value: null },
      { destination: 'blockedStockMovement', type: 'function', value: bindReceptionLinesBlockedStockMovement }
    ]
  }
};

/**
 * @param currentObject
 */
function bindReceptionLines (currentObject) {
  return new Converter().convert(currentObject.children4120, [getReceptionLinesMap()])
};

function bindIdentifier (currentObject) {
  return String(currentObject.numrec)
}

/**
 *
 */
function getBindingMap () {
  return {
    skipObjectIf: new Map([
      ['regexc', ['41.01', '41.20', '41.30', '41.80', '41.99']]
    ]),
    bindings: [
      { destination: 'key.identifier', source: 'numrec', type: 'function', value: bindIdentifier  },
      { destination: 'key.deliveryLocation.businessUnitIdentifier', type: 'function', value: bindBusinessUnitIdentifier },
      { destination: 'key.deliveryLocation.identifier', source: 'codact', type: 'copy' },
      { destination: 'key.deliveryLocation.type', type: 'fixed', value: 'warehouse' },
      { destination: 'key.shippingLocation.businessUnitIdentifier', type: 'function', value: bindBusinessUnitIdentifier },
      { destination: 'key.shippingLocation.identifier', source: 'codfou', type: 'copy' },
      { destination: 'key.shippingLocation.type', type: 'fixed', value: 'supplier' },
      { destination: 'identifier', source: 'numrec', type: 'function', value: bindIdentifier },
      { destination: 'supplyCircuitType', type: 'fixed', value: 'stock' },
      { destination: 'validationDate', type: 'function', value: bindDateEpoch },
      { destination: 'startDate', type: 'function', value: bindDateEpoch },
      { destination: 'closedDate', type: 'function', value: bindDateEpoch },
      { destination: 'deliveryNoteNumber', type: 'fixed', value: null },
      { destination: 'shipmentIdentifier', type: 'fixed', value: null },
      { destination: 'expectedPackages', type: 'function', value: bindExpectedPackages },
      { destination: 'packages', type: 'function', value: bindPackages },
      { destination: 'deliveryLocation.businessUnitIdentifier', type: 'function', value: bindBusinessUnitIdentifier },
      { destination: 'deliveryLocation.identifier', source: 'codact', type: 'copy' },
      { destination: 'deliveryLocation.type', type: 'fixed', value: 'warehouse' },
      { destination: 'shippingLocation.businessUnitIdentifier', type: 'function', value: bindBusinessUnitIdentifier },
      { destination: 'shippingLocation.identifier', source: 'codfou', type: 'copy' },
      { destination: 'shippingLocation.type', type: 'fixed', value: 'supplier' },
      { destination: 'receptionLines', type: 'function', value: bindReceptionLines }
    ]
  }
};

// export default {
//   getBindingMap
// }
module.exports = {
  getBindingMap,
};
