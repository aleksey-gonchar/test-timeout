'use strict'
import _ from 'lodash'

const logMethods = [ 'debug', 'error', 'info', 'log', 'warn' ]
const logLevelValues = {
  'trace': 10,
  'log': 20,
  'debug': 20,
  'info': 30,
  'warn': 40,
  'error': 50,
  'fatal': 50
}

const noop = {
  log: () => { /* stub */ },
  error: () => { /* stub */ },
  debug: () => { /* stub */ },
  warn: () => { /* stub */ }
}

let globalTitle = window.name || ''

/**
 * logger service
 */
export class LoggerService {
  /**
   * set glob title
   * @param {*} title
   */
  static setGlobalTitle (title) {
    globalTitle = `${title}`
  }

  /**
   * constr
   */
  constructor () {
    this.logLevel = window.SO_LOG_LEVEL
    this.title = ''

    logMethods.forEach(method => {
      this[method] = this.consoleLog(method)
    })
  }

  /**
   * override
   * @param {*} message
   * @param {*} args
   */
  debug () { /* stub */ }

  /**
   * override
   * @param {*} message
   * @param {*} args
   */
  error () {  /* stub */ }

  /**
   * override
   * @param {*} message
   * @param {*} args
   */
  info () {  /* stub */ }

  /**
   * override
   * @param {*} message
   * @param {*} args
   */
  log () {  /* stub */ }

  /**
   * override
   * @param {*} message
   * @param {*} args
   */
  warn () {  /* stub */ }

  /**
   * set title
   * @param {*} title
   */
  setTitle (title) {
    this.title = title
  }

  /**
   * get title
   * @return {string}
   */
  getTitle () {
    let title
    if (_.isEmpty(globalTitle)) {
      title = `[${this.title}]`
    } else if (_.isEmpty(this.title)) {
      title = `[${globalTitle}]`
    } else {
      title = `[${globalTitle}::${this.title}]`
    }

    return title
  }

  /**
   * format err
   * @param {*} arg
   * @return {*}
   */
  formatError (arg) {
    if (!(arg instanceof Error)) {
      return arg
    }

    if (arg.stack) {
      arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
        ? `Error: ${arg.message}\n${arg.stack}`
        : arg.stack
    } else if (arg['sourceURL']) {
      arg = `${arg.message}\n${arg['sourceURL']}:${arg['line']}`
    }

    return arg
  }

  /**
   * log
   * @param {*} type
   * @return {*}
   */
  consoleLog (type) {
    const nativeConsole = window.console || console || noop
    const logFn = nativeConsole[type] || nativeConsole.log
    let hasApply = false

    // Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
    // The reason behind this is that console.log has type "object" in IE8...
    try {
      hasApply = !!logFn.apply
    } catch (e) {
      //
    }

    if (hasApply) {
      return (...args) => {
        if (logLevelValues[type] < logLevelValues[this.logLevel]) {
          return
        }

        const digestedArgs = [ this.getTitle() ]
        args.forEach(arg => digestedArgs.push(this.formatError(arg)))

        logFn.apply(console, digestedArgs)
      }
    }
    // we are IE which either doesn't have window.console => this is noop and we do nothing,
    // or we are IE where console.log doesn't have apply so we log at least first 2 args
    return (arg1, arg2) => {
      if (logLevelValues[type] < logLevelValues[this.logLevel]) {
        return
      }

      logFn(this.getTitle(), arg1, arg2 === undefined ? '' : arg2)
    }
  }
}
