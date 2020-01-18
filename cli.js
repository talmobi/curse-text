#!/usr/bin/env node

const curse = require( './main.js' )

const args = process.argv.slice( 2 )

let _intensity = undefined
let _seed = undefined

if ( args[ 0 ] ) {
  const n = Number( args[ 0 ] )

  if ( typeof n !== 'number' ) {
    console.log( 'arg0 (intensity) has to be a decimal number between 0 and 1' )
    process.exit( 1 )
  }

  if ( Number.isNaN( n ) ) {
    console.log( 'arg0 (intensity) has to be a decimal number between 0 and 1' )
    process.exit( 1 )
  }

  _intensity = n
}


if ( args[ 1 ] ) {
  const n = Number( args[ 1 ] )

  if ( typeof n !== 'number' ) {
    console.log( 'arg1 (seed) has to be a number' )
    process.exit( 1 )
  }

  if ( Number.isNaN( n ) ) {
    console.log( 'arg1 (seed) has to be a number' )
    process.exit( 1 )
  }

  _seed = n
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
    intensity: _intensity,
    seed: _seed
  }

  process.stdout.write( curse( buffer, opts ) )
}
