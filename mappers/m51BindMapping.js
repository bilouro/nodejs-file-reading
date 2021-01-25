const { Converter } = require("../convertHelper");
const { uniquifyList } = require("../uniquifyHelper");

function getBindingMap() {
  return  {
      skipObjectIf: new Map([
        ['regexc', [ '51.01', '51.05', '51.30', '51.31', '51.20', '51.27', '51.80', '51.99' ],],
      ]),
      bindings: [
          { destination: 'identifier', source: 'numtou',                  type: 'copy' },
          { destination: 'shippingDate', source: 'datexp',                  type: 'copy' },
          { destination: 'expectedDeliveryDate', source: 'datliv',                  type: 'copy' },
          { destination: 'supplyCircuitType', type: 'function', value: bind__supplyCircuitType },
          { destination: 'deliveryNoteIdentifier', source: 'numtou', type: 'copy' },
          { destination: 'deliveryNoteDate', type: 'fixed', value: null },
          { destination: 'packages', type: 'function', value: bind__packages },
          { destination: 'returnableContainers', type: 'fixed', value: [] },
          { destination: 'conditioning.grossWeight', type: 'function', value: bind__conditioning_grossWeight },
          { destination: 'conditioning.grossWeightUnitOfMeasure', type: 'fixed', value: 'kg' },
          { destination: 'conditioning.grossVolume', type: 'function', value: bind__conditioning_grossVolume },
          { destination: 'conditioning.grossVolumeUnitOfMeasure', type: 'fixed', value: 'm3' },
          { destination: 'conditioning.footage', type: 'fixed', value: null },
          { destination: 'conditioning.palletEquivalent', type: 'fixed', value: null },
          { destination: 'transport.carrierName', type: 'fixed', value: null },
          { destination: 'transport.carrierSCAC', type: 'fixed', value: null },
          { destination: 'equipment.identifier', source: 'codtra', type: 'copy' },
          { destination: 'equipment.licensePlate', type: 'function', value: bind__equipment_licensePlate },
          { destination: 'equipment.sealNumber', source: 'numplb', type: 'copy' },
          { destination: 'shippingLocation.businessUnitIdentifier',  type: 'function', value: bind__businessUnitIdentifier },
          { destination: 'shippingLocation.identifier', source: 'codact', type: 'copy' },
          { destination: 'shippingLocation.type', type: 'fixed', value: 'warehouse' },
          { destination: 'invoicingLocation.businessUnitIdentifier', type: 'function', value: bind__5101_businessUnitIdentifier },
          { destination: 'invoicingLocation.identifier', source: 'codcli', type: 'copy' },
          { destination: 'invoicingLocation.type', type: 'fixed', value: 'store' },
          { destination: 'orderingLocation.businessUnitIdentifier', type: 'function', value: bind__5101_businessUnitIdentifier },
          { destination: 'orderingLocation.identifier', source: 'codcli', type: 'copy' },
          { destination: 'orderingLocation.type', type: 'fixed', value: 'store' },
          { destination: 'deliveryLocation.businessUnitIdentifier', source: 'codrgt', type: 'copy' },
          { destination: 'deliveryLocation.identifier', type: 'function', value: bind__deliveryLocation_identifier },
          { destination: 'deliveryLocation.type', type: 'function', value: bind__deliveryLocation_type },
          { destination: 'shipmentLoadingUnits', type: 'function', value: bind__shipmentLoadingUnits },
        ]
  }
};

function test(currentObject) {
  return currentObject.cliliv;
}

function bind__supplyCircuitType(currentObject) {
  return __findValrubForCodrubValue(currentObject.children5105, 'CIRL');
}

function getPackagesBindingMap() {
  return {
    bindings: [
      { destination: 'type', type: 'function', value: bind__packages_type },
      { destination: 'quantity', source: 'quantity', type: 'copy' },
    ]
  }
};

function bind__packages(currentObject) {
  const uniqueCODEMB = {};
  currentObject.children5130.forEach((child5130) => {
    if (!uniqueCODEMB[child5130.codemb[0]]) { uniqueCODEMB[child5130.codemb[0]] = 1; }
    else {
      uniqueCODEMB[child5130.codemb[0]] += 1;
    }
  })
  return new Converter().convert(Object.keys(uniqueCODEMB).map((key) => ({ codemb: key, quantity: uniqueCODEMB[key] })), [getPackagesBindingMap()]);
};

function bind__packages_type(currentObject) {
  return currentObject.codemb === 'P' ? 'pallet' : 'parcel';
}

