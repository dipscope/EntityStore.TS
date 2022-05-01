/**
 * Unique symbol used to get target from a proxy.
 * 
 * @type {unique symbol}
 */
export const proxyTargetSymbol: unique symbol = Symbol.for('$ESProxyTarget');
