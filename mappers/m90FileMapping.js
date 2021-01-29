const mapping90 = [
  { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
  { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
  { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
  { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
  { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
  { name: 'codact', initialPosition: 6, length: 3, type: 'integer', required: false },
  { name: 'codcli', initialPosition: 9, length: 14, type: 'string', required: false },
  { name: 'codpro', initialPosition: 23, length: 17, type: 'integer', required: false },
  { name: 'valpro', initialPosition: 40, length: 2, type: 'integer', required: false },
  { name: 'motimm', initialPosition: 42, length: 3, type: 'string', required: false },
  { name: 'datimm1', initialPosition: 45, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] },
  { name: 'datimm2', initialPosition: 53, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['00000000', '99999999'] },
  { name: 'datfvi', initialPosition: 61, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['00000000']},
  { name: 'nbruvc01', initialPosition: 69, length: 9, type: 'integer', required: false },
  { name: 'nbruvc02', initialPosition: 78, length: 9, type: 'integer', required: false },
  { name: 'nbruvc03', initialPosition: 87, length: 9, type: 'integer', required: false },
  { name: 'nbruvc04', initialPosition: 96, length: 9, type: 'integer', required: false },
  { name: 'nbruvc05', initialPosition: 105, length: 9, type: 'integer', required: false },
  { name: 'nbruvc06', initialPosition: 114, length: 9, type: 'integer', required: false },
  { name: 'nbruvc07', initialPosition: 123, length: 9, type: 'integer', required: false },
  { name: 'nbruvc08', initialPosition: 132, length: 9, type: 'integer', required: false },
  { name: 'nbruvc09', initialPosition: 141, length: 9, type: 'integer', required: false },
  { name: 'nbruvc10', initialPosition: 150, length: 9, type: 'integer', required: false },
  { name: 'nbruvc11', initialPosition: 159, length: 9, type: 'integer', required: false },
  { name: 'nbruvc12', initialPosition: 168, length: 9, type: 'integer', required: false },
  { name: 'nbruvc13', initialPosition: 177, length: 9, type: 'integer', required: false },
  { name: 'nbruvc14', initialPosition: 186, length: 9, type: 'integer', required: false },
  { name: 'nbruvc15', initialPosition: 195, length: 9, type: 'integer', required: false },
  { name: 'nbruvc16', initialPosition: 204, length: 9, type: 'integer', required: false },
  { name: 'nbruvc17', initialPosition: 213, length: 9, type: 'integer', required: false },
  { name: 'nbruvc18', initialPosition: 222, length: 9, type: 'integer', required: false },
  { name: 'nbruvc19', initialPosition: 231, length: 9, type: 'integer', required: false },
  { name: 'nbruvc20', initialPosition: 240, length: 9, type: 'integer', required: false },
  { name: 'topedi', initialPosition: 249, length: 1, type: 'string', required: false },
  { name: 'senstk01', initialPosition: 250, length: 1, type: 'string', required: false },
  { name: 'senstk13', initialPosition: 251, length: 1, type: 'string', required: false },
  { name: 'disexc', initialPosition: 252, length: 4, type: 'string', required: false }
];

/**
 *  Insert a empty list of attributes to ignore a line of file: 
 *                ["00", []], 
 */
function getFileMapping() {
  return {
    discriminatorInitialPosition: 0,
    discriminatorLength: 5,
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
          { name: 'datexc', initialPosition: 34, length: 14, type: 'date', required: true, dateFormat: 'YYYYMMDDhhmmss' },
          { name: 'heuexc', initialPosition: 42, length: 6, type: 'string', required: true },
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
          { name: 'edisit', initialPosition: 174, length: 14, type: 'integer', required: false },
          { name: 'imaexc', initialPosition: 188, length: 8, type: 'integer', required: false },
          { name: 'disexc', initialPosition: 196, length: 60, type: 'string', required: false },
        ],
      ],
      [
        '90.00', 
        [
          ...mapping90
        ],
      ],
      [
        '90.60',
        [
          ...mapping90,
          { name: 'id9000', type: 'parent', childName:'children9060', parentDiscriminator:'90.00', parentAttribute:'uuid'},
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

module.exports = {
  getFileMapping
};
