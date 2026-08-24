
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


describe('ServiceEntity', async () => {

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.Service()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let service_ref01_data = Object.values(setup.data.existing.service)[0]

    // LIST
    const service_ref01_ent = client.Service()
    const service_ref01_match = {}

    const service_ref01_list = (await service_ref01_ent.list(service_ref01_match)).map((e) => e.data())


    // LOAD
    const service_ref01_match_dt0 = {}
    service_ref01_match_dt0.id = service_ref01_data.id
    const service_ref01_data_dt0 = (await service_ref01_ent.load(service_ref01_match_dt0)).data()
    assert(service_ref01_data_dt0.id === service_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/service/ServiceTestData.json')

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
    ['service01','service02','service03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DTONE_TEST_SERVICE_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': 'NONE',
  })

  idmap = env['DTONE_TEST_SERVICE_ENTID']

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
  
