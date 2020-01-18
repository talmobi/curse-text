const zalgo = require( 'zalgo-js' ).default

module.exports = function curseText ( text, opts ) {
  return zalgo( text, opts )
}
