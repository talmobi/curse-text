const zalgo = require( 'zalgo-js' ).default

module.exports = function curseText ( text, opts ) {
  opts = opts || {}
  if ( opts.intensity == null ) {
    opts.intensity = 0.5
  }

  return zalgo( text, opts )
}
