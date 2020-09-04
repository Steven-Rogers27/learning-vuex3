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
   * ��Ƕ���ڵ�ǰ Module �� modules �����е��� Module �����
   * ��ǰ Module �� _children �����С���modules����Ƕ�� modules
   * ʱ������� key ֻ�ǵ�ǰ Module ��һ��� modules �����е� key
   * @param {String} key ��ǰ Module �� modules �����е� Key
   * @param {Object} module ��ǰ Module �� modules �����е���Module
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
   * �����û������ԭʼ module �����е� getters
   * @param {Function} fn 
   */
  forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  /**
   * �����û������ԭʼ module �����е� actions
   * @param {Function} fn 
   */
  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  /**
   * �����û������ԭʼ module �����е� mutations
   * @param {Function} fn 
   */
  forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
