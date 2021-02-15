const NestedUtil  = require('./nestedUtil');

let emptyObject = {}
let nonEmptyObject = {}
let emptyComplexObject = {}
let nonEmptyComplexObject = {}

beforeEach(() => {
  emptyObject = {}
  nonEmptyObject = { test: [1]}
  emptyComplexObject = { firstLevel: {} }
  nonEmptyComplexObject = { firstLevel: { test: [1] } }
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('setValue()', () => {
  test('setValue(): OK - Setting an empty object', () => {
    expect((() => {
      NestedUtil.setValue(emptyObject, 'test', 1)
      return emptyObject
    })()).toHaveProperty('test', 1)
  })
  test('setValue(): OK - Setting an existing object property', () => {
    expect((() => {
      NestedUtil.setValue(nonEmptyObject, 'test', 2)
      return nonEmptyObject
    })()).toHaveProperty('test', 2)
	})
})
describe('pushValue()', () => {
	test('pushValue(): OK - Pushing into empty object', () => {
    expect((() => {
      NestedUtil.pushValue(emptyObject, 'test', 1)
      return emptyObject
    })()).toHaveProperty('test', [1])
	})
	test('pushValue(): OK - Pushing into existing object property', () => {
    expect((() => {
      NestedUtil.pushValue(nonEmptyObject, 'test', 2)
      return nonEmptyObject
    })()).toHaveProperty('test', [1, 2])
	})
})

describe('genericSetNestedAttribute()', () => {
  test('genericSetNestedAttribute(): OK - Push value to path', () => {
    expect((() => {
      NestedUtil.genericSetNestedAttribute(emptyObject, 'test', 2, NestedUtil.pushValue)
      return emptyObject
    })()).toHaveProperty('test', [2])
  })
  test('genericSetNestedAttribute(): OK - Set value on path', () => {
    expect((() => {
      NestedUtil.genericSetNestedAttribute(nonEmptyObject, 'test', 2, NestedUtil.setValue)
      return nonEmptyObject
    })()).toHaveProperty('test', 2)
  })
  test('genericSetNestedAttribute(): OK - Push value to multi level path on empty object', () => {
    expect((() => {
      NestedUtil.genericSetNestedAttribute(emptyObject, 'firstLevel.test', 2, NestedUtil.pushValue)
      return emptyObject
    })()).toHaveProperty('firstLevel', { test: [2] })
  })
  test('genericSetNestedAttribute(): OK - Push value to multi level path', () => {
    expect((() => {
      NestedUtil.genericSetNestedAttribute(emptyComplexObject, 'firstLevel.test', 2, NestedUtil.pushValue)
      return emptyComplexObject
    })()).toHaveProperty('firstLevel', { test: [2] })
  })
  test('genericSetNestedAttribute(): OK - Set value to multi level path on empty object', () => {
    expect((() => {
      NestedUtil.genericSetNestedAttribute(emptyObject, 'firstLevel.test', 2, NestedUtil.setValue)
      return emptyObject
    })()).toHaveProperty('firstLevel', { test: 2 })
  })
  test('genericSetNestedAttribute(): OK - Set value to multi level path', () => {
    expect((() => {
      NestedUtil.genericSetNestedAttribute(nonEmptyComplexObject, 'firstLevel.test', 2, NestedUtil.setValue)
      return nonEmptyComplexObject
    })()).toHaveProperty('firstLevel', { test: 2 })
  })
	test('genericSetNestedAttribute(): KO - No path argument throws error', () => {
    expect(() => {
      NestedUtil.genericSetNestedAttribute(emptyObject)
    }).toThrow('Argument path not informed')
	})
	test('genericSetNestedAttribute(): KO - No object argument throws error', () => {
    expect(() => {
      NestedUtil.genericSetNestedAttribute(null, 'test')
    }).toThrow('Argument object not informed')
	})
})
describe('pushNestedAttribute()', () => {
 test('pushNestedAttribute(): OK - Push value to path', () => {
  expect((() => {
    NestedUtil.pushNestedAttribute(emptyObject, 'test', 2)
    return emptyObject
  })()).toHaveProperty('test', [2])
 })
})
describe('setNestedAttribute()', () => {
 test('setNestedAttribute(): OK - Set value on path', () => {
  expect((() => {
    NestedUtil.setNestedAttribute(emptyObject, 'test', 2)
    return emptyObject
  })()).toHaveProperty('test', 2)
 })
})
