

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


describe('MobileNumberEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DTONE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.MobileNumber()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DTONE_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mobile_number.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"mobile_number":{"a":true,"h":"Mobile Number","n":"mobile_number","r":true,"sh":"Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.","t":"`$STRING`","key$":"mobile_number","index$":1},"page":{"a":true,"fo":"int32","h":"Page","n":"page","r":false,"sh":"Page number","t":"`$INTEGER`","key$":"page","index$":2},"per_page":{"a":true,"fo":"int32","h":"Per Page","n":"per_page","r":false,"sh":"Number of records per page","t":"`$INTEGER`","key$":"per_page","index$":3}},"id":{"field":"id","name":"id"},"name":"mobile_number","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /lookup/mobile-number","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/lookup/mobile-number","q":{},"r":{},"s":[{"lit":"lookup"},{"lit":"mobile-number"}],"t":{"req":{"mobile_number":"`reqdata`"},"res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /lookup/mobile-number/{mobile_number}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"mobile_number","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":50,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/lookup/mobile-number/{mobile_number}","q":{"exist":["id","page","per_page"]},"r":{"param":{"mobile_number":"id"}},"s":[{"lit":"lookup"},{"lit":"mobile-number"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"mobile_number","name__orig":"mobile_number","Name":"MobileNumber","name_":"mobile_number","name-":"mobile-number","NAME":"MOBILE_NUMBER","index$":6}, {"active":true,"entity":"mobile_number","key$":"BasicMobileNumberFlow","kind":"basic","name":"BasicMobileNumberFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"mobile_number_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"mobile_number_ref01","srcdatavar":"mobile_number_ref01_data","suffix":"_dt0"},"m":{"id":"mobile_number01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mobile_number_ref01"}}],"index$":1}]}, 'MobileNumber', {"POST /lookup/mobile-number":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"mobile_number":{"type":"string","pattern":"^\\+[1-9][0-9]{6,14}$","description":"Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.","x-ref":"#/components/schemas/e164","key$":"mobile_number"},"page":{"description":"Page number","type":"integer","format":"int32","minimum":1,"default":1,"key$":"page"},"per_page":{"description":"Number of records per page","type":"integer","format":"int32","minimum":1,"maximum":100,"default":50,"key$":"per_page"}},"required":["mobile_number"],"index$":1}}}},"parameters":[]},"GET /lookup/mobile-number/{mobile_number}":{"protocol":"http","parameters":[{"name":"page","description":"Page number.","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"default":1},"x-ref":"#/components/parameters/Page","index$":0},{"name":"per_page","description":"Number of records per page.","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"maximum":100,"default":50},"x-ref":"#/components/parameters/PerPage","index$":1},{"in":"path","name":"mobile_number","schema":{"type":"string","pattern":"^\\+[1-9][0-9]{6,14}$","description":"Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.","x-ref":"#/components/schemas/e164"},"required":true,"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const mobile_number_ref01_ent = client.MobileNumber()
    let mobile_number_ref01_data = setup.data.new.mobile_number['mobile_number_ref01']

    mobile_number_ref01_data = (await mobile_number_ref01_ent.create(mobile_number_ref01_data)).data()
    assert(null != mobile_number_ref01_data.id)


    // LOAD
    const mobile_number_ref01_match_dt0: any = {}
    mobile_number_ref01_match_dt0.id = mobile_number_ref01_data.id
    const mobile_number_ref01_data_dt0 = (await mobile_number_ref01_ent.load(mobile_number_ref01_match_dt0)).data()
    assert(mobile_number_ref01_data_dt0.id === mobile_number_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/mobile_number/MobileNumberTestData.json')

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
    ['mobile_number01','mobile_number02','mobile_number03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DTONE_TEST_MOBILE_NUMBER_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': '',
    'DTONE_SECRET': '',
  })

  idmap = env['DTONE_TEST_MOBILE_NUMBER_ENTID']

  const live = 'TRUE' === env.DTONE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DTONE_TEST_MOBILE_NUMBER_ENTID']
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
  
