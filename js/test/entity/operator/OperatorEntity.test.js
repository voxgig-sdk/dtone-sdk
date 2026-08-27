
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


describe('OperatorEntity', async () => {

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.Operator()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let operator_ref01_data = Object.values(setup.data.existing.operator)[0]

    // LIST
    const operator_ref01_ent = client.Operator()
    const operator_ref01_match = {}

    const operator_ref01_list = (await operator_ref01_ent.list(operator_ref01_match)).map((e) => e.data())


    // LOAD
    const operator_ref01_match_dt0 = {}
    operator_ref01_match_dt0.id = operator_ref01_data.id
    const operator_ref01_data_dt0 = (await operator_ref01_ent.load(operator_ref01_match_dt0)).data()
    assert(operator_ref01_data_dt0.id === operator_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/operator/OperatorTestData.json')

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
    ['operator01','operator02','operator03','operator01','operator02','operator03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DTONE_TEST_OPERATOR_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': 'NONE',
  })

  idmap = env['DTONE_TEST_OPERATOR_ENTID']

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
  
