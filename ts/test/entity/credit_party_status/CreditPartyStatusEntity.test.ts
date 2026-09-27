

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


describe('CreditPartyStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DTONE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.CreditPartyStatus()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DTONE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'credit_party_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activation_date":{"a":true,"fo":"date-time","h":"Activation Date","n":"activation_date","r":true,"sh":"A `null` value denotes that credit party has not yet been activated on the actual network","t":"`$STRING`","key$":"activation_date","index$":0},"credit_party_identifier":{"a":true,"h":"Credit Party Identifier","n":"credit_party_identifier","r":true,"t":"`$OBJECT`","key$":"credit_party_identifier","index$":1},"installation_date":{"a":true,"fo":"date-time","h":"Installation Date","n":"installation_date","r":true,"sh":"A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed","t":"`$STRING`","key$":"installation_date","index$":2},"service_id":{"a":true,"fo":"int32","h":"Service Id","n":"service_id","r":true,"sh":"Service identifier.","t":"`$INTEGER`","key$":"service_id","index$":3}},"name":"credit_party_status","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /lookup/credit-party-status","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/lookup/credit-party-status","q":{},"r":{},"s":[{"lit":"lookup"},{"lit":"credit-party-status"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"credit_party_status","name__orig":"credit_party_status","Name":"CreditPartyStatus","name_":"credit_party_status","name-":"credit-party-status","NAME":"CREDIT_PARTY_STATUS","index$":5}, {"active":true,"entity":"credit_party_status","key$":"BasicCreditPartyStatusFlow","kind":"basic","name":"BasicCreditPartyStatusFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"credit_party_status_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'CreditPartyStatus', {"POST /lookup/credit-party-status":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"service_id":{"type":"integer","format":"int32","minimum":1,"description":"Service identifier. See [Services](#tags/Services) for more details.","x-ref":"#/components/schemas/service_id","key$":"service_id"},"credit_party_identifier":{"type":"object","properties":{"mobile_number":{"type":"string","pattern":"^\\+[1-9][0-9]{6,14}$","description":"Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.","x-ref":"#/components/schemas/e164"},"account_number":{"type":"string","minLength":1,"maxLength":90,"pattern":"\\S","description":"Account number.","x-ref":"#/components/schemas/account_number"},"account_qualifier":{"type":"string","minLength":1,"pattern":"\\S","x-ref":"#/components/schemas/non_empty_string"}},"minProperties":1,"key$":"credit_party_identifier"}},"required":["service_id","credit_party_identifier"],"index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const credit_party_status_ref01_ent = client.CreditPartyStatus()
    let credit_party_status_ref01_data = setup.data.new.credit_party_status['credit_party_status_ref01']

    credit_party_status_ref01_data = (await credit_party_status_ref01_ent.create(credit_party_status_ref01_data)).data()
    assert(null != credit_party_status_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/credit_party_status/CreditPartyStatusTestData.json')

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
    ['credit_party_status01','credit_party_status02','credit_party_status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DTONE_TEST_CREDIT_PARTY_STATUS_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': '',
    'DTONE_SECRET': '',
  })

  idmap = env['DTONE_TEST_CREDIT_PARTY_STATUS_ENTID']

  const live = 'TRUE' === env.DTONE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DTONE_TEST_CREDIT_PARTY_STATUS_ENTID']
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
  
