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