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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CreditPartyStatusEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DTONE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DtoneSDK.test();
        const ent = testsdk.CreditPartyStatus();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DTONE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'credit_party_status.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "activation_date": { "a": true, "fo": "date-time", "h": "Activation Date", "n": "activation_date", "r": true, "sh": "A `null` value denotes that credit party has not yet been activated on the actual network", "t": "`$STRING`", "key$": "activation_date", "index$": 0 }, "credit_party_identifier": { "a": true, "h": "Credit Party Identifier", "n": "credit_party_identifier", "r": true, "t": "`$OBJECT`", "key$": "credit_party_identifier", "index$": 1 }, "installation_date": { "a": true, "fo": "date-time", "h": "Installation Date", "n": "installation_date", "r": true, "sh": "A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed", "t": "`$STRING`", "key$": "installation_date", "index$": 2 }, "service_id": { "a": true, "fo": "int32", "h": "Service Id", "n": "service_id", "r": true, "sh": "Service identifier.", "t": "`$INTEGER`", "key$": "service_id", "index$": 3 } }, "name": "credit_party_status", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /lookup/credit-party-status", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/lookup/credit-party-status", "q": {}, "r": {}, "s": [{ "lit": "lookup" }, { "lit": "credit-party-status" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "credit_party_status", "name__orig": "credit_party_status", "Name": "CreditPartyStatus", "name_": "credit_party_status", "name-": "credit-party-status", "NAME": "CREDIT_PARTY_STATUS", "index$": 5 }, { "active": true, "entity": "credit_party_status", "key$": "BasicCreditPartyStatusFlow", "kind": "basic", "name": "BasicCreditPartyStatusFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "credit_party_status_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'CreditPartyStatus', { "POST /lookup/credit-party-status": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "service_id": { "type": "integer", "format": "int32", "minimum": 1, "description": "Service identifier. See [Services](#tags/Services) for more details.", "x-ref": "#/components/schemas/service_id", "key$": "service_id" }, "credit_party_identifier": { "type": "object", "properties": { "mobile_number": { "type": "string", "pattern": "^\\+[1-9][0-9]{6,14}$", "description": "Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.", "x-ref": "#/components/schemas/e164" }, "account_number": { "type": "string", "minLength": 1, "maxLength": 90, "pattern": "\\S", "description": "Account number.", "x-ref": "#/components/schemas/account_number" }, "account_qualifier": { "type": "string", "minLength": 1, "pattern": "\\S", "x-ref": "#/components/schemas/non_empty_string" } }, "minProperties": 1, "key$": "credit_party_identifier" } }, "required": ["service_id", "credit_party_identifier"], "index$": 1 } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const credit_party_status_ref01_ent = client.CreditPartyStatus();
        let credit_party_status_ref01_data = setup.data.new.credit_party_status['credit_party_status_ref01'];
        credit_party_status_ref01_data = (await credit_party_status_ref01_ent.create(credit_party_status_ref01_data)).data();
        (0, node_assert_1.default)(null != credit_party_status_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/credit_party_status/CreditPartyStatusTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DtoneSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['credit_party_status01', 'credit_party_status02', 'credit_party_status03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DTONE_TEST_CREDIT_PARTY_STATUS_ENTID': idmap,
        'DTONE_TEST_LIVE': 'FALSE',
        'DTONE_TEST_EXPLAIN': 'FALSE',
        'DTONE_APIKEY': '',
        'DTONE_SECRET': '',
    });
    idmap = env['DTONE_TEST_CREDIT_PARTY_STATUS_ENTID'];
    const live = 'TRUE' === env.DTONE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DTONE_TEST_CREDIT_PARTY_STATUS_ENTID'];
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
//# sourceMappingURL=CreditPartyStatusEntity.test.js.map