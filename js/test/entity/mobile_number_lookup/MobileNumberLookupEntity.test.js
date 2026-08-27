
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { DtoneSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('MobileNumberLookupEntity', async () => {

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.MobileNumberLookup()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let mobile_number_lookup_ref01_data = Object.values(setup.data.existing.mobile_number_lookup)[0]

    // LIST
    const mobile_number_lookup_ref01_ent = client.MobileNumberLookup()
    const mobile_number_lookup_ref01_match = {}

    const mobile_number_lookup_ref01_list = (await mobile_number_lookup_ref01_ent.list(mobile_number_lookup_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/mobile_number_lookup/MobileNumberLookupTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DtoneSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['mobile_number_lookup01','mobile_number_lookup02','mobile_number_lookup03','mobile_number01','mobile_number02','mobile_number03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DTONE_TEST_MOBILE_NUMBER_LOOKUP_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': 'NONE',
  })

  idmap = env['DTONE_TEST_MOBILE_NUMBER_LOOKUP_ENTID']

  if ('TRUE' === env.DTONE_TEST_LIVE) {
    client = new DtoneSDK(merge([
      {
        apikey: env.DTONE_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.DTONE_TEST_EXPLAIN,
    now: Date.now(),
  }

  return setup
}
  
