const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positinalFleHelper");

fs.readFile('./files/358M8020122900148776.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    console.log(dataObjects);
});

/**
 *  Insert a empty list of attributes to ignore a line of file: 
 *                ["00", []], 
 */
function getFileMapping() {
  return {
    discriminatorInitialPostion: 0,
    discriminatorLenght: 2,
    lines: new Map([
      [
        '00',
        [
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'emtexc', initialPosition: 6, length: 14, type: 'string', required: false },
          { name: 'rctexc', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'datexc', initialPosition: 34, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD' },
          { name: 'heuexc', initialPosition: 42, length: 6, type: 'integer', required: false },
          { name: 'numexc', initialPosition: 48, length: 7, type: 'integer', required: false },
          { name: 'acqexc', initialPosition: 55, length: 1, type: 'string', required: true },
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
          { name: 'edisit', initialPosition: 174, length: 14, type: 'string', required: false },
          { name: 'imaexc', initialPosition: 188, length: 8, type: 'integer', required: false },
          { name: 'idemsg', initialPosition: 196, length: 30, type: 'string', required: false },
          { name: 'dsiexc', initialPosition: 226, length: 68, type: 'string', required: false },
        ],
      ],
      [
        '80',
        [
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'datmvt', initialPosition: 6, length: 14, type: 'date', required: true, dateFormat: 'YYYYMMDD hhmmss' },
          { name: 'heumvt', initialPosition: 14, length: 6, type: 'string', required: true, dateFormat: 'hhmmss' },
          { name: 'datrgl', initialPosition: 20, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD' },
          { name: 'codmdu', initialPosition: 28, length: 2, type: 'string', required: true },
          { name: 'codfon', initialPosition: 30, length: 1, type: 'integer', required: true },
          { name: 'codmvt', initialPosition: 31, length: 2, type: 'string', required: true },
          { name: 'senmvt', initialPosition: 33, length: 1, type: 'string', required: true },
          { name: 'motmvt', initialPosition: 34, length: 3, type: 'string', required: true },
          { name: 'edimvt', initialPosition: 37, length: 3, type: 'string', required: true },
          { name: 'refmvt', initialPosition: 40, length: 30, type: 'string', required: true },
          { name: 'uvcmvt', initialPosition: 70, length: 9, type: 'integer', required: true },
          { name: 'codact', initialPosition: 79, length: 3, type: 'string', required: true },
          { name: 'codcli', initialPosition: 82, length: 14, type: 'string', required: true },
          { name: 'codpro', initialPosition: 96, length: 17, type: 'string', required: true },
          { name: 'valpro', initialPosition: 113, length: 2, type: 'integer', required: true },
          { name: 'codprn', initialPosition: 115, length: 17, type: 'string', required: true },
          { name: 'spcpro', initialPosition: 132, length: 4, type: 'integer', required: true },
          { name: 'pcbpro', initialPosition: 136, length: 5, type: 'integer', required: true },
          { name: 'codsit', initialPosition: 141, length: 3, type: 'string', required: true },
          { name: 'zonsts', initialPosition: 144, length: 1, type: 'string', required: true },
          { name: 'allsts', initialPosition: 145, length: 3, type: 'integer', required: true },
          { name: 'dplsts', initialPosition: 148, length: 4, type: 'integer', required: true },
          { name: 'nivsts', initialPosition: 152, length: 2, type: 'integer', required: true },
          { name: 'codlot', initialPosition: 154, length: 20, type: 'string', required: true },
          { name: 'numlot', initialPosition: 174, length: 9, type: 'integer', required: true },
          { name: 'codpal', initialPosition: 183, length: 18, type: 'string', required: true },
          { name: 'datfvi', initialPosition: 201, length: 8, type: 'integer', required: true },
          { name: 'numdim', initialPosition: 209, length: 8, type: 'integer', required: true },
          { name: 'codtie', initialPosition: 217, length: 14, type: 'string', required: true },
          { name: 'typtie', initialPosition: 231, length: 1, type: 'string', required: true },
          { name: 'numcde', initialPosition: 232, length: 8, type: 'integer', required: false },
          { name: 'snucde', initialPosition: 240, length: 3, type: 'integer', required: false },
          { name: 'coduti', initialPosition: 243, length: 10, type: 'string', required: false },
          { name: 'unipro', initialPosition: 253, length: 3, type: 'string', required: false },
          { name: 'codprocom (v1.09)', initialPosition: 256, length: 14, type: 'integer', required: false },
          { name: 'numligcde', initialPosition: 270, length: 5, type: 'integer', required: false },
          { name: 'numbu', initialPosition: 275, length: 3, type: 'integer', required: false },
          { name: 'numcen', initialPosition: 278, length: 2, type: 'integer', required: false },
          { name: 'coefcnv', initialPosition: 280, length: 6, type: 'integer', required: false },
          { name: 'idmvt', initialPosition: 286, length: 10, type: 'integer', required: false },
        ],
      ],
      [
        '99',
        [
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'emtexc', initialPosition: 6, length: 14, type: 'string', required: false },
          { name: 'rctexc', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'datexc', initialPosition: 34, length: 8, type: 'date', required: true, dateFormat: 'YYYYMMDD' },
          { name: 'heuexc', initialPosition: 42, length: 6, type: 'integer', required: true },
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
}