import { forEachValue } from '../util'

// Base data struct for store's module, package with some attribute and method
export default class Module {
  constructor (rawModule, runtime) {
    this.runtime = runtime
    // Store some children item
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule
    const rawState = rawModule.state

    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }

  get namespaced () {
    return !!this._rawModule.namespaced
  }
  /**
   * 把嵌套在当前 Module 的 modules 属性中的子 Module 添加在
   * 当前 Module 的 _children 属性中。当modules中又嵌套 modules
   * 时，这里的 key 只是当前 Module 这一层的 modules 对象中的 key
   * @param {String} key 当前 Module 的 modules 属性中的 Key
   * @param {Object} module 当前 Module 的 modules 属性中的子Module
   */
  addChild (key, module) {
    this._children[key] = module
  }

  removeChild (key) {
    delete this._children[key]
  }

  getChild (key) {
    return this._children[key]
  }

  hasChild (key) {
    return key in this._children
  }

  update (rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }

  forEachChild (fn) {
    forEachValue(this._children, fn)
  }

  /**
   * 遍历用户传入的原始 module 配置中的 getters
   * @param {Function} fn 
   */
  forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  /**
   * 遍历用户传入的原始 module 配置中的 actions
   * @param {Function} fn 
   */
  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  /**
   * 遍历用户传入的原始 module 配置中的 mutations
   * @param {Function} fn 
   */
  forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
