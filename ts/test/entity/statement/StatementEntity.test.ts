

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


describe('StatementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DTONE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.Statement()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DTONE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'statement.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_number":{"a":true,"h":"Account Number","n":"account_number","r":true,"sh":"Account number.","t":"`$STRING`","key$":"account_number","index$":0},"account_qualifier":{"a":true,"h":"Account Qualifier","n":"account_qualifier","r":false,"t":"`$STRING`","key$":"account_qualifier","index$":1},"page":{"a":true,"fo":"int32","h":"Page","n":"page","r":false,"sh":"Page number","t":"`$INTEGER`","key$":"page","index$":2},"per_page":{"a":true,"fo":"int32","h":"Per Page","n":"per_page","r":false,"sh":"Number of records per page","t":"`$INTEGER`","key$":"per_page","index$":3},"product_id":{"a":true,"fo":"int32","h":"Product Id","n":"product_id","r":true,"sh":"Product identifier.","t":"`$INTEGER`","key$":"product_id","index$":4}},"name":"statement","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /lookup/statement-inquiry","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/lookup/statement-inquiry","q":{},"r":{},"s":[{"lit":"lookup"},{"lit":"statement-inquiry"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"statement","name__orig":"statement","Name":"Statement","name_":"statement","name-":"statement","NAME":"STATEMENT","index$":11}, {"active":true,"entity":"statement","key$":"BasicStatementFlow","kind":"basic","name":"BasicStatementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"statement_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Statement', {"POST /lookup/statement-inquiry":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"product_id":{"type":"integer","format":"int32","minimum":1,"description":"Product identifier.","x-ref":"#/components/schemas/product_id","key$":"product_id"},"account_number":{"type":"string","minLength":1,"maxLength":90,"pattern":"\\S","description":"Account number.","x-ref":"#/components/schemas/account_number","key$":"account_number"},"account_qualifier":{"type":"string","minLength":1,"pattern":"\\S","x-ref":"#/components/schemas/non_empty_string","key$":"account_qualifier"},"page":{"description":"Page number","type":"integer","format":"int32","minimum":1,"default":1,"key$":"page"},"per_page":{"description":"Number of records per page","type":"integer","format":"int32","minimum":1,"maximum":100,"default":50,"key$":"per_page"}},"required":["product_id","account_number"],"index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const statement_ref01_ent = client.Statement()
    let statement_ref01_data = setup.data.new.statement['statement_ref01']

    statement_ref01_data = (await statement_ref01_ent.create(statement_ref01_data)).data()
    assert(null != statement_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/statement/StatementTestData.json')

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
    ['statement01','statement02','statement03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DTONE_TEST_STATEMENT_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': '',
    'DTONE_SECRET': '',
  })

  idmap = env['DTONE_TEST_STATEMENT_ENTID']

  const live = 'TRUE' === env.DTONE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DTONE_TEST_STATEMENT_ENTID']
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
  
