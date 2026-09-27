
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


describe('CreditPartyBenefitEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DTONE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.CreditPartyBenefit()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"credit_party_identifier":{"a":true,"h":"Credit Party Identifier","n":"credit_party_identifier","r":true,"t":"`$OBJECT`","key$":"credit_party_identifier","index$":0},"page":{"a":true,"fo":"int32","h":"Page","n":"page","r":false,"sh":"Page number","t":"`$INTEGER`","key$":"page","index$":1},"per_page":{"a":true,"fo":"int32","h":"Per Page","n":"per_page","r":false,"sh":"Number of records per page","t":"`$INTEGER`","key$":"per_page","index$":2},"service_id":{"a":true,"fo":"int32","h":"Service Id","n":"service_id","r":true,"sh":"Service identifier.","t":"`$INTEGER`","key$":"service_id","index$":3}},"name":"credit_party_benefit","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /lookup/credit-party-benefits","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/lookup/credit-party-benefits","q":{},"r":{},"s":[{"lit":"lookup"},{"lit":"credit-party-benefits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"credit_party_benefit","name__orig":"credit_party_benefit","Name":"CreditPartyBenefit","name_":"credit_party_benefit","name-":"credit-party-benefit","NAME":"CREDIT_PARTY_BENEFIT","index$":4}, {"active":true,"entity":"credit_party_benefit","key$":"BasicCreditPartyBenefitFlow","kind":"basic","name":"BasicCreditPartyBenefitFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"credit_party_benefit_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'CreditPartyBenefit', {"POST /lookup/credit-party-benefits":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"service_id":{"type":"integer","format":"int32","minimum":1,"description":"Service identifier. See [Services](#tags/Services) for more details.","x-ref":"#/components/schemas/service_id","key$":"service_id"},"credit_party_identifier":{"type":"object","properties":{"mobile_number":{"type":"string","pattern":"^\\+[1-9][0-9]{6,14}$","description":"Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.","x-ref":"#/components/schemas/e164"},"account_number":{"type":"string","minLength":1,"maxLength":90,"pattern":"\\S","description":"Account number.","x-ref":"#/components/schemas/account_number"},"account_qualifier":{"type":"string","minLength":1,"pattern":"\\S","x-ref":"#/components/schemas/non_empty_string"}},"minProperties":1,"key$":"credit_party_identifier"},"page":{"description":"Page number","type":"integer","format":"int32","minimum":1,"default":1,"key$":"page"},"per_page":{"description":"Number of records per page","type":"integer","format":"int32","minimum":1,"maximum":100,"default":50,"key$":"per_page"}},"required":["service_id","credit_party_identifier"],"index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const credit_party_benefit_ref01_ent = client.CreditPartyBenefit()
    let credit_party_benefit_ref01_data = setup.data.new.credit_party_benefit['credit_party_benefit_ref01']

    credit_party_benefit_ref01_data = (await credit_party_benefit_ref01_ent.create(credit_party_benefit_ref01_data)).data()
    assert(null != credit_party_benefit_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/credit_party_benefit/CreditPartyBenefitTestData.json')

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
    ['credit_party_benefit01','credit_party_benefit02','credit_party_benefit03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DTONE_TEST_CREDIT_PARTY_BENEFIT_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': '',
  })

  idmap = env['DTONE_TEST_CREDIT_PARTY_BENEFIT_ENTID']

  const live = 'TRUE' === env.DTONE_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DTONE_TEST_CREDIT_PARTY_BENEFIT_ENTID']
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
  
