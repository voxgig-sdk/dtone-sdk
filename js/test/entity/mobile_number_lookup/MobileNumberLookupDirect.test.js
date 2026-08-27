
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { DtoneSDK } = require('../../..')

const {
  envOverride,
} = require('../../utility')


describe('MobileNumberLookupDirect', async () => {

  test('direct-exists', async () => {
    const sdk = new DtoneSDK({
      // Concrete base: a live construction must satisfy any server
      // variables a templated base URL declares; overriding base with a
      // literal (as the direct flow tests do) sidesteps the requirement.
      base: 'http://localhost:8080',
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-list-mobile_number_lookup', async () => {
    const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }])
    const { client, calls } = setup

    const params = {}
    if (setup.live) {
      params.mobile_number = setup.idmap['mobile_number01']
    } else {
      params.mobile_number = 'direct01'
    }

    const result = await client.direct({
      path: 'lookup/mobile-number/{mobile_number}',
      method: 'GET',
      params,
    })

    assert(result.ok === true)
    assert(result.status === 200)
    assert(Array.isArray(result.data))

    if (!setup.live) {
      assert(result.data.length === 2)
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
    }
  })

})



function directSetup(mockres) {
  const calls = []

  const env = envOverride({
    'DTONE_TEST_MOBILE_NUMBER_LOOKUP_ENTID': {},
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_APIKEY': 'NONE',
  })

  const live = 'TRUE' === env.DTONE_TEST_LIVE

  if (live) {
    const client = new DtoneSDK({
      apikey: env.DTONE_APIKEY,
    })

    let idmap = env['DTONE_TEST_MOBILE_NUMBER_LOOKUP_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap }
  }

  const mockFetch = async (url, init) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new DtoneSDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} }
}
  
