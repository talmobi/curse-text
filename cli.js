#!/usr/bin/env node

const curse = require( './main.js' )

const args = process.argv.slice( 2 )

let _intensity = 0.5

if ( args[ 0 ] ) {
  const n = Number( args[ 0 ] )

  if ( typeof n !== 'number' ) {
    console.log( 'argument has to be a decimal number between 0 and 1' )
    process.exit( 1 )
  }

  if ( Number.isNaN( n ) ) {
    console.log( 'argument has to be a decimal number between 0 and 1' )
    process.exit( 1 )
  }

  _intensity = n
}

let buffer = ''
process.stdin.on( 'data', function ( chunk ) {
  buffer += chunk
  const lines = buffer.split( '\n' )
  buffer = lines.pop()

  handleInput( lines )
} )

process.stdin.on( 'end', function () {
  handleInput( buffer )
} )

function handleInput ( lines ) {
  let buffer
  if ( typeof lines === 'string' ) {
    buffer = lines
  } else {
    // assume array
    buffer = lines.join( '\n' )
  }

  const opts = {
    intensity: _intensity
  }
  process.stdout.write( curse( buffer, opts ) )
}
