# Dtone JavaScript SDK Reference

Complete API reference for the Dtone JavaScript SDK.


## DtoneSDK

### Constructor

```ts
new DtoneSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DtoneSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = DtoneSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `DtoneSDK` instance in test mode.


### Instance Methods

#### `Balance(data?: object)`

Create a new `Balance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BalanceEntity` instance.

#### `BenefitType(data?: object)`

Create a new `BenefitType` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BenefitTypeEntity` instance.

#### `Campaign(data?: object)`

Create a new `Campaign` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CampaignEntity` instance.

#### `Country(data?: object)`

Create a new `Country` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CountryEntity` instance.

#### `CreditPartyBenefit(data?: object)`

Create a new `CreditPartyBenefit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreditPartyBenefitEntity` instance.

#### `CreditPartyStatus(data?: object)`

Create a new `CreditPartyStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreditPartyStatusEntity` instance.

#### `MobileNumberLookup(data?: object)`

Create a new `MobileNumberLookup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MobileNumberLookupEntity` instance.

#### `Operator(data?: object)`

Create a new `Operator` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OperatorEntity` instance.

#### `Product(data?: object)`

Create a new `Product` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductEntity` instance.

#### `Promotion(data?: object)`

Create a new `Promotion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PromotionEntity` instance.

#### `Service(data?: object)`

Create a new `Service` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ServiceEntity` instance.

#### `StatementInquiry(data?: object)`

Create a new `StatementInquiry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatementInquiryEntity` instance.

#### `Transaction(data?: object)`

Create a new `Transaction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TransactionEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `DtoneSDK.test()`.

**Returns:** `DtoneSDK` instance in test mode.


---

## BalanceEntity

```ts
const balance = client.Balance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `number` | Yes |  |
| `credit_limit` | `number` | Yes |  |
| `holding` | `number` | Yes |  |
| `id` | `number` | Yes |  |
| `unit` | `string` | Yes |  |
| `unit_type` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Balance().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BalanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BenefitTypeEntity

```ts
const benefit_type = client.BenefitType()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BenefitType().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BenefitTypeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CampaignEntity

```ts
const campaign = client.Campaign()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `end_date` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `products` | `Array` | Yes |  |
| `start_date` | `string` | Yes |  |
| `terms` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Campaign().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Campaign().load({ campaign_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CampaignEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CountryEntity

```ts
const country = client.Country()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso_code` | `string` | Yes | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` | `string` | Yes |  |
| `regions` | `Array` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Country().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Country().load({ country_iso_code: 'country_iso_code' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CountryEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreditPartyBenefitEntity

```ts
const credit_party_benefit = client.CreditPartyBenefit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes | Remaining benefit amount. |
| `country` | `Object` | Yes |  |
| `credit_party_identifier` | `Object` | Yes |  |
| `expiration_date` | `string` | Yes | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | `number` | No | Page number |
| `per_page` | `number` | No | Number of records per page |
| `service_id` | `number` | Yes | Service identifier. |
| `type` | `string` | Yes |  |
| `unit` | `string` | Yes |  |
| `unit_type` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CreditPartyBenefit().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreditPartyBenefitEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreditPartyStatusEntity

```ts
const credit_party_status = client.CreditPartyStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation_date` | `string` | Yes | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` | `Object` | Yes |  |
| `installation_date` | `string` | Yes | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | `number` | Yes | Service identifier. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CreditPartyStatus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreditPartyStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MobileNumberLookupEntity

```ts
const mobile_number_lookup = client.MobileNumberLookup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `Object` | Yes |  |
| `id` | `number` | Yes | Operator identifier. |
| `identified` | `boolean` | Yes | Indicates whether operator was identified as a direct match |
| `mobile_number` | `string` | Yes | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` | `string` | Yes |  |
| `page` | `number` | No | Page number |
| `per_page` | `number` | No | Number of records per page |
| `regions` | `Array` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MobileNumberLookup().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MobileNumberLookupEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OperatorEntity

```ts
const operator = client.Operator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `Object` | Yes |  |
| `id` | `number` | Yes | Operator identifier. |
| `name` | `string` | Yes |  |
| `regions` | `Array` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Operator().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Operator().load({ operator_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OperatorEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductEntity

```ts
const product = client.Product()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Product().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Product().load({ product_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PromotionEntity

```ts
const promotion = client.Promotion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `end_date` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `operator` | `Object` | Yes |  |
| `products` | `Array` | Yes |  |
| `start_date` | `string` | Yes |  |
| `terms` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Promotion().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Promotion().load({ promotion_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PromotionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ServiceEntity

```ts
const service = client.Service()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | Yes | Service identifier. |
| `name` | `string` | Yes |  |
| `subservices` | `Array` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Service().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Service().load({ service_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ServiceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatementInquiryEntity

```ts
const statement_inquiry = client.StatementInquiry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `string` | Yes | Account number. |
| `account_qualifier` | `string` | No |  |
| `balance` | `Object` | Yes |  |
| `dates` | `Object` | Yes |  |
| `page` | `number` | No | Page number |
| `per_page` | `number` | No | Number of records per page |
| `product_id` | `number` | Yes | Product identifier. |
| `reference` | `*` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.StatementInquiry().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatementInquiryEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TransactionEntity

```ts
const transaction = client.Transaction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additional_identifier` | `Object` | No | Additional details for a transaction. |
| `adjusted_values` | `Object` | No |  |
| `auto_confirm` | `boolean` | No | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | `Object` | No | Beneficiary details for a transaction. |
| `benefits` | `Array` | No |  |
| `calculation_mode` | `*` | No |  |
| `callback_url` | `string` | No | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` | `string` | No |  |
| `confirmation_expiration_date` | `string` | No |  |
| `creation_date` | `string` | No |  |
| `credit_party_identifier` | `Object` | No | Receiving account details for a transaction. |
| `debit_party_identifier` | `Object` | No | Sending account details for a transaction. |
| `destination` | `Object` | Yes | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `metadata` | `Object` | No | Optional metadata related to the transaction. |
| `operator_reference` | `string` | No |  |
| `pin` | `Object` | Yes |  |
| `prices` | `Object` | Yes |  |
| `product` | `*` | No |  |
| `product_id` | `string` | Yes |  |
| `promotions` | `Array` | No |  |
| `rates` | `*` | No |  |
| `requested_values` | `Object` | No |  |
| `sender` | `Object` | No | Sender details for a transaction. |
| `source` | `Object` | Yes | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | `Object` | No | Qualifying statement details for a payment transaction. |
| `status` | `Object` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Transaction().create({
  destination: {},
  external_id: 'example_external_id',
  pin: {},
  prices: {},
  product_id: 'example_product_id',
  source: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Transaction().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Transaction().load({ transaction_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Transaction().update({
  transaction_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TransactionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DtoneSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new DtoneSDK({
  feature: {
    test: { active: true },
  }
})
```

