const { Converter } = require("./convertHelper");

let converter = {}
let bind__functionTest = null
let bindMap1 = {}
let bindMap2 = {}
let bindMap3 = {}
let bindMap4 = {}
let bindMap2SkipWrong = {}
let sourceHeader = {}
let sourceObject1 = {}
let sourceObject2 = {}
let sourceObject3 = {}
let sourceObject4 = {}
let sourceFooter = {}
let objectList = []
let objectListWithHeaderAndFooter = []
let convertedObject = {}
let convertedObjectWithHeaderAndFooter = {}

beforeEach(() => {
  converter = new Converter()
  bind__functionTest = (currentObject) => {
    return 'functionValue'
  }
  bindMap1 = {
    bindings: [
      { destination: 'rec', source: 'numrec', type: 'copy' },
      { destination: 'act', source: 'codact', type: 'copy' },
      { destination: 'type', type: 'fixed', value: 'warehouse' },
      { destination: 'hhh', type: 'header', source: 'headerValue' },
      { destination: 'fff', type: 'footer', source: 'footerValue' },
      { destination: 'func', type: 'function', value: bind__functionTest }
    ]
  }
  bindMap2 = {
    processObjectOnlyIf: new Map([
      ['numrec', ['80']]
    ]),
    skipObjectIf: new Map([
      ['numrec', ['90']]
    ]),
    bindings: [
      { destination: 'rec', source: 'numrec', type: 'copy' },
      { destination: 'act', source: 'codact', type: 'copy' },
      { destination: 'type', type: 'fixed', value: '80' }
    ]
  }
  bindMap3 = {
    processObjectOnlyIf: new Map([
      ['numrec', ['90']]
    ]),
    bindings: [
      { destination: 'rec', source: 'numrec', type: 'copy' },
      { destination: 'act', source: 'codact', type: 'copy' },
      { destination: 'type', type: 'fixed', value: '90' },
      { destination: 'hhh', type: 'header', source: 'headerValue' },
      { destination: 'fff', type: 'footer', source: 'footerValue' },
      { destination: 'func', type: 'function', value: bind__functionTest }
    ]
  }
  bindMap4 = {
    bindings: [
      { destination: 'rec', source: 'numrec', type: 'copy' },
      { destination: 'err', type: 'error' }
    ]
  }
  bindMap2SkipWrong = {
    processObjectOnlyIf: new Map([
      ['numrec', ['80']]
    ]),
    skipObjectIf: new Map([
      ['WRONG-ATTRIBUTE', ['90']]
    ]),
    bindings: [
      { destination: 'rec', source: 'numrec', type: 'copy' },
      { destination: 'act', source: 'codact', type: 'copy' },
      { destination: 'type', type: 'fixed', value: '80' }
    ]
  }
  sourceHeader = {
    headerValue: '0'
  }
  sourceObject1 = {
    numrec: '80',
    codact: 'A'
  }
  sourceObject2 = {
    numrec: '90',
    codact: 'A'
  }
  sourceObject3 = {
    numrec: 'NON-MATCHING-VALUE',
    codact: 'A'
  }
  sourceObject4 = {
    codact: 'A'
  }
  sourceFooter = {
    footerValue: '99'
  }
  objectList = [sourceObject1]
  objectListWithHeaderAndFooter = [sourceHeader, sourceObject2, sourceFooter]
  convertedObject = {
    rec: '80',
    act: 'A',
    type: '80'
  }
  convertedObjectWithHeaderAndFooter = {
    rec: '90',
    act: 'A',
    type: '90',
    hhh: '0',
    fff: '99',
    func: 'functionValue'
  }
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('ConvertHelper.convert()', () => {
  test('ConvertHelper.convert() - converting without header and footer - opts not present', () => {
    expect(converter.convert(objectList, [bindMap2, bindMap3]))
      .toEqual([convertedObject])
  })
  test('ConvertHelper.convert() - converting without header and footer - opts without attributes', () => {
    expect(converter.convert(objectList, [bindMap2, bindMap3], {}))
      .toEqual([convertedObject])
  })
  test('ConvertHelper.convert() - converting without header and footer - opts with attributes null', () => {
    expect(converter.convert(objectList, [bindMap2, bindMap3], { header: null, footer: null }))
      .toEqual([convertedObject])
  })

  test('ConvertHelper.convert() - converting WITH header and footer', () => {
    expect(converter.convert(objectListWithHeaderAndFooter, [bindMap2, bindMap3], { header: 0, footer: -1 }))
      .toEqual([convertedObjectWithHeaderAndFooter])
  })

  test('ConvertHelper.convert() - without bindMap.length==0 must throw', () => {
    expect(() => { converter.convert(objectListWithHeaderAndFooter, []) }).toThrow()
  })

  test('ConvertHelper.convert() - without bindMap must throw', () => {
    expect(() => { converter.convert(objectListWithHeaderAndFooter) }).toThrow()
  })

  test('ConvertHelper.convert() - using skipObjectIf to ignore a line', () => {
    expect(converter.convert([sourceObject1, sourceObject2], [bindMap2]))
      .toEqual([convertedObject])
  })

  test('ConvertHelper.convert() - using skipObjectIf with wrong source attribute must throw', () => {
    expect(() => {
      converter.convert([sourceObject1, sourceObject2], [bindMap2SkipWrong])
    }).toThrow()
  })

  test('ConvertHelper.convert() - using bind type not implemented throws error', () => {
    expect(() => { converter.convert([sourceObject1], [bindMap4]) }).toThrow()
  })
})

describe('ConvertHelper.getProperBindMap()', () => {
  test('ConvertHelper.getProperBindMap() - sending 1 bindMap must return the same bindMap', () => {
    expect(converter.getProperBindMap([bindMap1], {}))
      .toEqual(bindMap1)
  })
  test('ConvertHelper.getProperBindMap() - sending 2 bindMaps must return the right bindMap', () => {
    expect(converter.getProperBindMap([bindMap2, bindMap3], sourceObject1))
      .toEqual(bindMap2)
  })
  test('ConvertHelper.getProperBindMap() - sending 2 bindMaps must return the right bindMap', () => {
    expect(() => {
      const test = converter.getProperBindMap([bindMap2, bindMap3], sourceObject2)
      console.log(test);
      return test
    })
      .toEqual(bindMap3)
  })
  test('ConvertHelper.getProperBindMap() - sending 2 bindMaps without "processObjectOnlyIf" attribute must throw', () => {
    expect(() => {
      converter.getProperBindMap([bindMap1, bindMap1], sourceObject2)
    }).toThrow()
  })
  test('ConvertHelper.getProperBindMap() - sending 2 bindMaps with non matching "processObjectOnlyIf" attribute must throw', () => {
    expect(() => {
      converter.getProperBindMap([bindMap2, bindMap3], sourceObject3)
    }).toThrow()
  })
  test('ConvertHelper.getProperBindMap() - sending 2 bindMaps with object without matching attribute must throw', () => {
    expect(() => {
      try {
        converter.getProperBindMap([bindMap2, bindMap3], sourceObject4)
      } catch (err) {
        console.log(err);
        throw err
      }
    }).toThrow()
  })
})