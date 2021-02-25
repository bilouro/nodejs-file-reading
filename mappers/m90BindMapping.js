const { Converter } = require("../convertHelper");

function getNotificationBindingMap() {
  return  {
    skipObjectIf: new Map([
      ['regexc', [ '90.60',],],
    ]),
    bindings: [
            { destination: 'snapshotDate',                                              type: 'function', value: bind__date_epoch },
            { destination: 'fileNamePath',                                              type: 'fixed', value: null },
            { destination: 'sourcingLocation.businessUnitIdentifier', source: 'edisit', type: 'header' },
            { destination: 'sourcingLocation.identifier', source: 'codact',             type: 'copy' },
            { destination: 'sourcingLocation.type',                                     type: 'fixed', value: 'warehouse' },
        ]
    } 
};

function getBindingMap() {
  return  {
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

function bind__date_epoch(currentObject, header) {
  return header.datexc.getTime();
};

function bind__physicalStockQuantity(currentObject) {
  return currentObject.children9060.reduce((acc, child9060) => { return acc + child9060.nbruvc01}, 0)

};

function bind__blockedStockQuantity(currentObject) {  
  return  currentObject.children9060.reduce((acc, child9060) =>  child9060.motimm !== null ? acc + child9060.nbruvc01 : acc, 0)
};

function getPhysicalStocksBindingMap() {
  return {
    bindings: [
      { destination: 'quantity', source: 'quantity', type: 'copy' },
      { destination: 'expirationDate',               type: 'function', value: bind__physicalStock_expirationDate  },
      { destination: 'qualification',                type: 'fixed', value: null },
      { destination: 'status', source: 'status',     type: 'copy' },
    ]
  }
};

function bind__physicalStock_expirationDate(currentObject) {
  return currentObject.datfvi ? currentObject.datfvi.getTime() : null
};

function bind__physicalStocksArray(currentObject) {
  const physicalStocksArray = [];

  currentObject.children9060.forEach(child9060 => {
    if (child9060.motimm === null) {
      let quantity = 0
      if (child9060.nbruvc01 !== 0) {
        quantity = child9060.nbruvc01 - child9060.nbruvc02 - child9060.nbruvc09
        physicalStocksArray.push({...child9060, quantity, status: 'physical stock available'})
      }
      if (child9060.nbruvc02 !== 0) {
        quantity = child9060.nbruvc02
        physicalStocksArray.push({...child9060, quantity, status: 'reserved'})
      }
      if (child9060.nbruvc03 !== 0) {
        quantity = child9060.nbruvc03
        physicalStocksArray.push({...child9060, quantity, status: 'in preparation'})
      }
      if (child9060.nbruvc04 !== 0) {
        quantity = child9060.nbruvc04
        physicalStocksArray.push({...child9060, quantity, status: 'prepared'})
      }
      if (child9060.nbruvc09 !== 0) {
        quantity = child9060.nbruvc09
        physicalStocksArray.push({...child9060, quantity, status: 'goods receiving in progress'})
      }
    }
  });

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

function bind__blockedStocksArray(currentObject) {
  const blockedStocksArray = currentObject.children9060.filter((child9060) => child9060.motimm !== null)

  return new Converter().convert(blockedStocksArray, [getBlockedStocksBindingMap()])
};

module.exports = {
  getNotificationBindingMap,
  getBindingMap,
};
