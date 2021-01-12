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
            { name: 'heuexc', initialPosition: 42, length: 6, type: 'integer', required: true },
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
      ]),
    };
  }
  
//getObjectsFromFile
test("getObjectsFromFile :: testing header of m90 ", () => {
    const result = pfh.getObjectsFromFile(
        '00.00 FGE50LMALV    EXTRACT_90    20201229000102238249305.00LMPT0000M90       FGX10     Subida do stock actividade                                                      358000003           00000000',
        getFileMappingM90());

        expect( result[0].codexc ).toEqual(0);
        expect( result[0].acqexc ).toEqual("0");
        expect( result[0].datexc ).toEqual(new Date(2020, 11, 29, 0, 1, 2));
        
    
});