function bind__conditioning_grossWeight(currentObject) {
  let grossWeight = 0;
  currentObject.children5130.forEach(child5130 => child5130.children5131.forEach(child5131 => grossWeight += child5131.pdbliv));
  return grossWeight / 1000;
}

function bind__conditioning_grossVolume(currentObject) {
  let grossVolume = 0;
  currentObject.children5130.forEach(child5130 => child5130.children5131.forEach(child5131 => grossVolume += child5131.volcol));
  return grossVolume / 1000;
}

function bind__equipment_licensePlate(currentObject) {
  if (currentObject.refcnt) return currentObject.refcnt;
  if (currentObject.codcam.includes('-')) return currentObject.codcam;
  return null;
}

function bind__businessUnitIdentifier(currentObject, header) {
  return header.edisit;
}

function bind__5101_businessUnitIdentifier(currentObject) {
  return currentObject.children5101[0].dipliv;
}
function bind__deliveryLocation_identifier(currentObject) {
  return currentObject.cliliv.substr(-3);
}

function bind__deliveryLocation_type(currentObject) {
  return currentObject.codtli !== 'FOU' ? 'store' : 'supplier';
}

function getShipmentLoadingUnitsWithSSCHETBindingMap() {
  return {
    bindings: [
      { destination: 'identifier', source: 'sschet', type: 'copy'},
      { destination: 'sscc', source: 'sschet', type: 'copy'},
      { destination: 'packageType', type: 'fixed', value: 'pallet'},
      { destination: 'palletEquivalent', type: 'fixed', value: null },
      { destination: 'containerCondition', type: 'fixed', value: null },
      { destination: 'conditioning.grossWeight', type: 'function', value: bind__shipmentLoadingUnits_grossWeight },
      { destination: 'conditioning.grossWeightUnitOfMeasure', type: 'fixed', value: 'kg' },
      { destination: 'conditioning.grossVolume', type: 'fixed', value: null },
      { destination: 'conditioning.grossVolumeUnitOfMeasure', type: 'fixed', value: null },
      { destination: 'conditioning.width', type: 'fixed', value: null },
      { destination: 'conditioning.widthUnitOfMeasure', type: 'fixed', value: null },
      { destination: 'conditioning.height', type: 'fixed', value: null },
      { destination: 'conditioning.heightUnitOfMeasure', type: 'fixed', value: null },
      { destination: 'conditioning.length', type: 'fixed', value: null },
      { destination: 'conditioning.lengthUnitOfMeasure', type: 'fixed', value: null },
      { destination: 'shipmentLoadingUnits', type: 'function', value: bind__shipmentLoadingUnits_CODPAL },
    ]
  }
};

function getShipmentLoadingUnitsByCODPALBindingMap() {
  return {
    bindings: [
      { destination: 'identifier', source: 'codpal', type: 'copy'},
      { destination: 'sscc', source: 'codpal', type: 'copy'},
      { destination: 'packageType', type: 'function', value: bind__shipmentLoadingUnits_packageType},
      { destination: 'palletEquivalent', type: 'fixed', value: null },
      { destination: 'containerBillingClass', type: 'fixed', value: null },
      { destination: 'containerCondition', type: 'fixed', value: null },
      { destination: 'containerStatusControl', type: 'fixed', value: null },
      { destination: 'conditioning.grossWeight', type: 'fixed', value: null },
      { destination: 'conditioning.grossWeightUnitOfMeasure', type: 'fixed', value: 'kg' },
      { destination: 'conditioning.grossVolume', type: 'fixed', value: null },
      { destination: 'conditioning.grossVolumeUnitOfMeasure', type: 'fixed', value: null },
      { destination: 'conditioning.width', type: 'fixed', value: null },
      { destination: 'conditioning.widthUnitOfMeasure', type: 'fixed', value: null },
      { destination: 'conditioning.height', type: 'fixed', value: null },
      { destination: 'conditioning.heightUnitOfMeasure', type: 'fixed', value: null },
      { destination: 'conditioning.length', type: 'fixed', value: null },
      { destination: 'conditioning.lengthUnitOfMeasure', type: 'fixed', value: null },
      { destination: 'shipmentLoadingUnits', type: 'function', value: bind__shipmentLoadingUnits_2nd },
    ]
  }
};

