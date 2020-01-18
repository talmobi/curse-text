const test = require( 'tape' )

const execa = require( 'execa' )

const path = require( 'path' )
const CLI_PATH = path.resolve( __dirname, '../cli.js' )

// wrap with fixed seed
const SEED = 1
const _curse = require( '../main.js' )

test( 'api: basic zalgo', function ( t ) {
  t.plan( 1 )

  function curse ( text ) {
    return _curse( text, { seed: SEED } )
  }

  t.equal( curse( 'hello world' ), 'h̓e̛lͯl̙o̓ ̵w̠o̜r̥l̈́dͥ' )
} )

test( 'cli: basic zalgo', async function ( t ) {
  t.plan( 1 )

  function curse ( text ) {
    return _curse( text, { seed: SEED } )
  }

  const zalgo = curse( 'hello world' )

  const echo = execa( 'echo', [ 'hello world' ] )
  const cli = execa( CLI_PATH, [ '', SEED ] )
  echo.stdout.pipe( cli.stdin )

  let buffer = ''
  cli.stdout.on( 'data', function ( chunk ) {
    buffer += chunk
  } )

  cli.stdout.on( 'end', function ( chunk ) {
    t.equal( buffer, 'h̓e̛lͯl̙o̓ ̵w̠o̜r̥l̈́dͥ' )
  } )

  cli.stdout.on( 'error', function ( err ) {
    throw error
  } )
} )

test( 'api: basic zalgo with intensity 0.5', function ( t ) {
  t.plan( 1 )

  function curse ( text ) {
    return _curse( text, { intensity: 0.5, seed: SEED } )
  }

  t.equal( curse( 'hello world' ), 'h̵̛̙̠̜̥̓ͯ̓̈́e̢͙̰̼ͥ́́̏̏͢l̳̤̋̍ͦ̆͐ͮͦ͡l̴͙͗̿͊ͣ̃͂̊ͅo̷͈̞̗̺̙͖͂̈ͮ ̺̞̀͗́̇̓ͦ͆͟w͎̰̖͚̱ͣͫ̑̎̔ǫ̨̹̬͎́̈́́̓̐r̷̭͚̻̺̻̉͊̌̕ļ̩͙̠̮̀̍ͬ̊̓ḑ͇̌͊ͭ̆̇̏ͩ͟' )
} )

test( 'cli: basic zalgo with intensity 0.5', async function ( t ) {
  t.plan( 1 )

  function curse ( text ) {
    return _curse( text, { intensity: 0.5, seed: SEED } )
  }

  const zalgo = curse( 'hello world' )

  const echo = execa( 'echo', [ 'hello world' ] )
  const cli = execa( CLI_PATH, [ 0.5, SEED ] )
  echo.stdout.pipe( cli.stdin )

  let buffer = ''
  cli.stdout.on( 'data', function ( chunk ) {
    buffer += chunk
  } )

  cli.stdout.on( 'end', function ( chunk ) {
    t.equal( buffer, 'h̵̛̙̠̜̥̓ͯ̓̈́e̢͙̰̼ͥ́́̏̏͢l̳̤̋̍ͦ̆͐ͮͦ͡l̴͙͗̿͊ͣ̃͂̊ͅo̷͈̞̗̺̙͖͂̈ͮ ̺̞̀͗́̇̓ͦ͆͟w͎̰̖͚̱ͣͫ̑̎̔ǫ̨̹̬͎́̈́́̓̐r̷̭͚̻̺̻̉͊̌̕ļ̩͙̠̮̀̍ͬ̊̓ḑ͇̌͊ͭ̆̇̏ͩ͟' )
  } )

  cli.stdout.on( 'error', function ( err ) {
    throw error
  } )
} )
