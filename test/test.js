const test = require( 'tape' )

const execa = require( 'execa' )

const path = require( 'path' )
const CLI_PATH = path.resolve( __dirname, '../cli.js' )

// wrap with fixed seed
const SEED = 1
const _curse = require( '../main.js' )
function curse ( text ) {
  return _curse( text, { seed: SEED } )
}

test( 'api: basic zalgo', function ( t ) {
  t.plan( 1 )

  t.equal( curse( 'hello world' ), 'h̵̛̙̠̜̥̓ͯ̓̈́e̢͙̰̼ͥ́́̏̏͢l̳̤̋̍ͦ̆͐ͮͦ͡l̴͙͗̿͊ͣ̃͂̊ͅo̷͈̞̗̺̙͖͂̈ͮ ̺̞̀͗́̇̓ͦ͆͟w͎̰̖͚̱ͣͫ̑̎̔ǫ̨̹̬͎́̈́́̓̐r̷̭͚̻̺̻̉͊̌̕ļ̩͙̠̮̀̍ͬ̊̓ḑ͇̌͊ͭ̆̇̏ͩ͟' )
} )

test.only( 'cli: basic zalgo', async function ( t ) {
  t.plan( 1 )

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
