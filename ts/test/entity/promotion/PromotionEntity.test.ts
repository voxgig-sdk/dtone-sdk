

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":true,"type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"end_date","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"id","req":true,"type":"`$INTEGER`","index$":2},{"active":true,"name":"operator","req":true,"type":"`$OBJECT`","index$":3},{"active":true,"name":"products","req":true,"type":"`$ARRAY`","index$":4},{"active":true,"format":"date-time","name":"start_date","req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"terms","req":true,"type":"`$STRING`","index$":6},{"active":true,"name":"title","req":true,"type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"promotion","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"header":[{"active":true,"example":"es","kind":"header","name":"accept_language","orig":"accept_language","reqd":false,"type":"`$STRING`"}],"query":[{"active":true,"kind":"query","name":"country_iso_code","orig":"country_iso_code","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"operator_id","orig":"operator_id","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":50,"kind":"query","name":"per_page","orig":"per_page","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"product_id","orig":"product_id","reqd":false,"type":"`$INTEGER`","index$":4}]},"contract":{"id":"GET /promotions","json":"{\"operationId\":\"getPromotions\",\"parameters\":[{\"description\":\"Preferred language for the content\",\"in\":\"header\",\"name\":\"Accept-Language\",\"schema\":{\"example\":\"es\",\"type\":\"string\"}},{\"description\":\"Page number.\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"format\":\"int32\",\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of records per page.\",\"in\":\"query\",\"name\":\"per_page\",\"required\":false,\"schema\":{\"default\":50,\"format\":\"int32\",\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"country_iso_code\",\"required\":false,\"schema\":{\"description\":\"Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.\",\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"operator_id\",\"required\":false,\"schema\":{\"description\":\"Operator identifier.\",\"format\":\"int32\",\"minimum\":1,\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"product_id\",\"required\":false,\"schema\":{\"description\":\"Product identifier.\",\"format\":\"int32\",\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"description\":{\"type\":\"string\"},\"end_date\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"operator\":{\"properties\":{\"country\":{\"properties\":{\"iso_code\":{\"description\":\"Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.\",\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"name\",\"iso_code\"],\"type\":\"object\"},\"id\":{\"description\":\"Operator identifier.\",\"format\":\"int32\",\"minimum\":1,\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"country\"],\"type\":\"object\"},\"products\":{\"items\":{\"properties\":{\"description\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"type\":{\"enum\":[\"FIXED_VALUE_RECHARGE\",\"RANGED_VALUE_RECHARGE\",\"FIXED_VALUE_PIN_PURCHASE\",\"RANGED_VALUE_PIN_PURCHASE\",\"RANGED_VALUE_PAYMENT\"],\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"description\",\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"start_date\":{\"format\":\"date-time\",\"type\":\"string\"},\"terms\":{\"nullable\":true,\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"required\":[\"id\",\"title\",\"description\",\"terms\",\"start_date\",\"end_date\",\"operator\",\"products\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"successful operation\",\"headers\":{\"Content-Language\":{\"description\":\"Language of the returned content\",\"schema\":{\"example\":\"es\",\"type\":\"string\"}},\"Vary\":{\"description\":\"List of request header fields influencing response content\",\"schema\":{\"example\":\"Accept-Language\",\"type\":\"string\"}},\"X-Next-Page\":{\"description\":\"Next page number (if any).\",\"schema\":{\"type\":\"integer\"}},\"X-Page\":{\"description\":\"Current page number.\",\"schema\":{\"type\":\"integer\"}},\"X-Per-Page\":{\"description\":\"Number of records per page\",\"schema\":{\"type\":\"integer\"}},\"X-Prev-Page\":{\"description\":\"Previous page number (if any).\",\"schema\":{\"type\":\"integer\"}},\"X-Total\":{\"description\":\"Total number of records.\",\"schema\":{\"type\":\"integer\"}},\"X-Total-Pages\":{\"description\":\"Total number of pages.\",\"schema\":{\"type\":\"integer\"}}}},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"errors\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"errors\"],\"type\":\"object\"}}},\"description\":\"default error response\"}},\"security\":[{\"BasicAuth\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"The Digital Value Services API requires requests to be authenticated through individualized API keys. You can view and manage your API keys in [DT Shop](https://dtshop.dtone.com/).\\n\\nYour API keys carry many privileges, so please keep them secure! Do not share your secret API keys in publicly-accessible areas such as [GitHub](https://github.com/), client-side code, and so forth.\\n\\nAuthentication to the API is performed via [HTTP Basic Auth](https://tools.ietf.org/html/rfc7235). Provide your API key as the basic auth username value and your API secret as your password.\\n\\nExcept when site-to-site VPN is set up, all API requests must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure) with TLS 1.2.\\n\\nOn a side note, we strongly recommend securing your applications against common security flaws by employing best practices such as the [OWASP Top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project).\\n\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/promotions","segments":[{"lit":"promotions"}],"select":{"exist":["accept_language","country_iso_code","operator_id","page","per_page","product_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"header":[{"active":true,"example":"es","kind":"header","name":"accept_language","orig":"accept_language","reqd":false,"type":"`$STRING`"}],"params":[{"active":true,"kind":"param","name":"promotion_id","orig":"promotion_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /promotions/{promotion_id}","json":"{\"operationId\":\"getPromotionById\",\"parameters\":[{\"description\":\"Preferred language for the content\",\"in\":\"header\",\"name\":\"Accept-Language\",\"schema\":{\"example\":\"es\",\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"promotion_id\",\"required\":true,\"schema\":{\"description\":\"Promotion identifier.\",\"format\":\"int32\",\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"description\":{\"type\":\"string\"},\"end_date\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"operator\":{\"properties\":{\"country\":{\"properties\":{\"iso_code\":{\"description\":\"Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.\",\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"name\",\"iso_code\"],\"type\":\"object\"},\"id\":{\"description\":\"Operator identifier.\",\"format\":\"int32\",\"minimum\":1,\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"country\"],\"type\":\"object\"},\"products\":{\"items\":{\"properties\":{\"description\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"type\":{\"enum\":[\"FIXED_VALUE_RECHARGE\",\"RANGED_VALUE_RECHARGE\",\"FIXED_VALUE_PIN_PURCHASE\",\"RANGED_VALUE_PIN_PURCHASE\",\"RANGED_VALUE_PAYMENT\"],\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"description\",\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"start_date\":{\"format\":\"date-time\",\"type\":\"string\"},\"terms\":{\"nullable\":true,\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"required\":[\"id\",\"title\",\"description\",\"terms\",\"start_date\",\"end_date\",\"operator\",\"products\"],\"type\":\"object\"}}},\"description\":\"successful operation\",\"headers\":{\"Content-Language\":{\"description\":\"Language of the returned content\",\"schema\":{\"example\":\"es\",\"type\":\"string\"}},\"Vary\":{\"description\":\"List of request header fields influencing response content\",\"schema\":{\"example\":\"Accept-Language\",\"type\":\"string\"}}}},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"errors\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"errors\"],\"type\":\"object\"}}},\"description\":\"Promotion not found\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"errors\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"errors\"],\"type\":\"object\"}}},\"description\":\"default error response\"}},\"security\":[{\"BasicAuth\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"The Digital Value Services API requires requests to be authenticated through individualized API keys. You can view and manage your API keys in [DT Shop](https://dtshop.dtone.com/).\\n\\nYour API keys carry many privileges, so please keep them secure! Do not share your secret API keys in publicly-accessible areas such as [GitHub](https://github.com/), client-side code, and so forth.\\n\\nAuthentication to the API is performed via [HTTP Basic Auth](https://tools.ietf.org/html/rfc7235). Provide your API key as the basic auth username value and your API secret as your password.\\n\\nExcept when site-to-site VPN is set up, all API requests must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure) with TLS 1.2.\\n\\nOn a side note, we strongly recommend securing your applications against common security flaws by employing best practices such as the [OWASP Top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project).\\n\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/promotions/{promotion_id}","segments":[{"lit":"promotions"},{"var":"promotion_id"}],"select":{"exist":["accept_language","promotion_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["promotion"]]},"key$":"promotion","name__orig":"promotion","Name":"Promotion","name_":"promotion","name-":"promotion","NAME":"PROMOTION","index$":9}, {"active":true,"entity":"promotion","key$":"BasicPromotionFlow","kind":"basic","name":"BasicPromotionFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"promotion_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"promotion_ref01","srcdatavar":"promotion_ref01_data","suffix":"_dt0"},"match":{"id":"promotion01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-promotion_ref01"}}],"index$":1}]}, 'Promotion')
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
    ['promotion01','promotion02','promotion03','promotion01','promotion02','promotion03'],
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
  
