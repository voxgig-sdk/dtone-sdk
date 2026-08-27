
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { DtoneSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('TransactionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DTONE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.Transaction()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DTONE_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'transaction.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set DTONE_TEST_TRANSACTION_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const transaction_ref01_ent = client.Transaction()
    let transaction_ref01_data = setup.data.new.transaction['transaction_ref01']

    transaction_ref01_data = (await transaction_ref01_ent.create(transaction_ref01_data)).data()
    assert(null != transaction_ref01_data.id)


    // LIST
    const transaction_ref01_match: any = {}

    const transaction_ref01_list = (await transaction_ref01_ent.list(transaction_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(transaction_ref01_list, { id: transaction_ref01_data.id })))


    // UPDATE
    const transaction_ref01_data_up0: any = {}
    transaction_ref01_data_up0.id = transaction_ref01_data.id

    const transaction_ref01_markdef_up0 = { name: 'callback_url', value: 'Mark01-transaction_ref01_' + setup.now }
    ;(transaction_ref01_data_up0 as any)[transaction_ref01_markdef_up0.name] = transaction_ref01_markdef_up0.value

    const transaction_ref01_resdata_up0 = (await transaction_ref01_ent.update(transaction_ref01_data_up0)).data()
    assert(transaction_ref01_resdata_up0.id === transaction_ref01_data_up0.id)

    assert((transaction_ref01_resdata_up0 as any)[transaction_ref01_markdef_up0.name] === transaction_ref01_markdef_up0.value)


    // LOAD
    const transaction_ref01_match_dt0: any = {}
    transaction_ref01_match_dt0.id = transaction_ref01_data.id
    const transaction_ref01_data_dt0 = (await transaction_ref01_ent.load(transaction_ref01_match_dt0)).data()
    assert(transaction_ref01_data_dt0.id === transaction_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/transaction/TransactionTestData.json')

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
    ['transaction01','transaction02','transaction03','transaction01','transaction02','transaction03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['DTONE_TEST_TRANSACTION_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'DTONE_TEST_TRANSACTION_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': 'NONE',
    'DTONE_SECRET': 'NONE',
  })

  idmap = env['DTONE_TEST_TRANSACTION_ENTID']

  const live = 'TRUE' === env.DTONE_TEST_LIVE

  if (live) {
    client = new DtoneSDK(merge([
      {
        apikey: env.DTONE_APIKEY,
        secret: env.DTONE_SECRET,
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
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
