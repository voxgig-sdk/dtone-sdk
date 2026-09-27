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
(0, node_test_1.describe)('StatementEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DTONE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DtoneSDK.test();
        const ent = testsdk.Statement();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DTONE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'statement.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "account_number": { "a": true, "h": "Account Number", "n": "account_number", "r": true, "sh": "Account number.", "t": "`$STRING`", "key$": "account_number", "index$": 0 }, "account_qualifier": { "a": true, "h": "Account Qualifier", "n": "account_qualifier", "r": false, "t": "`$STRING`", "key$": "account_qualifier", "index$": 1 }, "page": { "a": true, "fo": "int32", "h": "Page", "n": "page", "r": false, "sh": "Page number", "t": "`$INTEGER`", "key$": "page", "index$": 2 }, "per_page": { "a": true, "fo": "int32", "h": "Per Page", "n": "per_page", "r": false, "sh": "Number of records per page", "t": "`$INTEGER`", "key$": "per_page", "index$": 3 }, "product_id": { "a": true, "fo": "int32", "h": "Product Id", "n": "product_id", "r": true, "sh": "Product identifier.", "t": "`$INTEGER`", "key$": "product_id", "index$": 4 } }, "name": "statement", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /lookup/statement-inquiry", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/lookup/statement-inquiry", "q": {}, "r": {}, "s": [{ "lit": "lookup" }, { "lit": "statement-inquiry" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "statement", "name__orig": "statement", "Name": "Statement", "name_": "statement", "name-": "statement", "NAME": "STATEMENT", "index$": 11 }, { "active": true, "entity": "statement", "key$": "BasicStatementFlow", "kind": "basic", "name": "BasicStatementFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "statement_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Statement', { "POST /lookup/statement-inquiry": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "product_id": { "type": "integer", "format": "int32", "minimum": 1, "description": "Product identifier.", "x-ref": "#/components/schemas/product_id", "key$": "product_id" }, "account_number": { "type": "string", "minLength": 1, "maxLength": 90, "pattern": "\\S", "description": "Account number.", "x-ref": "#/components/schemas/account_number", "key$": "account_number" }, "account_qualifier": { "type": "string", "minLength": 1, "pattern": "\\S", "x-ref": "#/components/schemas/non_empty_string", "key$": "account_qualifier" }, "page": { "description": "Page number", "type": "integer", "format": "int32", "minimum": 1, "default": 1, "key$": "page" }, "per_page": { "description": "Number of records per page", "type": "integer", "format": "int32", "minimum": 1, "maximum": 100, "default": 50, "key$": "per_page" } }, "required": ["product_id", "account_number"], "index$": 1 } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const statement_ref01_ent = client.Statement();
        let statement_ref01_data = setup.data.new.statement['statement_ref01'];
        statement_ref01_data = (await statement_ref01_ent.create(statement_ref01_data)).data();
        (0, node_assert_1.default)(null != statement_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/statement/StatementTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DtoneSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['statement01', 'statement02', 'statement03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DTONE_TEST_STATEMENT_ENTID': idmap,
        'DTONE_TEST_LIVE': 'FALSE',
        'DTONE_TEST_EXPLAIN': 'FALSE',
        'DTONE_APIKEY': '',
        'DTONE_SECRET': '',
    });
    idmap = env['DTONE_TEST_STATEMENT_ENTID'];
    const live = 'TRUE' === env.DTONE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DTONE_TEST_STATEMENT_ENTID'];
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
//# sourceMappingURL=StatementEntity.test.js.map