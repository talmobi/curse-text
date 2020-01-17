#!/usr/bin/env node

const curse = require( './main.js' )

let buffer = ''
process.stdin.on( 'data', function ( chunk ) {
  buffer += chunk
} )

process.stdin.on( 'end', function () {
  process.stdout.write( curse( buffer ) )
} )
