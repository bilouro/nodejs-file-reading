const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");

fs.readFile('./files/358M4121010500151789.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    // console.log(JSON.stringify(dataObjects, null, 2));
    const eventObjects = new Converter().convert(dataObjects, getBindingMap());
    console.log(JSON.stringify(eventObjects, null, 2));
});

/**
 *  Insert a empty list of attributes to ignore a line of file: 
 *                ["00", []], 
 */
function getFileMapping() {
  return {
    discriminatorInitialPostion: 0,
    discriminatorLenght: 5,
    lines: new Map([
      [
        '00.00',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'emtexc', initialPosition: 6, length: 14, type: 'string', required: false },
          { name: 'rctexc', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'datexc', initialPosition: 34, length: 14, type: 'date', required: false, dateFormat: 'YYYYMMDDhhmmss' },
          { name: 'heuexc', initialPosition: 42, length: 6, type: 'string', required: false },
          { name: 'numexc', initialPosition: 48, length: 7, type: 'integer', required: false },
          { name: 'acqexc', initialPosition: 55, length: 1, type: 'string', required: false },
          { name: 'verexc', initialPosition: 56, length: 4, type: 'string', required: false },
          { name: 'nomsys', initialPosition: 60, length: 8, type: 'string', required: false },
          { name: 'nomdtq', initialPosition: 68, length: 10, type: 'string', required: false },
          { name: 'bibdtq', initialPosition: 78, length: 10, type: 'string', required: false },
          { name: 'libexc', initialPosition: 88, length: 30, type: 'string', required: false },
          { name: 'bibdst', initialPosition: 118, length: 10, type: 'string', required: false },
          { name: 'pgmdst', initialPosition: 128, length: 10, type: 'string', required: false },
          { name: 'pardst', initialPosition: 138, length: 30, type: 'string', required: false },
          { name: 'codact', initialPosition: 168, length: 3, type: 'string', required: false },
          { name: 'iglsit', initialPosition: 171, length: 3, type: 'integer', required: false },
          { name: 'edisit', initialPosition: 174, length: 14, type: 'integer', required: false },
          { name: 'imaexc', initialPosition: 188, length: 8, type: 'integer', required: false },
          { name: 'idemsg', initialPosition: 196, length: 30, type: 'string', required: false },
          { name: 'dsiexc', initialPosition: 226, length: 30, type: 'string', required: false },
        ],
      ],
      [
        '41.00', 
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: false },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: false },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: false },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numrec', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snurec', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'refrec', initialPosition: 17, length: 6, type: 'string', required: false },
          { name: 'refexp', initialPosition: 23, length: 24, type: 'string', required: false },
          { name: 'codapp', initialPosition: 47, length: 10, type: 'string', required: false },
          { name: 'codldr', initialPosition: 57, length: 3, type: 'string', required: false },
          { name: 'codtre', initialPosition: 60, length: 3, type: 'string', required: false },
          { name: 'oricde', initialPosition: 63, length: 1, type: 'string', required: false },
          { name: 'codact', initialPosition: 64, length: 3, type: 'integer', required: false },
          { name: 'codfou', initialPosition: 67, length: 14, type: 'integer', required: false },
          { name: 'codtra', initialPosition: 81, length: 14, type: 'string', required: false },
          { name: 'dtirec', initialPosition: 95, length: 12, type: 'date', required: false, dateFormat: 'YYYYMMDDhhmm' },
          { name: 'heirec', initialPosition: 103, length: 4, type: 'integer', required: false, dateFormat: 'hhmm' },
          { name: 'dtmrec', initialPosition: 107, length: 12, type: 'date', required: false, dateFormat: 'YYYYMMDDhhmm' },
          { name: 'hemrec', initialPosition: 115, length: 4, type: 'integer', required: false, dateFormat: 'hhmm' },
          { name: 'dtrrec', initialPosition: 119, length: 12, type: 'date', required: false, dateFormat: 'YYYYMMDDhhmm' },
          { name: 'herrec', initialPosition: 127, length: 4, type: 'integer', required: false, dateFormat: 'hhmm' },
          { name: 'kairec', initialPosition: 131, length: 3, type: 'integer', required: false },
          { name: 'ctrrec', initialPosition: 134, length: 10, type: 'string', required: false },
          { name: 'refcnt', initialPosition: 144, length: 10, type: 'string', required: false },
          { name: 'cmtrec1a', initialPosition: 154, length: 2, type: 'string', required: false },
          { name: 'cmtrec1b', initialPosition: 156, length: 8, type: 'string', required: false, dateFormat: 'YYYYMMDD' },
          { name: 'cmtrec1c', initialPosition: 164, length: 8, type: 'string', required: false },
          { name: 'cmtrec1d', initialPosition: 172, length: 1, type: 'string', required: false },
          { name: 'cmtrec1e', initialPosition: 173, length: 2, type: 'string', required: false },
          { name: 'cmtrec1', initialPosition: 175, length: 9, type: 'string', required: false },
          { name: 'cmtrec2', initialPosition: 184, length: 30, type: 'string', required: false },
          { name: 'datrlq', initialPosition: 214, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] },
          { name: 'codacr', initialPosition: 222, length: 3, type: 'string', required: false },
          { name: 'natrec', initialPosition: 225, length: 1, type: 'string', required: false },
          { name: 'edifou', initialPosition: 226, length: 14, type: 'string', required: false },
          { name: 'codcnt', initialPosition: 240, length: 14, type: 'string', required: false },
          { name: 'typrmt', initialPosition: 254, length: 1, type: 'string', required: false },
          { name: 'disexc', initialPosition: 255, length: 1, type: 'string', required: false },
        ],
      ],
      [
        '41.01',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: false },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: false },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: false },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numrec', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snurec', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'refrec', initialPosition: 17, length: 30, type: 'string', required: false },
          { name: 'diprec', initialPosition: 47, length: 50, type: 'string', required: false },
          { name: 'toprec', initialPosition: 97, length: 5, type: 'string', required: false },
          { name: 'datbdr', initialPosition: 102, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD' },
          { name: 'ediact', initialPosition: 110, length: 14, type: 'string', required: false },
          { name: 'editra', initialPosition: 124, length: 14, type: 'string', required: false },
          { name: 'datbdl', initialPosition: 138, length: 8, type: 'integer', required: false },
          { name: 'codtdd', initialPosition: 146, length: 3, type: 'string', required: false },
          { name: 'nummtr', initialPosition: 149, length: 20, type: 'string', required: false },
          { name: 'disexc', initialPosition: 169, length: 87, type: 'string', required: false },
          { name: 'id4100', type: 'parent', parentDiscriminator:'41.00', parentAttribute:'uuid'},
        ],
      ],
      [
        '41.20',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: false },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: false },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: false },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numrec', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snurec', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'refrec', initialPosition: 17, length: 30, type: 'string', required: false },
          { name: 'nlirec', initialPosition: 47, length: 5, type: 'integer', required: false },
          { name: 'codact', initialPosition: 52, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 55, length: 14, type: 'string', required: false },
          { name: 'codpro', initialPosition: 69, length: 17, type: 'string', required: false },
          { name: 'valpro', initialPosition: 86, length: 2, type: 'integer', required: false },
          { name: 'uvcrea', initialPosition: 88, length: 9, type: 'integer', required: false },
          { name: 'unicde', initialPosition: 97, length: 3, type: 'string', required: false },
          { name: 'codprn', initialPosition: 100, length: 17, type: 'string', required: false },
          { name: 'typope', initialPosition: 117, length: 1, type: 'string', required: false },
          { name: 'numope', initialPosition: 118, length: 6, type: 'integer', required: false },
          { name: 'codacr', initialPosition: 124, length: 3, type: 'string', required: false },
          { name: 'uvcrec', initialPosition: 127, length: 9, type: 'integer', required: false },
          { name: 'uvcgra', initialPosition: 136, length: 9, type: 'integer', required: false },
          { name: 'uvcimm', initialPosition: 145, length: 9, type: 'integer', required: false },
          { name: 'motimm', initialPosition: 154, length: 3, type: 'string', required: false },
          { name: 'uvcrfu', initialPosition: 157, length: 9, type: 'integer', required: false },
          { name: 'motrfu', initialPosition: 166, length: 3, type: 'string', required: false },
          { name: 'uvcrlq', initialPosition: 169, length: 9, type: 'integer', required: false },
          { name: 'datfvi', initialPosition: 178, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] },
          { name: 'mespro', initialPosition: 186, length: 1, type: 'string', required: false },
          { name: 'pdnrec', initialPosition: 187, length: 11, type: 'integer', required: false },
          { name: 'datfab', initialPosition: 198, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD' },
          { name: 'codlot', initialPosition: 206, length: 20, type: 'string', required: false },
          { name: 'numlot', initialPosition: 226, length: 9, type: 'integer', required: false },
          { name: 'recsol', initialPosition: 235, length: 1, type: 'string', required: false },
          { name: 'codmtr', initialPosition: 236, length: 5, type: 'string', required: false },
          { name: 'indpro', initialPosition: 241, length: 2, type: 'string', required: false },
          { name: 'indproa', initialPosition: 243, length: 8, type: 'integer', required: false },
          { name: 'disexc', initialPosition: 251, length: 5, type: 'string', required: false },
          { name: 'id4100', type: 'parent', parentDiscriminator:'41.00', parentAttribute:'uuid'},
        ],
      ],
      [
        '41.30',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: false },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: false },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: false },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numrec', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snurec', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'refrec', initialPosition: 17, length: 30, type: 'string', required: false },
          { name: 'nlirec', initialPosition: 47, length: 5, type: 'integer', required: false },
          { name: 'uvcmvt', initialPosition: 52, length: 9, type: 'integer', required: false },
          { name: 'spcpro', initialPosition: 61, length: 4, type: 'integer', required: false },
          { name: 'pcbpro', initialPosition: 65, length: 5, type: 'integer', required: false },
          { name: 'codlot', initialPosition: 70, length: 20, type: 'string', required: false },
          { name: 'numlot', initialPosition: 90, length: 9, type: 'integer', required: false },
          { name: 'codnds', initialPosition: 99, length: 20, type: 'string', required: false },
          { name: 'datfab', initialPosition: 119, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD' },
          { name: 'datfvi', initialPosition: 127, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] },
          { name: 'codpal', initialPosition: 135, length: 18, type: 'string', required: false },
          { name: 'motimm', initialPosition: 153, length: 3, type: 'string', required: false },
          { name: 'datiimm', initialPosition: 156, length: 16, type: 'string', required: false },
          { name: 'heuimm', initialPosition: 172, length: 12, type: 'integer', required: false },
          { name: 'codsit', initialPosition: 184, length: 3, type: 'string', required: false },
          { name: 'zonsts', initialPosition: 187, length: 1, type: 'string', required: false },
          { name: 'allsts', initialPosition: 188, length: 3, type: 'integer', required: false },
          { name: 'dplsts', initialPosition: 191, length: 4, type: 'integer', required: false },
          { name: 'nivsts', initialPosition: 195, length: 2, type: 'integer', required: false },
          { name: 'codact', initialPosition: 197, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 200, length: 14, type: 'string', required: false },
          { name: 'codpro', initialPosition: 214, length: 17, type: 'string', required: false },
          { name: 'valpro', initialPosition: 231, length: 2, type: 'integer', required: false },
          { name: 'prxpro', initialPosition: 233, length: 9, type: 'integer', required: false },
          { name: 'pdbpal', initialPosition: 242, length: 7, type: 'integer', required: false },
          { name: 'pdnrec', initialPosition: 249, length: 7, type: 'integer', required: false },
          { name: 'id4120', type: 'parent', parentDiscriminator:'41.20', parentAttribute:'uuid'},
        ],
      ],
      [
        '41.80',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: false },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: false },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: false },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numrec', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snurec', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: false },
          { name: 'codfou', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'refrec', initialPosition: 34, length: 30, type: 'string', required: false },
          { name: 'codemb', initialPosition: 64, length: 3, type: 'string', required: false },
          { name: 'qtbsor', initialPosition: 67, length: 9, type: 'integer', required: false },
          { name: 'qtbent', initialPosition: 76, length: 9, type: 'integer', required: false },
          { name: 'prxemb', initialPosition: 85, length: 6, type: 'integer', required: false },
          { name: 'codtra', initialPosition: 91, length: 14, type: 'string', required: false },
          { name: 'proemb', initialPosition: 105, length: 17, type: 'string', required: false },
          { name: 'datemb', initialPosition: 122, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] },
          { name: 'typtie', initialPosition: 130, length: 1, type: 'string', required: false },
          { name: 'disexc', initialPosition: 131, length: 125, type: 'string', required: false },
          { name: 'id4100', type: 'parent', parentDiscriminator:'41.00', parentAttribute:'uuid'},
        ],
      ],
      [
        '41.99',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: false },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: false },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: false },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numrec', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snurec', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'refrec', initialPosition: 17, length: 30, type: 'string', required: false },
          { name: 'cumlig', initialPosition: 47, length: 4, type: 'integer', required: false },
          { name: 'cumpal', initialPosition: 51, length: 5, type: 'integer', required: false },
          { name: 'coltot', initialPosition: 56, length: 9, type: 'integer', required: false },
          { name: 'totpro', initialPosition: 65, length: 5, type: 'integer', required: false },
          { name: 'disexc', initialPosition: 70, length: 186, type: 'string', required: false },
          { name: 'id4100', type: 'parent', parentDiscriminator:'41.00', parentAttribute:'uuid'},
        ],
      ],
      [
        '99.00',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'emtexc', initialPosition: 6, length: 14, type: 'string', required: false },
          { name: 'rctexc', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'datexc', initialPosition: 34, length: 14, type: 'date', required: true, dateFormat: 'YYYYMMDDhhmmss' },
          { name: 'heuexc', initialPosition: 42, length: 6, type: 'string', required: true },
          { name: 'numexc', initialPosition: 48, length: 7, type: 'integer', required: false },
          { name: 'cptexc', initialPosition: 55, length: 8, type: 'string', required: true },
          { name: 'nomsys', initialPosition: 63, length: 8, type: 'string', required: false },
          { name: 'nomdtq', initialPosition: 71, length: 10, type: 'string', required: false },
          { name: 'bibdtq', initialPosition: 81, length: 10, type: 'string', required: false },
          { name: 'idemsg', initialPosition: 91, length: 30, type: 'string', required: false },
          { name: 'dsiexc', initialPosition: 121, length: 173, type: 'string', required: false },
        ],
      ],
    ]),
  };
};

function getBindingMap() {
  return  {
      header: 0,   //null for no header
      footer: -1,  //null for no footer
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
  return new Converter().convert([currentObject], getExpectedPackagesBindingMap())
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

  return new Converter().convert(packagesArray, getPackagesBindingMap());
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

  return new Converter().convert(receptionLinesArray, getReceptionLinesMap());
};

function bind__receptionLines_physicalStockExpirationDate(currentObject, header, footer, forthcomingObjectList) {
  if (currentObject.datfvi) return currentObject.datfvi.getTime();
  return null;
}