function bind__shipmentLoadingUnits(currentObject) {
  const sschetList = {};
  const noSschetList = [];
  currentObject.children5130.forEach(child5130 => {
    if (child5130.sschet) {
      if (!sschetList[child5130.sschet]) {
        sschetList[child5130.sschet] = [child5130];
      } else {
        sschetList[child5130.sschet].push(child5130);
      }
    } else {
      noSschetList.push(child5130);
    }
  });

  const sschetObjs = Object.keys(sschetList).map(sschet => ({ sschet, children5130: sschetList[sschet] }));
  sschetObjs.push({ sschet: null, children5130: noSschetList });
  
  let shipmentLoadingUnits = [];
  sschetObjs.forEach(sschetObj => {
    if (!sschetObj.sschet) {
      shipmentLoadingUnits = shipmentLoadingUnits.concat(bind__shipmentLoadingUnits_CODPAL(sschetObj));
    } else {
      shipmentLoadingUnits = shipmentLoadingUnits.concat(new Converter().convert([sschetObj], [getShipmentLoadingUnitsWithSSCHETBindingMap()]));
    }
  })

  return shipmentLoadingUnits;
};

function bind__shipmentLoadingUnits_CODPAL(currentObject) {
  const uniqueCODPAL = uniquifyList(currentObject.children5130,['children5131', 'children5120'], (obj) => obj.codpal);

  return new Converter().convert(uniqueCODPAL, [getShipmentLoadingUnitsByCODPALBindingMap()]);
};

function bind__shipmentLoadingUnits_grossWeight(currentObject) {
  let grossVolume = 0;
  currentObject.children5130.forEach(child5130 => child5130.children5131.forEach(child5131 => grossVolume += child5131.pdbliv));
  return grossVolume / 1000;
}

function bind__shipmentLoadingUnits_packageType(currentObject) {
  return currentObject.codemb[0] === 'P' ? 'pallet' : 'parcel';
};

function getShipmentLoadingUnits2ndBindingMap() {
  return {
    bindings: [
      { destination: 'identifier', type: 'function', value: bind__shipmentLoadingUnits_2nd_identifier},
      { destination: 'productGtin', source: 'edipro', type: 'copy' },
      { destination: 'productReferenceBU', source: 'codpro', type: 'copy' },
      { destination: 'productReferenceAdeo', type: 'fixed', value: null },
      { destination: 'quantity', source: 'uvcliv', type: 'copy' },
      { destination: 'freeQuantity', type: 'fixed', value: null },
      { destination: 'qualification', type: 'fixed', value: null },
      { destination: 'qualificationDescription', type: 'fixed', value: null },
      { destination: 'deliveryNoteDate', type: 'fixed', value: null },
      { destination: 'deliveryNoteIdentifier', type: 'fixed', value: null },
      { destination: 'customerOrderNumber', type: 'function', value: bind__shipmentLoadingUnits_customerOrderNumber },
      { destination: 'customerOrderLineNumber', type: 'fixed', value: null },
      // TODO: update with final M51
      // { destination: 'todo', type: 'function', value: bind__shipmentLoadingUnits_todo },
      { destination: 'transferIdentifier', type: 'function', value: bind__shipmentLoadingUnits_transferIdentifier },
      { destination: 'purchaseOrderIdentifier', type: 'fixed', value: null },
      { destination: 'returnSupplierIdentifier', type: 'fixed', value: null },
    ]
  }
};

function bind__shipmentLoadingUnits_2nd(currentObject) {
  return new Converter().convert(currentObject.children5120, [getShipmentLoadingUnits2ndBindingMap()]);
};

function bind__shipmentLoadingUnits_2nd_identifier(currentObject) {
  return `${currentObject.refliv}-${currentObject.nliliv}-${currentObject.parent.codpal}`;
}

function bind__shipmentLoadingUnits_customerOrderNumber(currentObject) {
  return __findValrubForCodrubValue(currentObject.children5127, 'CDCL');
}

function bind__shipmentLoadingUnits_todo(currentObject) {
  return __findValrubForCodrubValue(currentObject.children5127, 'CDTI');
}

function bind__shipmentLoadingUnits_transferIdentifier(currentObject) {
  return currentObject.parent.parent.refliv;
}

function __findValrubForCodrubValue(arrayToSearch, valueToFind) {
  let found = false;
  let foundValue = null;
  arrayToSearch.forEach(({valrub1, valrub2, valrub3, valrub4, codrub1, codrub2, codrub3, codrub4}) => {
    if (!found) {
      [codrub1, codrub2, codrub3, codrub4].forEach((codrub, index) => {
        if (codrub === valueToFind) {
          foundValue = [valrub1, valrub2, valrub3, valrub4][index];
          found = true;
        };
      });
    }
  })

  return foundValue;
};

module.exports = {
  getBindingMap,
};
