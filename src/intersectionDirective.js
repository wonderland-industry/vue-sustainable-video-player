let instances = {}
let counter = 0

const objIsSame = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

let _typeof = (obj) => {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = (obj) => {
      return typeof obj
    }
  } else {
    _typeof = (obj) => {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }
  return _typeof(obj)
}

const makeObserver = (el, value) => {
  if (_typeof(value) === 'function') {
    value = {
      callback: value
    }
  }

  let root = value.root || directive.defaults.root
  root = (() => {
    switch (_typeof(root)) {
      case 'function':
        return root()
      case 'string':
        return document.querySelector(root)
      case 'object':
        return root
    }
  })()

  const margin = value.margin || directive.defaults.margin
  const callback = value.callback || function() {}
  const multiple = value.multiple || directive.defaults.multiple

  const intersectionCallback = (args) => {
    const entry = args[0]
    el.isIntersecting = entry.isIntersecting
    if (!multiple && entry.isIntersecting && el.doneCallback) {
      return
    }
    if (entry.isIntersecting) {
      el.doneCallback = true
      callback()
    }
  }

  const observer = new IntersectionObserver(intersectionCallback, {
    root,
    rootMargin: margin,
    threshold: [0, 1]
  })
  observer.observe(el)
  return observer
}

const startObserving = (el, { value }) => {
  let id = `i${counter++}`
  el.instanceID = id

  let instance = {
    observer: makeObserver(el, value)
  }
  instances[id] = instance

  return
}

const removeObserver = (el) => {
  if (instances[el.instanceID]) {
    instances[el.instanceID].observer.disconnect()
    return delete instances[el.instanceID]
  }
}

const directive = {
  defaults: {
    root: void 0,
    margin: '0px 0px -1px 0px',
    disabled: false,
    multiple: false
  },
  inserted: (el, binding) => {
    return startObserving(el, binding)
  },
  componentUpdated: (el, binding) => {
    if (objIsSame(binding.value, binding.oldValue)) {
      return
    }

    removeObserver(el)
    return startObserving(el, binding)
  },
  unbind: (el) => {
    return removeObserver(el)
  }
}

export default directive
