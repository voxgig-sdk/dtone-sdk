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
(0, node_test_1.describe)('ProductEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DTONE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DTONE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DtoneSDK.test();
        const ent = testsdk.Product();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DTONE_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'product.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "product", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /products", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "es", "k": "header", "n": "accept_language", "or": "accept_language", "r": false, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "benefit_type", "or": "benefit_type", "r": false, "t": "`$ARRAY`", "index$": 0 }, { "a": true, "k": "query", "n": "country_iso_code", "or": "country_iso_code", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "operator_id", "or": "operator_id", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 50, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "region", "or": "region", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "service_id", "or": "service_id", "r": false, "t": "`$INTEGER`", "index$": 6 }, { "a": true, "ex": "name", "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "k": "query", "n": "subservice_id", "or": "subservice_id", "r": false, "t": "`$INTEGER`", "index$": 8 }, { "a": true, "k": "query", "n": "tag", "or": "tag", "r": false, "t": "`$ARRAY`", "index$": 9 }, { "a": true, "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 10 }] }, "k": "http", "m": "GET", "o": "/products", "q": { "exist": ["accept_language", "benefit_type", "country_iso_code", "operator_id", "page", "per_page", "region", "service_id", "sort", "subservice_id", "tag", "type"] }, "r": {}, "s": [{ "lit": "products" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /products/{product_id}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "es", "k": "header", "n": "accept_language", "or": "accept_language", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "product_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/products/{product_id}", "q": { "exist": ["accept_language", "id"] }, "r": { "param": { "product_id": "id" } }, "s": [{ "lit": "products" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "product", "name__orig": "product", "Name": "Product", "name_": "product", "name-": "product", "NAME": "PRODUCT", "index$": 8 }, { "active": true, "entity": "product", "key$": "BasicProductFlow", "kind": "basic", "name": "BasicProductFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "product_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "product_ref01", "srcdatavar": "product_ref01_data", "suffix": "_dt0" }, "m": { "id": "product01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-product_ref01" } }], "index$": 1 }] }, 'Product', { "GET /products": { "protocol": "http", "parameters": [{ "name": "Accept-Language", "description": "Preferred language for the content", "in": "header", "schema": { "type": "string", "example": "es" }, "x-ref": "#/components/parameters/Accept-Language", "index$": 0 }, { "name": "type", "in": "query", "required": false, "schema": { "type": "string", "enum": ["FIXED_VALUE_RECHARGE", "RANGED_VALUE_RECHARGE", "FIXED_VALUE_PIN_PURCHASE", "RANGED_VALUE_PIN_PURCHASE", "RANGED_VALUE_PAYMENT"], "x-ref": "#/components/schemas/product_types" }, "index$": 1 }, { "name": "service_id", "in": "query", "required": false, "description": "Service identifier. See [Services](#tags/Services) for more details. Required when `subservice_id` is specified.", "schema": { "type": "integer", "format": "int32", "minimum": 1, "description": "Service identifier. See [Services](#tags/Services) for more details.", "x-ref": "#/components/schemas/service_id" }, "index$": 2 }, { "name": "subservice_id", "in": "query", "required": false, "schema": { "type": "integer", "format": "int32", "minimum": 1, "description": "Sub-service identifier. See [Services](#tags/Services) for more details.", "x-ref": "#/components/schemas/subservice_id" }, "index$": 3 }, { "name": "tags", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string", "minLength": 4, "maxLength": 16, "pattern": "^[A-Z0-9_]+", "description": "Product tag.", "x-ref": "#/components/schemas/product_tag" }, "minItems": 1, "uniqueItems": true }, "style": "form", "explode": false, "index$": 4 }, { "name": "country_iso_code", "in": "query", "required": false, "schema": { "type": "string", "pattern": "^[A-Z]{3}$", "description": "Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.", "x-ref": "#/components/schemas/x-iso-3166-1_alpha-3" }, "index$": 5 }, { "name": "operator_id", "in": "query", "required": false, "schema": { "type": "integer", "format": "int32", "minimum": 1, "description": "Operator identifier.", "x-ref": "#/components/schemas/operator_id" }, "index$": 6 }, { "name": "region", "in": "query", "required": false, "schema": { "type": "string", "pattern": "^[A-Z]{2,3}(?:-[A-Z0-9]{2,3}(?:-[A-Z]{2})?)?$", "description": "Country subregion code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.", "x-ref": "#/components/schemas/x-iso-3166-2" }, "index$": 7 }, { "name": "benefit_types", "in": "query", "required": false, "schema": { "type": "array", "items": { "type": "string", "enum": ["TALKTIME", "DATA", "SMS", "PAYMENT", "CREDITS"], "x-ref": "#/components/schemas/benefit_types" }, "uniqueItems": true }, "style": "form", "explode": false, "index$": 8 }, { "name": "sort", "in": "query", "required": false, "schema": { "type": "string", "pattern": "^(-)?[a-zA-Z0-9_]+(\\s*,\\s*(-)?[a-zA-Z0-9_]+)*$", "description": "Sort results by supported fields: id (default), name or amount. Pass the dash operator (-) for descending direction. Default is ascending. Multiple fields can be separated by a comma. Examples: \"sort=name\" sort by name in ascending manner. \"sort=-amount\" sort by destination amount in descending manner. \"sort=amount,name\" sort by amount and then by name\n", "example": "name", "x-ref": "#/components/schemas/product_sort" }, "index$": 9 }, { "name": "page", "description": "Page number.", "in": "query", "required": false, "schema": { "type": "integer", "format": "int32", "minimum": 1, "default": 1 }, "x-ref": "#/components/parameters/Page", "index$": 10 }, { "name": "per_page", "description": "Number of records per page.", "in": "query", "required": false, "schema": { "type": "integer", "format": "int32", "minimum": 1, "maximum": 100, "default": 50 }, "x-ref": "#/components/parameters/PerPage", "index$": 11 }] }, "GET /products/{product_id}": { "protocol": "http", "parameters": [{ "name": "Accept-Language", "description": "Preferred language for the content", "in": "header", "schema": { "type": "string", "example": "es" }, "x-ref": "#/components/parameters/Accept-Language", "index$": 0 }, { "name": "product_id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int32", "minimum": 1, "description": "Product identifier.", "x-ref": "#/components/schemas/product_id" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let product_ref01_data = Object.values(setup.data.existing.product)[0];
        // LIST
        const product_ref01_ent = client.Product();
        const product_ref01_match = {};
        const product_ref01_list = (await product_ref01_ent.list(product_ref01_match)).map((e) => e.data());
        // LOAD
        const product_ref01_match_dt0 = {};
        product_ref01_match_dt0.id = product_ref01_data.id;
        const product_ref01_data_dt0 = (await product_ref01_ent.load(product_ref01_match_dt0)).data();
        (0, node_assert_1.default)(product_ref01_data_dt0.id === product_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/product/ProductTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DtoneSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['product01', 'product02', 'product03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DTONE_TEST_PRODUCT_ENTID': idmap,
        'DTONE_TEST_LIVE': 'FALSE',
        'DTONE_TEST_EXPLAIN': 'FALSE',
        'DTONE_APIKEY': '',
        'DTONE_SECRET': '',
    });
    idmap = env['DTONE_TEST_PRODUCT_ENTID'];
    const live = 'TRUE' === env.DTONE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DTONE_TEST_PRODUCT_ENTID'];
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
//# sourceMappingURL=ProductEntity.test.js.map