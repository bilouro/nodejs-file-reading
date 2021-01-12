const pfh = require("./positionalFileHelper");

//isLineHasData
  test("isLineHasData :: passing '' expect false ", () => {
    expect(pfh.isLineHasData('')).toBe(false);
  });

  test("isLineHasData :: passing '      ' expect false ", () => {
    expect(pfh.isLineHasData('       ')).toBe(false);
  });

  test("isLineHasData :: passing '02345' expect true ", () => {
    expect(pfh.isLineHasData('02345')).toBe(true);
  });

  test("isLineHasData :: passing 'null' expect false ", () => {
    expect(pfh.isLineHasData(null)).toBe(false);
  });

  test("isLineHasData :: passing 'undefined' expect false ", () => {
    expect(pfh.isLineHasData(undefined)).toBe(false);
  });


//parseString
test("parseString :: passing 'sdf  ' expect 'sdf' ", () => {
    expect(pfh.parseString(  'sdf  ', null, null)).toBe('sdf');
});
test("parseString :: passing '   sdf' expect 'sdf' ", () => {
    expect(pfh.parseString(  '   sdf', null, null)).toBe('sdf');
});
test("parseString :: passing '   sdf   ' expect 'sdf' ", () => {
    expect(pfh.parseString(  '   sdf   ', null, null)).toBe('sdf');
});
test("parseString :: passing '' expect null ", () => {
    expect(pfh.parseString(  '', null, null)).toBe(null);
});
test("parseString :: passing '    ' expect null ", () => {
    expect(pfh.parseString(  '    ', null, null)).toBe(null);
});


//parseInteger
test("parseInteger :: passing '123' expect 123 ", () => {
    expect(pfh.parseInteger(  '123', null, null)).toBe(123);
});
test("parseInteger :: passing null expect to return null", () => {
    expect(pfh.parseInteger(null, null, null)).toBe(null);
});
test("parseInteger :: passing '0' expect to return 0", () => {
    expect(pfh.parseInteger('0', null, null)).toBe(0);
});
test("parseInteger :: passing 'abc' expect to throw exception ", () => {
    expect(() => {pfh.parseInteger('abc', {name:'test'}, 1)}).toThrow('Value "abc", is not a valid Number for the attribute test. line number 1');
});


//parseDate
test("parseDate :: passing '19801016' expect new date(1980, 9, 16) ", () => {
    const result = pfh.parseDate('19801016', { name: 'dattest', type: 'date', required: true, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] }, 1);
    expect( result ).toEqual(new Date(1980, 9, 16)); //0-january, 1-february, 9-octuber
});

test("parseDate :: passing '00000000' in a optional atribute, expect null ", () => {
    const result = pfh.parseDate('00000000', { name: 'dattest', type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['99999999', '00000000'] }, 1);
    expect( result ).toEqual(null); //0-january, 1-february, 9-octuber
});

test("parseDate :: passing '99999999' in a optional atribute, expect null ", () => {
    const result = pfh.parseDate('99999999', { name: 'dattest', type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['99999999', '00000000'] }, 1);
    expect( result ).toEqual(null); //0-january, 1-february, 9-octuber
});

test("parseDate :: passing '99999999' in a optional atribute, expect null ", () => {
    const result = pfh.parseDate('99999999', { name: 'dattest', type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['99999999', '00000000'] }, 1);
    expect( result ).toEqual(null); //0-january, 1-february, 9-octuber
});

test("parseDate :: passing mal formed atribute object, expect exception ", () => {
    expect(() => {pfh.parseDate('99999999', { name: 'dattest', type: 'date' }, 1)}).toThrow('The attribute dattest has no dateFormat declared in lineMapping');
});

test("parseDate :: passing '19801610' with mask 'YYYYMMDD' expect exception ", () => {
    expect(() => {pfh.parseDate('19801610', { name: 'dattest', type: 'date', required: true, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] }, 1)}).toThrow('Value "19801610", is not a valid Date for the attribute dattest (YYYYMMDD). line number 1.');
});

