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
          { name: 'edisit', initialPosition: 174, length: 14, type: 'string', required: false },
          { name: 'imaexc', initialPosition: 188, length: 8, type: 'integer', required: false },
          { name: 'idemsg', initialPosition: 196, length: 30, type: 'string', required: false },
          { name: 'dsiexc', initialPosition: 226, length: 30, type: 'string', required: false },
        ],
      ],
      [
        '51.00', 
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numliv', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snuliv', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'refliv', initialPosition: 34, length: 30, type: 'string', required: false },
          { name: 'codtli', initialPosition: 64, length: 3, type: 'string', required: false },
          { name: 'codacl', initialPosition: 67, length: 3, type: 'integer', required: false },
          { name: 'oricde', initialPosition: 70, length: 1, type: 'string', required: false },
          { name: 'datliv', initialPosition: 71, length: 12, type: 'date', required: false, dateFormat: 'YYYYMMDDhhmm' },
          { name: 'heuliv', initialPosition: 79, length: 4, type: 'string', required: false },
          { name: 'cliliv', initialPosition: 83, length: 14, type: 'string', required: false },
          { name: 'typliv', initialPosition: 97, length: 1, type: 'string', required: false },
          { name: 'numvag', initialPosition: 98, length: 8, type: 'integer', required: false },
          { name: 'datprp', initialPosition: 106, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD' },
          { name: 'codrgt', initialPosition: 114, length: 3, type: 'integer', required: false },
          { name: 'touliv', initialPosition: 117, length: 4, type: 'integer', required: false },
          { name: 'ordliv', initialPosition: 121, length: 4, type: 'integer', required: false },
          { name: 'numtou', initialPosition: 125, length: 8, type: 'integer', required: false },
          { name: 'datexp', initialPosition: 133, length: 12, type: 'date', required: false, dateFormat: 'YYYYMMDDhhmm' },
          { name: 'heuexp', initialPosition: 141, length: 6, type: 'string', required: false },
          { name: 'codtra', initialPosition: 147, length: 14, type: 'string', required: false },
          { name: 'codcam', initialPosition: 161, length: 14, type: 'string', required: false },
          { name: 'codchf', initialPosition: 175, length: 10, type: 'string', required: false },
          { name: 'ctrliv', initialPosition: 185, length: 10, type: 'string', required: false },
          { name: 'refcnt', initialPosition: 195, length: 10, type: 'string', required: false },
          { name: 'codsit', initialPosition: 205, length: 3, type: 'string', required: false },
          { name: 'numplb', initialPosition: 208, length: 16, type: 'string', required: false },
          { name: 'codldr', initialPosition: 224, length: 3, type: 'string', required: false },
          { name: 'livsol', initialPosition: 227, length: 1, type: 'string', required: false },
          { name: 'numcnta', initialPosition: 228, length: 2, type: 'string', required: false },
          { name: 'numcntb', initialPosition: 230, length: 15, type: 'string', required: false },
          { name: 'numtpt', initialPosition: 245, length: 10, type: 'integer', required: false },
          { name: 'disexc', initialPosition: 255, length: 1, type: 'string', required: false },
        ],
      ],
      [
        '51.01',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numliv', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snuliv', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: true },
          { name: 'codcli', initialPosition: 20, length: 14, type: 'string', required: true },
          { name: 'refliv', initialPosition: 34, length: 30, type: 'string', required: true },
          { name: 'topliv', initialPosition: 64, length: 1, type: 'string', required: false },
          { name: 'topliv2', initialPosition: 65, length: 1, type: 'string', required: false },
          { name: 'topliv3', initialPosition: 66, length: 1, type: 'string', required: false },
          { name: 'topliv4', initialPosition: 67, length: 1, type: 'string', required: false },
          { name: 'topliv5', initialPosition: 68, length: 1, type: 'string', required: false },
          { name: 'dipliv', initialPosition: 69, length: 50, type: 'integer', required: false },
          { name: 'datdep', initialPosition: 119, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] },
          { name: 'codnav', initialPosition: 127, length: 5, type: 'integer', required: false },
          { name: 'libnav', initialPosition: 132, length: 30, type: 'string', required: false },
          { name: 'datarr', initialPosition: 162, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] },
          { name: 'codcie', initialPosition: 170, length: 5, type: 'string', required: false },
          { name: 'nomcie', initialPosition: 175, length: 30, type: 'string', required: false },
          { name: 'typcnt', initialPosition: 205, length: 2, type: 'string', required: false },
          { name: 'codtrs', initialPosition: 207, length: 5, type: 'string', required: false },
          { name: 'nomtrs', initialPosition: 212, length: 30, type: 'string', required: false },
          { name: 'opedep', initialPosition: 242, length: 10, type: 'string', required: false },
          { name: 'disexc', initialPosition: 252, length: 4, type: 'integer', required: false },
          { name: 'id5100', type: 'parent', parentDiscriminator:'51.00', childName:'children5101', parentAttribute:'uuid'},
        ],
      ],
      [
        '51.05',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: false },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: false },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numliv', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snuliv', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'refliv', initialPosition: 34, length: 30, type: 'string', required: false },
          { name: 'codrub1', initialPosition: 64, length: 4, type: 'string', required: false },
          { name: 'codrub2', initialPosition: 68, length: 4, type: 'string', required: false },
          { name: 'codrub3', initialPosition: 72, length: 4, type: 'string', required: false },
          { name: 'codrub4', initialPosition: 76, length: 4, type: 'string', required: false },
          { name: 'valrub1', initialPosition: 80, length: 35, type: 'string', required: false },
          { name: 'valrub2', initialPosition: 115, length: 35, type: 'string', required: false },
          { name: 'valrub3', initialPosition: 150, length: 35, type: 'string', required: false },
          { name: 'valrub4', initialPosition: 185, length: 35, type: 'string', required: false },
          { name: 'disexc', initialPosition: 220, length: 36, type: 'string', required: false },
          { name: 'id5100', type: 'parent', parentDiscriminator:'51.00', childName:'children5105', parentAttribute:'uuid'},
        ],
      ],
      [
        '51.30',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numliv', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snuliv', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'refliv', initialPosition: 34, length: 30, type: 'string', required: false },
          { name: 'nliliv', initialPosition: 64, length: 5, type: 'integer', required: false },
          { name: 'codpro', initialPosition: 69, length: 17, type: 'string', required: false },
          { name: 'valpro', initialPosition: 86, length: 2, type: 'integer', required: false },
          { name: 'uvcliv', initialPosition: 88, length: 9, type: 'integer', required: false },
          { name: 'mespro', initialPosition: 97, length: 1, type: 'string', required: false },
          { name: 'pdnliv', initialPosition: 98, length: 11, type: 'integer', required: false },
          { name: 'motmvt', initialPosition: 109, length: 3, type: 'string', required: false },
          { name: 'codlot', initialPosition: 112, length: 20, type: 'string', required: false },
          { name: 'numlot', initialPosition: 132, length: 9, type: 'integer', required: false },
          { name: 'codpal', initialPosition: 141, length: 18, type: 'string', required: false },
          { name: 'datfvi', initialPosition: 159, length: 8, type: 'integer', required: false, dateFormat: 'YYYYMMDD' },
          { name: 'numsup', initialPosition: 167, length: 8, type: 'integer', required: false },
          { name: 'snusup', initialPosition: 175, length: 3, type: 'integer', required: false },
          { name: 'codprp', initialPosition: 178, length: 10, type: 'string', required: false },
          { name: 'prppic', initialPosition: 188, length: 1, type: 'string', required: false },
          { name: 'spcpro', initialPosition: 189, length: 4, type: 'integer', required: false },
          { name: 'pcbpro', initialPosition: 193, length: 5, type: 'integer', required: false },
          { name: 'colcou', initialPosition: 198, length: 4, type: 'integer', required: false },
          { name: 'coupal', initialPosition: 202, length: 4, type: 'integer', required: false },
          { name: 'gerpal', initialPosition: 206, length: 2, type: 'integer', required: false },
          { name: 'codemb', initialPosition: 208, length: 3, type: 'string', required: false },
          { name: 'codacl', initialPosition: 211, length: 3, type: 'string', required: false },
          { name: 'uvcsrv', initialPosition: 214, length: 9, type: 'integer', required: false },
          { name: 'sschet', initialPosition: 223, length: 18, type: 'string', required: false },
          { name: 'heusup', initialPosition: 241, length: 8, type: 'integer', required: false },
          { name: 'motimm', initialPosition: 249, length: 3, type: 'string', required: false },
          { name: 'numcls', initialPosition: 252, length: 4, type: 'integer', required: false },
          { name: 'id5100', type: 'parent', parentDiscriminator:'51.00', childName:'children5130', parentAttribute:'uuid'},
        ],
      ],
      [
        '51.31',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numliv', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snuliv', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'refliv', initialPosition: 34, length: 30, type: 'string', required: false },
          { name: 'nliliv', initialPosition: 64, length: 5, type: 'integer', required: false },
          { name: 'codpro', initialPosition: 69, length: 17, type: 'string', required: false },
          { name: 'valpro', initialPosition: 86, length: 2, type: 'integer', required: false },
          { name: 'seqsup', initialPosition: 88, length: 4, type: 'integer', required: false },
          { name: 'proemb', initialPosition: 92, length: 17, type: 'string', required: false },
          { name: 'numplb', initialPosition: 109, length: 8, type: 'string', required: false },
          { name: 'pdbliv', initialPosition: 117, length: 11, type: 'integer', required: false },
          { name: 'palgrp', initialPosition: 128, length: 18, type: 'string', required: false },
          { name: 'codcin', initialPosition: 146, length: 20, type: 'string', required: false },
          { name: 'volcol', initialPosition: 166, length: 7, type: 'integer', required: false },
          { name: 'disexc', initialPosition: 173, length: 83, type: 'string', required: false },
          { name: 'id5130', type: 'parent', parentDiscriminator:'51.30', childName:'children5131',parentAttribute:'uuid'},
        ],
      ],
      [
        '51.20',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numliv', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snuliv', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'refliv', initialPosition: 34, length: 30, type: 'string', required: false },
          { name: 'nliliv', initialPosition: 64, length: 5, type: 'string', required: false },
          { name: 'codpro', initialPosition: 69, length: 17, type: 'string', required: false },
          { name: 'valpro', initialPosition: 86, length: 2, type: 'integer', required: false },
          { name: 'edipro', initialPosition: 88, length: 17, type: 'string', required: false },
          { name: 'uvccde', initialPosition: 105, length: 9, type: 'integer', required: false },
          { name: 'unicde', initialPosition: 114, length: 3, type: 'string', required: false },
          { name: 'livsol', initialPosition: 117, length: 1, type: 'string', required: false },
          { name: 'uvcliv', initialPosition: 118, length: 9, type: 'integer', required: false },
          { name: 'mespro', initialPosition: 127, length: 1, type: 'string', required: false },
          { name: 'pdnliv', initialPosition: 128, length: 11, type: 'integer', required: false },
          { name: 'codacl', initialPosition: 139, length: 3, type: 'string', required: false },
          { name: 'motmvt', initialPosition: 142, length: 3, type: 'string', required: false },
          { name: 'typstk', initialPosition: 145, length: 1, type: 'string', required: false },
          { name: 'typope', initialPosition: 146, length: 1, type: 'string', required: false },
          { name: 'numope', initialPosition: 147, length: 6, type: 'integer', required: false },
          { name: 'spcpro', initialPosition: 153, length: 4, type: 'integer', required: false },
          { name: 'pcbpro', initialPosition: 157, length: 5, type: 'integer', required: false },
          { name: 'topliv', initialPosition: 162, length: 5, type: 'string', required: false },
          { name: 'dipliv', initialPosition: 167, length: 50, type: 'string', required: false },
          { name: 'uvcsrv', initialPosition: 217, length: 9, type: 'integer', required: false },
          { name: 'uvcini', initialPosition: 226, length: 9, type: 'integer', required: false },
          { name: 'numebl', initialPosition: 235, length: 8, type: 'integer', required: false },
          { name: 'snuebl', initialPosition: 243, length: 3, type: 'integer', required: false },
          { name: 'indpro', initialPosition: 246, length: 1, type: 'string', required: false },
          { name: 'disexc', initialPosition: 247, length: 9, type: 'string', required: false },
          { name: 'id5130', type: 'parent', parentDiscriminator:'51.30', childName:'children5120', parentAttribute:'uuid'},
        ],
      ],
      [
        '51.27',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numliv', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snuliv', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'refliv', initialPosition: 34, length: 30, type: 'string', required: false },
          { name: 'nliliv', initialPosition: 64, length: 5, type: 'integer', required: false },
          { name: 'typrub1', initialPosition: 69, length: 1, type: 'string', required: false },
          { name: 'typrub2', initialPosition: 70, length: 1, type: 'string', required: false },
          { name: 'typrub3', initialPosition: 71, length: 1, type: 'string', required: false },
          { name: 'typrub4', initialPosition: 72, length: 1, type: 'string', required: false },
          { name: 'codrub1', initialPosition: 73, length: 4, type: 'string', required: false },
          { name: 'codrub2', initialPosition: 77, length: 4, type: 'string', required: false },
          { name: 'codrub3', initialPosition: 81, length: 4, type: 'string', required: false },
          { name: 'codrub4', initialPosition: 85, length: 4, type: 'string', required: false },
          { name: 'valrub1', initialPosition: 89, length: 35, type: 'string', required: false },
          { name: 'valrub2', initialPosition: 124, length: 35, type: 'string', required: false },
          { name: 'valrub3', initialPosition: 159, length: 35, type: 'string', required: false },
          { name: 'valrub4', initialPosition: 194, length: 35, type: 'string', required: false },
          { name: 'disexc', initialPosition: 229, length: 27, type: 'string', required: false },
          { name: 'id5120', type: 'parent', parentDiscriminator:'51.20', childName:'children5127',parentAttribute:'uuid'},
        ],
      ],
      [
        '51.80',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numliv', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snuliv', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'refliv', initialPosition: 34, length: 30, type: 'string', required: false },
          { name: 'codemb', initialPosition: 64, length: 3, type: 'string', required: false },
          { name: 'qtbsor', initialPosition: 67, length: 9, type: 'integer', required: false },
          { name: 'qtbent', initialPosition: 76, length: 9, type: 'integer', required: false },
          { name: 'prxemb', initialPosition: 85, length: 6, type: 'integer', required: false },
          { name: 'codtra', initialPosition: 91, length: 14, type: 'string', required: false },
          { name: 'proemb', initialPosition: 105, length: 17, type: 'string', required: false },
          { name: 'datemb', initialPosition: 122, length: 8, type: 'date', required: false, dateFormat: 'YYYYMMDD' },
          { name: 'typtie', initialPosition: 130, length: 1, type: 'string', required: false },
          { name: 'disexc', initialPosition: 131, length: 125, type: 'string', required: false },
          { name: 'id5100', type: 'parent', parentDiscriminator:'51.00', childName:'children5180',parentAttribute:'uuid'},
        ],
      ],
      [
        '51.99',
        [
          { name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true },
          { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
          { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
          { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
          { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
          { name: 'numliv', initialPosition: 6, length: 8, type: 'integer', required: false },
          { name: 'snuliv', initialPosition: 14, length: 3, type: 'integer', required: false },
          { name: 'codact', initialPosition: 17, length: 3, type: 'string', required: false },
          { name: 'codcli', initialPosition: 20, length: 14, type: 'string', required: false },
          { name: 'refliv', initialPosition: 34, length: 30, type: 'string', required: false },
          { name: 'cumlig', initialPosition: 64, length: 4, type: 'integer', required: false },
          { name: 'mvtexc', initialPosition: 68, length: 8, type: 'integer', required: false },
          { name: 'cumsup', initialPosition: 76, length: 5, type: 'integer', required: false },
          { name: 'coltot', initialPosition: 81, length: 9, type: 'integer', required: false },
          { name: 'totpro', initialPosition: 90, length: 5, type: 'integer', required: false },
          { name: 'pdbliv', initialPosition: 95, length: 11, type: 'integer', required: false },
          { name: 'pdnliv', initialPosition: 106, length: 11, type: 'integer', required: false },
          { name: 'disexc', initialPosition: 117, length: 139, type: 'string', required: false },
          { name: 'id5100', type: 'parent', parentDiscriminator:'51.00', childName:'children5199',parentAttribute:'uuid'},
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
