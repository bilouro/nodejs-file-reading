const path = require('path');
const fs = require('fs');
const os = require('os');
const pfh = require("./positionalFileHelper");

describe('checkFileIsValid', () => {
  test('checkFileIsValid', () => {
    // eslint-disable-next-line no-undefined
    expect(pfh.checkFileIsValid([{}])).toBe(undefined)
  })
  test('checkFileIsValid(): KO - An error ocurred', () => {
    // eslint-disable-next-line no-undefined
    expect(() => {pfh.checkFileIsValid()}).toThrow()
  })
  test('checkFileIsValid(): KO - An error ocurred', () => {
    // eslint-disable-next-line no-undefined
    expect(() => {pfh.checkFileIsValid([''])}).toThrow()
  })
})

describe('getDiscriminator', () => {
  test('getDiscriminator(): OK - Returns the discriminator', () => {
    expect(pfh.getDiscriminator('00.00', { discriminatorInitialPosition: 0, discriminatorLength: 5 }, 0)).toBe('00.00')
  })
  test('getDiscriminator(): KO - An error ocurred', () => {
    expect(() => { pfh.getDiscriminator('', { discriminatorInitialPosition: 0, discriminatorLength: 5 }, 0) }).toThrow()
  })
})

describe('isLineMappingValid', () => {
  test('isLineMappingValid(): OK - Valid lineMapping returns true', () => {
    expect(pfh.isLineMappingValid([{}], '00.00', 0)).toBe(true)
  })
  test('isLineMappingValid(): OK - Invalid lineMapping returns false', () => {
    expect(pfh.isLineMappingValid([], '00.00', 0)).toBe(false)
  })
})

/**
{
  name: 'regexc',
  initialPosition: 0,
  length: 5,
  type: 'string',
  required: true
}
{
  name: 'id4100',
  type: 'parent',
  parentDiscriminator: '41.00',
  childName: 'children4120',
  parentAttribute: 'uuid'
}
 */

describe('checkMappingIsValid', () => {
  test('checkMappingIsValid(): OK - Valid argument does not throw error', () => {
    expect(pfh.checkMappingIsValid({ name: 'test', initialPosition: 0, length: 1 })).toBe(undefined)
  })
  test('checkMappingIsValid(): OK - Valid argument with type "parent" does not throw error', () => {
    expect(pfh.checkMappingIsValid({ name: 'test', type: 'parent' })).toBe(undefined)
  })
  test('checkMappingIsValid(): KO - No argument throws error', () => {
    expect(() => {pfh.checkMappingIsValid()}).toThrow()
  })
  test('checkMappingIsValid(): KO - Argument with no name property throws error', () => {
    expect(() => {pfh.checkMappingIsValid({})}).toThrow()
  })
  test('checkMappingIsValid(): KO - Argument with no initialPosition property throws error', () => {
    expect(() => {pfh.checkMappingIsValid({ name: 'test' })}).toThrow()
  })
  test('checkMappingIsValid(): KO - Argument with no length property throws error', () => {
    expect(() => {pfh.checkMappingIsValid({ name: 'test', initialPosition: 0 })}).toThrow()
  })
})

describe('checkRequiredIsValid()', () => {
  test('checkRequiredIsValid(): OK - Required attribute with no value does not throw error', () => {
    expect(pfh.checkRequiredIsValid({ name: 'test', required: true }, 0, 0)).toBe(undefined)
  })
  test('checkRequiredIsValid(): KO - Required attribute with no value throws error', () => {
    expect(() => {pfh.checkRequiredIsValid({ name: 'test', required: true }, null, 0)}).toThrow()
  })
})

describe('getObjectFromLine()', () => {
  test('getObjectFromLine(): OK - Get object from line', () => {
    const parent = {test:'parent', uuid: 'fd6ef202-5804-4d3b-9cee-72cd89cf82f1'}
    expect(pfh.getObjectFromLine([
      { name: 'string', initialPosition: 0, length: 5, type: 'string', required: true}, 
      { name: 'integer', initialPosition: 0, length: 2, type: 'integer', required: true},
      { name: 'date', initialPosition: 6, length: 14, type: 'date', required: false, dateFormat: 'YYYYMMDDHHmmss'},
      { name: 'id0000', type: 'parent', parentDiscriminator:'00.00', childName:'children0000', parentAttribute:'uuid'},
    ], '00.00 20200101120000', 0, new Map([['00.00', parent]])))
    .toEqual({ string: '00.00', integer: 0, date: new Date(2020, 0, 1, 12, 0, 0), id0000: parent.uuid, parent})
  })
  test('getObjectFromLine(): KO - Unsupported type property throws error', () => {
    expect(() => {pfh.getObjectFromLine([{name: 'test', initialPosition: 0, length: 5, type: 'error', required: true}], '00.00', 0, new Map())}).toThrow()
  })
  test('getObjectFromLine(): KO - Property of parent type with property name as parent throws error', () => {
    expect(() => {pfh.getObjectFromLine([{name: 'parent', initialPosition: 0, length: 5, type: 'parent'}], '00.00', 0, new Map())}).toThrow()
  })
})

describe('getObjectsFromFile()', () => {
  test('getObjectsFromFile(): OK - Get object from line', () => {
    expect(pfh.getObjectsFromFile(`00.00${os.EOL}00.01${os.EOL}`, {discriminatorInitialPosition: 0, discriminatorLength: 5, lines: new Map([[ '00.00', [{ name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true }]]])})[0]).toHaveProperty('regexc', '00.00')
  })
  // test('getObjectsFromFile(): OK - Get object from line', () => {
  //   expect(pfh.getObjectsFromFile(`${os.EOL}00.01`, {discriminatorInitialPosition: 0, discriminatorLength: 5, lines: new Map([[ '00.00', [{ name: 'regexc', initialPosition: 0, length: 5, type: 'string', required: true }]]])})[0]).toHaveProperty('regexc', '00.00')
  // })
})

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
