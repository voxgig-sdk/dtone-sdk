# Dtone TypeScript SDK



The TypeScript SDK for the Dtone API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Balance()` — each with a small set of operations (`list`, `load`, `create`, `update`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/dtone-sdk/releases](https://github.com/voxgig-sdk/dtone-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DtoneSDK } from '@voxgig-sdk/dtone'

const client = new DtoneSDK({
  apikey: process.env.DTONE_APIKEY,
  secret: process.env.DTONE_SECRET,
})
```

### 2. List balance records

`list()` resolves to an array of Balance ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const balances = await client.Balance().list()

for (const balance of balances) {
  console.log(balance)
}
```

### 3. Load a campaign

Campaign is nested under campaign, so provide the `campaign_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const campaign = await client.Campaign().load({
    campaign_id: 1,
  })
  console.log(campaign)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const balances = await client.Balance().list()
  console.log(balances)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DtoneSDK.test()

const balance = await client.Balance().list()
// balance is the entity, populated with mock response data
// — call balance.data() for the record itself
console.log(balance)
```

You can also use the instance method:

```ts
const client = new DtoneSDK({ apikey: '...', secret: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Balance()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DtoneSDK({
  apikey: '...',
  secret: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DTONE_TEST_LIVE=TRUE
DTONE_APIKEY=<your-key>
DTONE_SECRET=<your-secret>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### DtoneSDK

#### Constructor

```ts
new DtoneSDK(options?: {
  apikey?: string
  secret?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `secret` | `string` | API secret for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Balance(data?)` | `BalanceEntity` | Create a Balance entity instance. |
| `BenefitType(data?)` | `BenefitTypeEntity` | Create a BenefitType entity instance. |
| `Campaign(data?)` | `CampaignEntity` | Create a Campaign entity instance. |
| `Country(data?)` | `CountryEntity` | Create a Country entity instance. |
| `CreditPartyBenefit(data?)` | `CreditPartyBenefitEntity` | Create a CreditPartyBenefit entity instance. |
| `CreditPartyStatus(data?)` | `CreditPartyStatusEntity` | Create a CreditPartyStatus entity instance. |
| `MobileNumberLookup(data?)` | `MobileNumberLookupEntity` | Create a MobileNumberLookup entity instance. |
| `Operator(data?)` | `OperatorEntity` | Create an Operator entity instance. |
| `Product(data?)` | `ProductEntity` | Create a Product entity instance. |
| `Promotion(data?)` | `PromotionEntity` | Create a Promotion entity instance. |
| `Service(data?)` | `ServiceEntity` | Create a Service entity instance. |
| `StatementInquiry(data?)` | `StatementInquiryEntity` | Create a StatementInquiry entity instance. |
| `Transaction(data?)` | `TransactionEntity` | Create a Transaction entity instance. |
| `tester(testopts?, sdkopts?)` | `DtoneSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DtoneSDK.test(testopts?, sdkopts?)` | `DtoneSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DtoneSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Balance

| Field | Description |
| --- | --- |
| `available` |  |
| `credit_limit` |  |
| `holding` |  |
| `id` |  |
| `unit` |  |
| `unit_type` |  |

Operations: list.

API path: `/balances`

#### BenefitType

| Field | Description |
| --- | --- |
| `name` |  |

Operations: list.

API path: `/benefit-types`

#### Campaign

| Field | Description |
| --- | --- |
| `description` |  |
| `end_date` |  |
| `id` |  |
| `products` |  |
| `start_date` |  |
| `terms` |  |
| `title` |  |

Operations: list, load.

API path: `/campaigns`

#### Country

| Field | Description |
| --- | --- |
| `iso_code` | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` |  |
| `regions` |  |

Operations: list, load.

API path: `/countries`

#### CreditPartyBenefit

| Field | Description |
| --- | --- |
| `amount` | Remaining benefit amount. |
| `country` |  |
| `credit_party_identifier` |  |
| `expiration_date` | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | Page number |
| `per_page` | Number of records per page |
| `service_id` | Service identifier. |
| `type` |  |
| `unit` |  |
| `unit_type` |  |

Operations: list.

API path: `/lookup/credit-party-benefits`

#### CreditPartyStatus

| Field | Description |
| --- | --- |
| `activation_date` | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` |  |
| `installation_date` | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | Service identifier. |

Operations: load.

API path: `/lookup/credit-party-status`

#### MobileNumberLookup

| Field | Description |
| --- | --- |
| `country` |  |
| `id` | Operator identifier. |
| `identified` | Indicates whether operator was identified as a direct match |
| `mobile_number` | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` |  |
| `page` | Page number |
| `per_page` | Number of records per page |
| `regions` |  |

Operations: list.

API path: `/lookup/mobile-number/{mobile_number}`

#### Operator

| Field | Description |
| --- | --- |
| `country` |  |
| `id` | Operator identifier. |
| `name` |  |
| `regions` |  |

Operations: list, load.

API path: `/operators`

#### Product

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/products`

#### Promotion

| Field | Description |
| --- | --- |
| `description` |  |
| `end_date` |  |
| `id` |  |
| `operator` |  |
| `products` |  |
| `start_date` |  |
| `terms` |  |
| `title` |  |

Operations: list, load.

API path: `/promotions`

#### Service

| Field | Description |
| --- | --- |
| `id` | Service identifier. |
| `name` |  |
| `subservices` |  |

Operations: list, load.

API path: `/services`

#### StatementInquiry

| Field | Description |
| --- | --- |
| `account_number` | Account number. |
| `account_qualifier` |  |
| `balance` |  |
| `dates` |  |
| `page` | Page number |
| `per_page` | Number of records per page |
| `product_id` | Product identifier. |
| `reference` |  |

Operations: list.

API path: `/lookup/statement-inquiry`

#### Transaction

| Field | Description |
| --- | --- |
| `additional_identifier` | Additional details for a transaction. |
| `adjusted_values` |  |
| `auto_confirm` | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | Beneficiary details for a transaction. |
| `benefits` |  |
| `calculation_mode` |  |
| `callback_url` | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` |  |
| `confirmation_expiration_date` |  |
| `creation_date` |  |
| `credit_party_identifier` | Receiving account details for a transaction. |
| `debit_party_identifier` | Sending account details for a transaction. |
| `destination` | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` |  |
| `id` |  |
| `metadata` | Optional metadata related to the transaction. |
| `operator_reference` |  |
| `pin` |  |
| `prices` |  |
| `product` |  |
| `product_id` |  |
| `promotions` |  |
| `rates` |  |
| `requested_values` |  |
| `sender` | Sender details for a transaction. |
| `source` | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | Qualifying statement details for a payment transaction. |
| `status` |  |

Operations: create, list, load, update.

API path: `/async/transactions`



## Entities


### Balance

Create an instance: `const balance = client.Balance()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `number` |  |
| `credit_limit` | `number` |  |
| `holding` | `number` |  |
| `id` | `number` |  |
| `unit` | `string` |  |
| `unit_type` | `string` |  |

#### Example: List

```ts
const balances = await client.Balance().list()
```


### BenefitType

Create an instance: `const benefit_type = client.BenefitType()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |

#### Example: List

```ts
const benefit_types = await client.BenefitType().list()
```


### Campaign

Create an instance: `const campaign = client.Campaign()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `end_date` | `string` |  |
| `id` | `number` |  |
| `products` | `any[]` |  |
| `start_date` | `string` |  |
| `terms` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```ts
const campaign = await client.Campaign().load({ campaign_id: 1 })
```

#### Example: List

```ts
const campaigns = await client.Campaign().list()
```


### Country

Create an instance: `const country = client.Country()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `iso_code` | `string` | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` | `string` |  |
| `regions` | `any[]` |  |

#### Example: Load

```ts
const country = await client.Country().load({ country_iso_code: 'country_iso_code' })
```

#### Example: List

```ts
const countrys = await client.Country().list()
```


### CreditPartyBenefit

Create an instance: `const credit_party_benefit = client.CreditPartyBenefit()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | Remaining benefit amount. |
| `country` | `Record<string, any>` |  |
| `credit_party_identifier` | `Record<string, any>` |  |
| `expiration_date` | `string` | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | `number` | Page number |
| `per_page` | `number` | Number of records per page |
| `service_id` | `number` | Service identifier. |
| `type` | `string` |  |
| `unit` | `string` |  |
| `unit_type` | `string` |  |

#### Example: List

```ts
const credit_party_benefits = await client.CreditPartyBenefit().list()
```


### CreditPartyStatus

Create an instance: `const credit_party_status = client.CreditPartyStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation_date` | `string` | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` | `Record<string, any>` |  |
| `installation_date` | `string` | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | `number` | Service identifier. |

#### Example: Load

```ts
const credit_party_status = await client.CreditPartyStatus().load()
```


### MobileNumberLookup

Create an instance: `const mobile_number_lookup = client.MobileNumberLookup()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `Record<string, any>` |  |
| `id` | `number` | Operator identifier. |
| `identified` | `boolean` | Indicates whether operator was identified as a direct match |
| `mobile_number` | `string` | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` | `string` |  |
| `page` | `number` | Page number |
| `per_page` | `number` | Number of records per page |
| `regions` | `any[]` |  |

#### Example: List

```ts
const mobile_number_lookups = await client.MobileNumberLookup().list({ mobile_number: "example" })
```


### Operator

Create an instance: `const operator = client.Operator()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `Record<string, any>` |  |
| `id` | `number` | Operator identifier. |
| `name` | `string` |  |
| `regions` | `any[]` |  |

#### Example: Load

```ts
const operator = await client.Operator().load({ operator_id: 1 })
```

#### Example: List

```ts
const operators = await client.Operator().list()
```


### Product

Create an instance: `const product = client.Product()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const product = await client.Product().load({ product_id: 1 })
```

#### Example: List

```ts
const products = await client.Product().list()
```


### Promotion

Create an instance: `const promotion = client.Promotion()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `end_date` | `string` |  |
| `id` | `number` |  |
| `operator` | `Record<string, any>` |  |
| `products` | `any[]` |  |
| `start_date` | `string` |  |
| `terms` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```ts
const promotion = await client.Promotion().load({ promotion_id: 1 })
```

#### Example: List

```ts
const promotions = await client.Promotion().list()
```


### Service

Create an instance: `const service = client.Service()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Service identifier. |
| `name` | `string` |  |
| `subservices` | `any[]` |  |

#### Example: Load

```ts
const service = await client.Service().load({ service_id: 1 })
```

#### Example: List

```ts
const services = await client.Service().list()
```


### StatementInquiry

Create an instance: `const statement_inquiry = client.StatementInquiry()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `string` | Account number. |
| `account_qualifier` | `string` |  |
| `balance` | `Record<string, any>` |  |
| `dates` | `Record<string, any>` |  |
| `page` | `number` | Page number |
| `per_page` | `number` | Number of records per page |
| `product_id` | `number` | Product identifier. |
| `reference` | `any` |  |

#### Example: List

```ts
const statement_inquirys = await client.StatementInquiry().list()
```


### Transaction

Create an instance: `const transaction = client.Transaction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `additional_identifier` | `Record<string, any>` | Additional details for a transaction. |
| `adjusted_values` | `Record<string, any>` |  |
| `auto_confirm` | `boolean` | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | `Record<string, any>` | Beneficiary details for a transaction. |
| `benefits` | `any[]` |  |
| `calculation_mode` | `any` |  |
| `callback_url` | `string` | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` | `string` |  |
| `confirmation_expiration_date` | `string` |  |
| `creation_date` | `string` |  |
| `credit_party_identifier` | `Record<string, any>` | Receiving account details for a transaction. |
| `debit_party_identifier` | `Record<string, any>` | Sending account details for a transaction. |
| `destination` | `Record<string, any>` | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` | `string` |  |
| `id` | `string` |  |
| `metadata` | `Record<string, any>` | Optional metadata related to the transaction. |
| `operator_reference` | `string` |  |
| `pin` | `Record<string, any>` |  |
| `prices` | `Record<string, any>` |  |
| `product` | `any` |  |
| `product_id` | `string` |  |
| `promotions` | `any[]` |  |
| `rates` | `any` |  |
| `requested_values` | `Record<string, any>` |  |
| `sender` | `Record<string, any>` | Sender details for a transaction. |
| `source` | `Record<string, any>` | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | `Record<string, any>` | Qualifying statement details for a payment transaction. |
| `status` | `Record<string, any>` |  |

#### Example: Load

```ts
const transaction = await client.Transaction().load({ transaction_id: 1 })
```

#### Example: List

```ts
const transactions = await client.Transaction().list()
```

#### Example: Create

```ts
const transaction = await client.Transaction().create({
  destination: {},
  external_id: 'example_external_id',
  pin: {},
  prices: {},
  product_id: 'example_product_id',
  source: {},
})
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
dtone/
├── src/
│   ├── DtoneSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DtoneSDK } from '@voxgig-sdk/dtone'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const balance = client.Balance()
await balance.list()

// balance.data() now returns the balance data from the last `list`
// balance.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
