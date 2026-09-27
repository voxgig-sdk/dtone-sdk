

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DtoneSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PromotionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DTONE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.Promotion()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DTONE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'promotion.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":0},"end_date":{"a":true,"fo":"date-time","h":"End Date","n":"end_date","r":true,"t":"`$STRING`","key$":"end_date","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":2},"operator":{"a":true,"h":"Operator","n":"operator","r":true,"t":"`$OBJECT`","key$":"operator","index$":3},"products":{"a":true,"h":"Products","n":"products","r":true,"t":"`$ARRAY`","key$":"products","index$":4},"start_date":{"a":true,"fo":"date-time","h":"Start Date","n":"start_date","r":true,"t":"`$STRING`","key$":"start_date","index$":5},"terms":{"a":true,"h":"Terms","n":"terms","r":true,"t":"`$STRING`","key$":"terms","index$":6},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":7}},"id":{"field":"id","name":"id"},"name":"promotion","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /promotions","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"es","k":"header","n":"accept_language","or":"accept_language","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"country_iso_code","or":"country_iso_code","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"operator_id","or":"operator_id","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":50,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"product_id","or":"product_id","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/promotions","q":{"exist":["accept_language","country_iso_code","operator_id","page","per_page","product_id"]},"r":{},"s":[{"lit":"promotions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /promotions/{promotion_id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"es","k":"header","n":"accept_language","or":"accept_language","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"promotion_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/promotions/{promotion_id}","q":{"exist":["accept_language","id"]},"r":{"param":{"promotion_id":"id"}},"s":[{"lit":"promotions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"promotion","name__orig":"promotion","Name":"Promotion","name_":"promotion","name-":"promotion","NAME":"PROMOTION","index$":9}, {"active":true,"entity":"promotion","key$":"BasicPromotionFlow","kind":"basic","name":"BasicPromotionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"promotion_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"promotion_ref01","srcdatavar":"promotion_ref01_data","suffix":"_dt0"},"m":{"id":"promotion01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-promotion_ref01"}}],"index$":1}]}, 'Promotion', {"GET /promotions":{"protocol":"http","parameters":[{"name":"Accept-Language","description":"Preferred language for the content","in":"header","schema":{"type":"string","example":"es"},"x-ref":"#/components/parameters/Accept-Language","index$":0},{"name":"page","description":"Page number.","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"default":1},"x-ref":"#/components/parameters/Page","index$":1},{"name":"per_page","description":"Number of records per page.","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"maximum":100,"default":50},"x-ref":"#/components/parameters/PerPage","index$":2},{"name":"country_iso_code","in":"query","required":false,"schema":{"type":"string","pattern":"^[A-Z]{3}$","description":"Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.","x-ref":"#/components/schemas/x-iso-3166-1_alpha-3"},"index$":3},{"name":"operator_id","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"description":"Operator identifier.","x-ref":"#/components/schemas/operator_id"},"index$":4},{"name":"product_id","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"description":"Product identifier.","x-ref":"#/components/schemas/product_id"},"index$":5}]},"GET /promotions/{promotion_id}":{"protocol":"http","parameters":[{"name":"Accept-Language","description":"Preferred language for the content","in":"header","schema":{"type":"string","example":"es"},"x-ref":"#/components/parameters/Accept-Language","index$":0},{"name":"promotion_id","in":"path","required":true,"schema":{"type":"integer","format":"int32","minimum":1,"description":"Promotion identifier.","x-ref":"#/components/schemas/promotion_id"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let promotion_ref01_data = Object.values(setup.data.existing.promotion)[0] as any

    // LIST
    const promotion_ref01_ent = client.Promotion()
    const promotion_ref01_match: any = {}

    const promotion_ref01_list = (await promotion_ref01_ent.list(promotion_ref01_match)).map((e: any) => e.data())


    // LOAD
    const promotion_ref01_match_dt0: any = {}
    promotion_ref01_match_dt0.id = promotion_ref01_data.id
    const promotion_ref01_data_dt0 = (await promotion_ref01_ent.load(promotion_ref01_match_dt0)).data()
    assert(promotion_ref01_data_dt0.id === promotion_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/promotion/PromotionTestData.json')

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
    ['promotion01','promotion02','promotion03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DTONE_TEST_PROMOTION_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': '',
    'DTONE_SECRET': '',
  })

  idmap = env['DTONE_TEST_PROMOTION_ENTID']

  const live = 'TRUE' === env.DTONE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DTONE_TEST_PROMOTION_ENTID']
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
        secret: env.DTONE_SECRET,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
