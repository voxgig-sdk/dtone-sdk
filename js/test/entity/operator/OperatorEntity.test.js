
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { DtoneSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('OperatorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DTONE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.Operator()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"country":{"a":true,"h":"Country","n":"country","r":true,"t":"`$OBJECT`","key$":"country","index$":0},"id":{"a":true,"fo":"int32","h":"Id","n":"id","r":true,"sh":"Operator identifier.","t":"`$INTEGER`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":2},"regions":{"a":true,"h":"Regions","n":"regions","r":true,"t":"`$ARRAY`","key$":"regions","index$":3}},"id":{"field":"id","name":"id"},"name":"operator","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /operators","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"country_iso_code","or":"country_iso_code","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":50,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"service_id","or":"service_id","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"subservice_id","or":"subservice_id","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/operators","q":{"exist":["country_iso_code","page","per_page","service_id","subservice_id"]},"r":{},"s":[{"lit":"operators"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /operators/{operator_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"operator_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/operators/{operator_id}","q":{"exist":["id"]},"r":{"param":{"operator_id":"id"}},"s":[{"lit":"operators"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"operator","name__orig":"operator","Name":"Operator","name_":"operator","name-":"operator","NAME":"OPERATOR","index$":7}, {"active":true,"entity":"operator","key$":"BasicOperatorFlow","kind":"basic","name":"BasicOperatorFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"operator_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"operator_ref01","srcdatavar":"operator_ref01_data","suffix":"_dt0"},"m":{"id":"operator01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-operator_ref01"}}],"index$":1}]}, 'Operator', {"GET /operators":{"protocol":"http","parameters":[{"name":"country_iso_code","in":"query","required":false,"schema":{"type":"string","pattern":"^[A-Z]{3}$","description":"Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.","x-ref":"#/components/schemas/x-iso-3166-1_alpha-3"},"index$":0},{"name":"service_id","in":"query","required":false,"description":"Service identifier. See [Services](#tags/Services) for more details. Required when `subservice_id` is specified.","schema":{"type":"integer","format":"int32","minimum":1,"description":"Service identifier. See [Services](#tags/Services) for more details.","x-ref":"#/components/schemas/service_id"},"index$":1},{"name":"subservice_id","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"description":"Sub-service identifier. See [Services](#tags/Services) for more details.","x-ref":"#/components/schemas/subservice_id"},"index$":2},{"name":"page","description":"Page number.","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"default":1},"x-ref":"#/components/parameters/Page","index$":3},{"name":"per_page","description":"Number of records per page.","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"maximum":100,"default":50},"x-ref":"#/components/parameters/PerPage","index$":4}]},"GET /operators/{operator_id}":{"protocol":"http","parameters":[{"name":"operator_id","in":"path","required":true,"schema":{"type":"integer","format":"int32","minimum":1,"description":"Operator identifier.","x-ref":"#/components/schemas/operator_id"},"index$":0}]}})
    }
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
    ['operator01','operator02','operator03'],
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
    'DTONE_APIKEY': '',
  })

  idmap = env['DTONE_TEST_OPERATOR_ENTID']

  const live = 'TRUE' === env.DTONE_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DTONE_TEST_OPERATOR_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DtoneSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.DTONE_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
