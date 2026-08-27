
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


describe('TransactionEntity', async () => {

  test('instance', async () => {
    const testsdk = DtoneSDK.test()
    const ent = testsdk.Transaction()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
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
    const transaction_ref01_match = {}

    const transaction_ref01_list = (await transaction_ref01_ent.list(transaction_ref01_match)).map((e) => e.data())

    assert(!isempty(select(transaction_ref01_list, { id: transaction_ref01_data.id })))


    // UPDATE
    const transaction_ref01_data_up0 = {}
    transaction_ref01_data_up0.id = transaction_ref01_data.id

    const transaction_ref01_markdef_up0 = { name: 'callback_url', value: 'Mark01-transaction_ref01_' + setup.now }
    transaction_ref01_data_up0 [transaction_ref01_markdef_up0.name] = transaction_ref01_markdef_up0.value

    const transaction_ref01_resdata_up0 = (await transaction_ref01_ent.update(transaction_ref01_data_up0)).data()
    assert(transaction_ref01_resdata_up0.id === transaction_ref01_data_up0.id)

    assert(transaction_ref01_resdata_up0[transaction_ref01_markdef_up0.name] === transaction_ref01_markdef_up0.value)


    // LOAD
    const transaction_ref01_match_dt0 = {}
    transaction_ref01_match_dt0.id = transaction_ref01_data.id
    const transaction_ref01_data_dt0 = (await transaction_ref01_ent.load(transaction_ref01_match_dt0)).data()
    assert(transaction_ref01_data_dt0.id === transaction_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

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

  const env = envOverride({
    'DTONE_TEST_TRANSACTION_ENTID': idmap,
    'DTONE_TEST_LIVE': 'FALSE',
    'DTONE_TEST_EXPLAIN': 'FALSE',
    'DTONE_APIKEY': 'NONE',
  })

  idmap = env['DTONE_TEST_TRANSACTION_ENTID']

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
  
