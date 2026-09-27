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
(0, node_test_1.describe)('MobileNumberEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DTONE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DtoneSDK.test();
        const ent = testsdk.MobileNumber();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DTONE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'mobile_number.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "mobile_number": { "a": true, "h": "Mobile Number", "n": "mobile_number", "r": true, "sh": "Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.", "t": "`$STRING`", "key$": "mobile_number", "index$": 1 }, "page": { "a": true, "fo": "int32", "h": "Page", "n": "page", "r": false, "sh": "Page number", "t": "`$INTEGER`", "key$": "page", "index$": 2 }, "per_page": { "a": true, "fo": "int32", "h": "Per Page", "n": "per_page", "r": false, "sh": "Number of records per page", "t": "`$INTEGER`", "key$": "per_page", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "mobile_number", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /lookup/mobile-number", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/lookup/mobile-number", "q": {}, "r": {}, "s": [{ "lit": "lookup" }, { "lit": "mobile-number" }], "t": { "req": { "mobile_number": "`reqdata`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /lookup/mobile-number/{mobile_number}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "mobile_number", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 50, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/lookup/mobile-number/{mobile_number}", "q": { "exist": ["id", "page", "per_page"] }, "r": { "param": { "mobile_number": "id" } }, "s": [{ "lit": "lookup" }, { "lit": "mobile-number" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "mobile_number", "name__orig": "mobile_number", "Name": "MobileNumber", "name_": "mobile_number", "name-": "mobile-number", "NAME": "MOBILE_NUMBER", "index$": 6 }, { "active": true, "entity": "mobile_number", "key$": "BasicMobileNumberFlow", "kind": "basic", "name": "BasicMobileNumberFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "mobile_number_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "mobile_number_ref01", "srcdatavar": "mobile_number_ref01_data", "suffix": "_dt0" }, "m": { "id": "mobile_number01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-mobile_number_ref01" } }], "index$": 1 }] }, 'MobileNumber', { "POST /lookup/mobile-number": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "mobile_number": { "type": "string", "pattern": "^\\+[1-9][0-9]{6,14}$", "description": "Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.", "x-ref": "#/components/schemas/e164", "key$": "mobile_number" }, "page": { "description": "Page number", "type": "integer", "format": "int32", "minimum": 1, "default": 1, "key$": "page" }, "per_page": { "description": "Number of records per page", "type": "integer", "format": "int32", "minimum": 1, "maximum": 100, "default": 50, "key$": "per_page" } }, "required": ["mobile_number"], "index$": 1 } } } }, "parameters": [] }, "GET /lookup/mobile-number/{mobile_number}": { "protocol": "http", "parameters": [{ "name": "page", "description": "Page number.", "in": "query", "required": false, "schema": { "type": "integer", "format": "int32", "minimum": 1, "default": 1 }, "x-ref": "#/components/parameters/Page", "index$": 0 }, { "name": "per_page", "description": "Number of records per page.", "in": "query", "required": false, "schema": { "type": "integer", "format": "int32", "minimum": 1, "maximum": 100, "default": 50 }, "x-ref": "#/components/parameters/PerPage", "index$": 1 }, { "in": "path", "name": "mobile_number", "schema": { "type": "string", "pattern": "^\\+[1-9][0-9]{6,14}$", "description": "Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.", "x-ref": "#/components/schemas/e164" }, "required": true, "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const mobile_number_ref01_ent = client.MobileNumber();
        let mobile_number_ref01_data = setup.data.new.mobile_number['mobile_number_ref01'];
        mobile_number_ref01_data = (await mobile_number_ref01_ent.create(mobile_number_ref01_data)).data();
        (0, node_assert_1.default)(null != mobile_number_ref01_data.id);
        // LOAD
        const mobile_number_ref01_match_dt0 = {};
        mobile_number_ref01_match_dt0.id = mobile_number_ref01_data.id;
        const mobile_number_ref01_data_dt0 = (await mobile_number_ref01_ent.load(mobile_number_ref01_match_dt0)).data();
        (0, node_assert_1.default)(mobile_number_ref01_data_dt0.id === mobile_number_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/mobile_number/MobileNumberTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DtoneSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['mobile_number01', 'mobile_number02', 'mobile_number03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DTONE_TEST_MOBILE_NUMBER_ENTID': idmap,
        'DTONE_TEST_LIVE': 'FALSE',
        'DTONE_TEST_EXPLAIN': 'FALSE',
        'DTONE_APIKEY': '',
        'DTONE_SECRET': '',
    });
    idmap = env['DTONE_TEST_MOBILE_NUMBER_ENTID'];
    const live = 'TRUE' === env.DTONE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DTONE_TEST_MOBILE_NUMBER_ENTID'];
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
//# sourceMappingURL=MobileNumberEntity.test.js.map