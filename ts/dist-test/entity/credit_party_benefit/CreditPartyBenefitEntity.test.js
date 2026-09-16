"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CreditPartyBenefitEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DTONE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DtoneSDK.test();
        const ent = testsdk.CreditPartyBenefit();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DTONE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'credit_party_benefit.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "double", "name": "amount", "req": true, "short": "Remaining benefit amount.", "type": "`$NUMBER`", "index$": 0 }, { "active": true, "name": "country", "req": true, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "credit_party_identifier", "req": true, "type": "`$OBJECT`", "index$": 2 }, { "active": true, "format": "date-time", "name": "expiration_date", "req": true, "short": "A `null` value denotes either no expiration applies or that the product benefit has not yet been activated.", "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "int32", "name": "page", "req": false, "short": "Page number", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "format": "int32", "name": "per_page", "req": false, "short": "Number of records per page", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "format": "int32", "name": "service_id", "req": true, "short": "Service identifier.", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "type", "req": true, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "unit", "req": true, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "unit_type", "req": true, "type": "`$STRING`", "index$": 9 }], "name": "credit_party_benefit", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /lookup/credit-party-benefits", "json": "{\"operationId\":\"postLookupCreditPartyBenefits\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credit_party_identifier\":{\"minProperties\":1,\"properties\":{\"account_number\":{\"description\":\"Account number.\",\"maxLength\":90,\"minLength\":1,\"pattern\":\"\\\\S\",\"type\":\"string\"},\"account_qualifier\":{\"minLength\":1,\"pattern\":\"\\\\S\",\"type\":\"string\"},\"mobile_number\":{\"description\":\"Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.\",\"pattern\":\"^\\\\+[1-9][0-9]{6,14}$\",\"type\":\"string\"}},\"type\":\"object\"},\"page\":{\"default\":1,\"description\":\"Page number\",\"format\":\"int32\",\"minimum\":1,\"type\":\"integer\"},\"per_page\":{\"default\":50,\"description\":\"Number of records per page\",\"format\":\"int32\",\"maximum\":100,\"minimum\":1,\"type\":\"integer\"},\"service_id\":{\"description\":\"Service identifier. See [Services](#tags/Services) for more details.\",\"format\":\"int32\",\"minimum\":1,\"type\":\"integer\"}},\"required\":[\"service_id\",\"credit_party_identifier\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"amount\":{\"default\":0,\"description\":\"Remaining benefit amount. A value of `-1` indicates an unlimited benefit (e.g. unlimited data, calls, or SMS).\",\"format\":\"double\",\"type\":\"number\"},\"country\":{\"additionalProperties\":false,\"properties\":{\"iso_code\":{\"description\":\"Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.\",\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"regions\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"description\":\"Country subregion code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.\",\"pattern\":\"^[A-Z]{2,3}(?:-[A-Z0-9]{2,3}(?:-[A-Z]{2})?)?$\",\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"name\",\"code\"],\"type\":\"object\"},\"nullable\":true,\"type\":\"array\"}},\"required\":[\"name\",\"iso_code\",\"regions\"],\"type\":\"object\"},\"expiration_date\":{\"description\":\"A `null` value denotes either no expiration applies or that the product benefit has not yet been activated.\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"type\":{\"enum\":[\"TALKTIME\",\"DATA\",\"SMS\",\"PAYMENT\",\"CREDITS\"],\"type\":\"string\"},\"unit\":{\"type\":\"string\"},\"unit_type\":{\"enum\":[\"TIME\",\"DATA\",\"QUANTITY\",\"CURRENCY\"],\"type\":\"string\"}},\"required\":[\"type\",\"unit_type\",\"unit\",\"amount\",\"expiration_date\",\"country\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"successful operation\",\"headers\":{\"X-Next-Page\":{\"description\":\"Next page number (if any).\",\"schema\":{\"type\":\"integer\"}},\"X-Page\":{\"description\":\"Current page number.\",\"schema\":{\"type\":\"integer\"}},\"X-Per-Page\":{\"description\":\"Number of records per page\",\"schema\":{\"type\":\"integer\"}},\"X-Prev-Page\":{\"description\":\"Previous page number (if any).\",\"schema\":{\"type\":\"integer\"}},\"X-Total\":{\"description\":\"Total number of records.\",\"schema\":{\"type\":\"integer\"}},\"X-Total-Pages\":{\"description\":\"Total number of pages.\",\"schema\":{\"type\":\"integer\"}}}},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"errors\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"errors\"],\"type\":\"object\"}}},\"description\":\"default error response\"}},\"security\":[{\"BasicAuth\":[]}],\"securitySchemes\":{\"BasicAuth\":{\"description\":\"The Digital Value Services API requires requests to be authenticated through individualized API keys. You can view and manage your API keys in [DT Shop](https://dtshop.dtone.com/).\\n\\nYour API keys carry many privileges, so please keep them secure! Do not share your secret API keys in publicly-accessible areas such as [GitHub](https://github.com/), client-side code, and so forth.\\n\\nAuthentication to the API is performed via [HTTP Basic Auth](https://tools.ietf.org/html/rfc7235). Provide your API key as the basic auth username value and your API secret as your password.\\n\\nExcept when site-to-site VPN is set up, all API requests must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure) with TLS 1.2.\\n\\nOn a side note, we strongly recommend securing your applications against common security flaws by employing best practices such as the [OWASP Top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project).\\n\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/lookup/credit-party-benefits", "segments": [{ "lit": "lookup" }, { "lit": "credit-party-benefits" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "credit_party_benefit", "name__orig": "credit_party_benefit", "Name": "CreditPartyBenefit", "name_": "credit_party_benefit", "name-": "credit-party-benefit", "NAME": "CREDIT_PARTY_BENEFIT", "index$": 4 }, { "active": true, "entity": "credit_party_benefit", "key$": "BasicCreditPartyBenefitFlow", "kind": "basic", "name": "BasicCreditPartyBenefitFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "credit_party_benefit_ref01" } }], "index$": 0 }] }, 'CreditPartyBenefit');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let credit_party_benefit_ref01_data = Object.values(setup.data.existing.credit_party_benefit)[0];
        // LIST
        const credit_party_benefit_ref01_ent = client.CreditPartyBenefit();
        const credit_party_benefit_ref01_match = {};
        const credit_party_benefit_ref01_list = (await credit_party_benefit_ref01_ent.list(credit_party_benefit_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/credit_party_benefit/CreditPartyBenefitTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DtoneSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['credit_party_benefit01', 'credit_party_benefit02', 'credit_party_benefit03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DTONE_TEST_CREDIT_PARTY_BENEFIT_ENTID': idmap,
        'DTONE_TEST_LIVE': 'FALSE',
        'DTONE_TEST_EXPLAIN': 'FALSE',
        'DTONE_APIKEY': '',
        'DTONE_SECRET': '',
    });
    idmap = env['DTONE_TEST_CREDIT_PARTY_BENEFIT_ENTID'];
    const live = 'TRUE' === env.DTONE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DTONE_TEST_CREDIT_PARTY_BENEFIT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DtoneSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=CreditPartyBenefitEntity.test.js.map