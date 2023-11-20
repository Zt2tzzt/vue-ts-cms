function isObject(value: any) {
  const valueType = typeof value
  return value !== null && (valueType === 'object' || valueType === 'function')
}

export function deepCopy(originValue: any, weakmap = new WeakMap()) {
  // const map = new WeakMap()
  if (typeof originValue === 'symbol') {
    // 0.如果值是Symbol的类型
    return Symbol(originValue.description)
  }
  if (!isObject(originValue)) {
    // 1.如果是原始类型, 直接返回
    return originValue
  }
  if (typeof originValue === 'function') {
    // 3.如果是函数function类型, 不需要进行深拷贝
    return originValue
  }
  if (weakmap.has(originValue)) {
    // 4.如果是对象类型, 才需要创建对象
    return weakmap.get(originValue)
  }
  let newObj: any = null
  if (originValue instanceof Set) {
    // 2.1.如果是set类型
    newObj = new Set()
    weakmap.set(originValue, newObj)
    originValue.forEach(item => {
      newObj.add(deepCopy(item, weakmap))
    })
    return newObj
  }
  if (originValue instanceof Map) {
    // 2.2.如果是Map类型
    newObj = new Map()
    weakmap.set(originValue, newObj)
    originValue.forEach((value, key) => {
      newObj.set(deepCopy(key, weakmap), deepCopy(value, weakmap))
    })
    return newObj
  }
  if (Array.isArray(originValue)) {
    newObj = []
    weakmap.set(originValue, newObj)
    originValue.forEach((item, index) => {
      newObj[index] = deepCopy(item, weakmap)
    })
  } else if (originValue instanceof Object) {
    newObj = {}
    weakmap.set(originValue, newObj)
    Object.keys(originValue).forEach((key: string) => {
      newObj[key] = deepCopy(originValue[key], weakmap)
    })
    // 单独遍历symbol
    Object.getOwnPropertySymbols(originValue).forEach(skey => {
      newObj[Symbol(skey.description)] = deepCopy(originValue[skey], weakmap)
    })
  }
  return newObj
}