function getFileMappingM90() {
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
            { name: 'edisit', initialPosition: 174, length: 14, type: 'string', required: false },
            { name: 'imaexc', initialPosition: 188, length: 8, type: 'integer', required: false },
            { name: 'disexc', initialPosition: 196, length: 60, type: 'string', required: false },
          ],
        ],
        [
          '90', 
          [
            // 90.00 e 90.60
            { name: 'codexc', initialPosition: 0, length: 2, type: 'integer', required: true },
            { name: 'sepexc', initialPosition: 2, length: 1, type: 'string', required: true },
            { name: 'scoexc', initialPosition: 3, length: 2, type: 'integer', required: true },
            { name: 'trtexc', initialPosition: 5, length: 1, type: 'string', required: false },
            { name: 'codact', initialPosition: 6, length: 3, type: 'string', required: false },
            { name: 'codcli', initialPosition: 9, length: 14, type: 'string', required: false },
            { name: 'codpro', initialPosition: 23, length: 17, type: 'string', required: false },
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
            { name: 'disexc', initialPosition: 252, length: 4, type: 'string', required: false },
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
  }
  
//getObjectsFromFile
test("getObjectsFromFile :: testing header of m90 ", () => {
    const result = pfh.getObjectsFromFile(
        '00.00 FGE50LMALV    EXTRACT_90    20201229000102238249305.00LMPT0000M90       FGX10     Subida do stock actividade                                                      358000003           00000000',
        getFileMappingM90());

        expect( result[0].codexc ).toEqual(0);
        expect( result[0].sepexc ).toEqual('.');
        expect( result[0].scoexc ).toEqual(0);
        expect( result[0].trtexc ).toEqual(null);
        expect( result[0].emtexc ).toEqual("FGE50LMALV");
        expect( result[0].rctexc ).toEqual("EXTRACT_90");
        expect( result[0].datexc ).toEqual(new Date(2020, 11, 29, 0, 1, 2)); 
        expect( result[0].heuexc ).toEqual("000102");
        expect( result[0].numexc ).toEqual(2382493);
        expect( result[0].acqexc ).toEqual("0");
        expect( result[0].verexc ).toEqual("5.00");
        expect( result[0].nomsys ).toEqual("LMPT0000");
        expect( result[0].nomdtq ).toEqual("M90");
        expect( result[0].bibdtq ).toEqual("FGX10");
        expect( result[0].libexc ).toEqual("Subida do stock actividade");
        expect( result[0].bibdst ).toEqual(null);
        expect( result[0].pgmdst ).toEqual(null);
        expect( result[0].pardst ).toEqual(null);
        expect( result[0].codact ).toEqual("358");
        expect( result[0].iglsit ).toEqual(0);
        expect( result[0].edisit ).toEqual('003');
        expect( result[0].imaexc ).toEqual(0);
        expect( result[0].disexc ).toEqual(null);
      });

test("getObjectsFromFile :: testing content of m90 ", () => {
  const result = pfh.getObjectsFromFile(
      '90.60 358              00042627         00   0000000000000000000000000000004760000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004760000000000000000000000000000000000000000000000000000000000000001',
      getFileMappingM90());

      expect( result[0].codexc ).toEqual(90);
      expect( result[0].sepexc ).toEqual('.');
      expect( result[0].scoexc ).toEqual(60);
      expect( result[0].trtexc ).toEqual(null);
      expect( result[0].codact ).toEqual("358");
      expect( result[0].codcli ).toEqual(null);
      expect( result[0].codpro ).toEqual("00042627");
      expect( result[0].valpro ).toEqual(0);
      expect( result[0].motimm ).toEqual(null);
      expect( result[0].datimm1 ).toEqual(null);
      expect( result[0].datimm2 ).toEqual(null);
      expect( result[0].datfvi ).toEqual(null);
      expect( result[0].nbruvc01 ).toEqual(476);
      expect( result[0].nbruvc02 ).toEqual(0);
      expect( result[0].nbruvc03 ).toEqual(0);
      expect( result[0].nbruvc04 ).toEqual(0);
      expect( result[0].nbruvc05 ).toEqual(0);
      expect( result[0].nbruvc06 ).toEqual(0);
      expect( result[0].nbruvc07 ).toEqual(0);
      expect( result[0].nbruvc08 ).toEqual(0);
      expect( result[0].nbruvc09 ).toEqual(0);
      expect( result[0].nbruvc10 ).toEqual(0);
      expect( result[0].nbruvc11 ).toEqual(0);
      expect( result[0].nbruvc12 ).toEqual(0);
      expect( result[0].nbruvc13 ).toEqual(476);
      expect( result[0].nbruvc14 ).toEqual(0);
      expect( result[0].nbruvc15 ).toEqual(0);
      expect( result[0].nbruvc16 ).toEqual(0);
      expect( result[0].nbruvc17 ).toEqual(0);
      expect( result[0].nbruvc18 ).toEqual(0);
      expect( result[0].nbruvc19 ).toEqual(0);
      expect( result[0].nbruvc20 ).toEqual(0);
      expect( result[0].topedi ).toEqual("1");
      expect( result[0].senstk01 ).toEqual(null);
      expect( result[0].senstk13 ).toEqual(null);
      expect( result[0].disexc ).toEqual(null);

    });

test("getObjectsFromFile :: testing footer of m90 ", () => {
    const result = pfh.getObjectsFromFile(
        '99.00 FGE50LMALV    M90           20201229000137238249300002465',
        getFileMappingM90());

        expect( result[0].codexc ).toEqual(99);
        expect( result[0].sepexc ).toEqual('.');
        expect( result[0].scoexc ).toEqual(0);
        expect( result[0].trtexc ).toEqual(null);
        expect( result[0].emtexc ).toEqual("FGE50LMALV");
        expect( result[0].rctexc ).toEqual("M90");
        expect( result[0].datexc ).toEqual(new Date(2020, 11, 29, 0, 1, 37));
        expect( result[0].heuexc ).toEqual("000137");
        expect( result[0].numexc ).toEqual(2382493);
        expect( result[0].cptexc ).toEqual("00002465");
        expect( result[0].nomsys ).toEqual(null);
        expect( result[0].nomdtq ).toEqual(null);
        expect( result[0].bibdtq ).toEqual(null);
        expect( result[0].idemsg ).toEqual(null);
        expect( result[0].dsiexc ).toEqual(null);


      });