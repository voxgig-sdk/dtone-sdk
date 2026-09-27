

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


describe('CampaignEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DTONE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.Campaign()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DTONE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'campaign.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":0},"end_date":{"a":true,"fo":"date-time","h":"End Date","n":"end_date","r":true,"t":"`$STRING`","key$":"end_date","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":2},"products":{"a":true,"h":"Products","n":"products","r":true,"t":"`$ARRAY`","key$":"products","index$":3},"start_date":{"a":true,"fo":"date-time","h":"Start Date","n":"start_date","r":true,"t":"`$STRING`","key$":"start_date","index$":4},"terms":{"a":true,"h":"Terms","n":"terms","r":true,"t":"`$STRING`","key$":"terms","index$":5},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":6}},"id":{"field":"id","name":"id"},"name":"campaign","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /campaigns","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"country_iso_code","or":"country_iso_code","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"operator_id","or":"operator_id","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":50,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"product_id","or":"product_id","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/campaigns","q":{"exist":["country_iso_code","operator_id","page","per_page","product_id"]},"r":{},"s":[{"lit":"campaigns"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /campaigns/{campaign_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"campaign_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/campaigns/{campaign_id}","q":{"exist":["id"]},"r":{"param":{"campaign_id":"id"}},"s":[{"lit":"campaigns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"campaign","name__orig":"campaign","Name":"Campaign","name_":"campaign","name-":"campaign","NAME":"CAMPAIGN","index$":2}, {"active":true,"entity":"campaign","key$":"BasicCampaignFlow","kind":"basic","name":"BasicCampaignFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"campaign_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"campaign_ref01","srcdatavar":"campaign_ref01_data","suffix":"_dt0"},"m":{"id":"campaign01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-campaign_ref01"}}],"index$":1}]}, 'Campaign', {"GET /campaigns":{"protocol":"http","parameters":[{"name":"page","description":"Page number.","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"default":1},"x-ref":"#/components/parameters/Page","index$":0},{"name":"per_page","description":"Number of records per page.","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"maximum":100,"default":50},"x-ref":"#/components/parameters/PerPage","index$":1},{"name":"country_iso_code","in":"query","required":false,"schema":{"type":"string","pattern":"^[A-Z]{3}$","description":"Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.","x-ref":"#/components/schemas/x-iso-3166-1_alpha-3"},"index$":2},{"name":"operator_id","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"description":"Operator identifier.","x-ref":"#/components/schemas/operator_id"},"index$":3},{"name":"product_id","in":"query","required":false,"schema":{"type":"integer","format":"int32","minimum":1,"description":"Product identifier.","x-ref":"#/components/schemas/product_id"},"index$":4}]},"GET /campaigns/{campaign_id}":{"protocol":"http","parameters":[{"name":"campaign_id","in":"path","required":true,"schema":{"type":"integer","format":"int32","minimum":1,"description":"Campaign identifier.","x-ref":"#/components/schemas/campaign_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let campaign_ref01_data = Object.values(setup.data.existing.campaign)[0] as any

    // LIST
    const campaign_ref01_ent = client.Campaign()
    const campaign_ref01_match: any = {}

    const campaign_ref01_list = (await campaign_ref01_ent.list(campaign_ref01_match)).map((e: any) => e.data())


    // LOAD
    const campaign_ref01_match_dt0: any = {}
    campaign_ref01_match_dt0.id = campaign_ref01_data.id
    const campaign_ref01_data_dt0 = (await campaign_ref01_ent.load(campaign_ref01_match_dt0)).data()
    assert(campaign_ref01_data_dt0.id === campaign_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/campaign/CampaignTestData.json')

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
    ['campaign01','campaign02','campaign03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DTONE_TEST_CAMPAIGN_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': '',
    'DTONE_SECRET': '',
  })

  idmap = env['DTONE_TEST_CAMPAIGN_ENTID']

  const live = 'TRUE' === env.DTONE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DTONE_TEST_CAMPAIGN_ENTID']
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
  
