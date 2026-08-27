# Dtone Lua SDK Reference

Complete API reference for the Dtone Lua SDK.


## DtoneSDK

### Constructor

```lua
local sdk = require("dtone_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Balance(data)`

Create a new `Balance` entity instance. Pass `nil` for no initial data.

#### `BenefitType(data)`

Create a new `BenefitType` entity instance. Pass `nil` for no initial data.

#### `Campaign(data)`

Create a new `Campaign` entity instance. Pass `nil` for no initial data.

#### `Country(data)`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `CreditPartyBenefit(data)`

Create a new `CreditPartyBenefit` entity instance. Pass `nil` for no initial data.

#### `CreditPartyStatus(data)`

Create a new `CreditPartyStatus` entity instance. Pass `nil` for no initial data.

#### `MobileNumberLookup(data)`

Create a new `MobileNumberLookup` entity instance. Pass `nil` for no initial data.

#### `Operator(data)`

Create a new `Operator` entity instance. Pass `nil` for no initial data.

#### `Product(data)`

Create a new `Product` entity instance. Pass `nil` for no initial data.

#### `Promotion(data)`

Create a new `Promotion` entity instance. Pass `nil` for no initial data.

#### `Service(data)`

Create a new `Service` entity instance. Pass `nil` for no initial data.

#### `StatementInquiry(data)`

Create a new `StatementInquiry` entity instance. Pass `nil` for no initial data.

#### `Transaction(data)`

Create a new `Transaction` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BalanceEntity

```lua
local balance = client:Balance(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Balance():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BenefitTypeEntity

```lua
local benefit_type = client:BenefitType(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:BenefitType():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BenefitTypeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CampaignEntity

```lua
local campaign = client:Campaign(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `end_date` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `products` | `table` | Yes |  |
| `start_date` | `string` | Yes |  |
| `terms` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Campaign():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Campaign():load({ campaign_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CampaignEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CountryEntity

```lua
local country = client:Country(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso_code` | `string` | Yes | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` | `string` | Yes |  |
| `regions` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Country():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Country():load({ country_iso_code = "country_iso_code" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CreditPartyBenefitEntity

```lua
local credit_party_benefit = client:CreditPartyBenefit(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes | Remaining benefit amount. |
| `country` | `table` | Yes |  |
| `credit_party_identifier` | `table` | Yes |  |
| `expiration_date` | `string` | Yes | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | `number` | No | Page number |
| `per_page` | `number` | No | Number of records per page |
| `service_id` | `number` | Yes | Service identifier. |
| `type` | `string` | Yes |  |
| `unit` | `string` | Yes |  |
| `unit_type` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:CreditPartyBenefit():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreditPartyBenefitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CreditPartyStatusEntity

```lua
local credit_party_status = client:CreditPartyStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation_date` | `string` | Yes | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` | `table` | Yes |  |
| `installation_date` | `string` | Yes | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | `number` | Yes | Service identifier. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:CreditPartyStatus():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreditPartyStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MobileNumberLookupEntity

```lua
local mobile_number_lookup = client:MobileNumberLookup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `table` | Yes |  |
| `id` | `number` | Yes | Operator identifier. |
| `identified` | `boolean` | Yes | Indicates whether operator was identified as a direct match |
| `mobile_number` | `string` | Yes | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` | `string` | Yes |  |
| `page` | `number` | No | Page number |
| `per_page` | `number` | No | Number of records per page |
| `regions` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:MobileNumberLookup():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MobileNumberLookupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OperatorEntity

```lua
local operator = client:Operator(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `table` | Yes |  |
| `id` | `number` | Yes | Operator identifier. |
| `name` | `string` | Yes |  |
| `regions` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Operator():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Operator():load({ operator_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OperatorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductEntity

```lua
local product = client:Product(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Product():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Product():load({ product_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PromotionEntity

```lua
local promotion = client:Promotion(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `end_date` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `operator` | `table` | Yes |  |
| `products` | `table` | Yes |  |
| `start_date` | `string` | Yes |  |
| `terms` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Promotion():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Promotion():load({ promotion_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PromotionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ServiceEntity

```lua
local service = client:Service(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | Yes | Service identifier. |
| `name` | `string` | Yes |  |
| `subservices` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Service():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Service():load({ service_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ServiceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StatementInquiryEntity

```lua
local statement_inquiry = client:StatementInquiry(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `string` | Yes | Account number. |
| `account_qualifier` | `string` | No |  |
| `balance` | `table` | Yes |  |
| `dates` | `table` | Yes |  |
| `page` | `number` | No | Page number |
| `per_page` | `number` | No | Number of records per page |
| `product_id` | `number` | Yes | Product identifier. |
| `reference` | `any` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:StatementInquiry():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatementInquiryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TransactionEntity

```lua
local transaction = client:Transaction(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additional_identifier` | `table` | No | Additional details for a transaction. |
| `adjusted_values` | `table` | No |  |
| `auto_confirm` | `boolean` | No | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | `table` | No | Beneficiary details for a transaction. |
| `benefits` | `table` | No |  |
| `calculation_mode` | `any` | No |  |
| `callback_url` | `string` | No | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` | `string` | No |  |
| `confirmation_expiration_date` | `string` | No |  |
| `creation_date` | `string` | No |  |
| `credit_party_identifier` | `table` | No | Receiving account details for a transaction. |
| `debit_party_identifier` | `table` | No | Sending account details for a transaction. |
| `destination` | `table` | Yes | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `metadata` | `table` | No | Optional metadata related to the transaction. |
| `operator_reference` | `string` | No |  |
| `pin` | `table` | Yes |  |
| `prices` | `table` | Yes |  |
| `product` | `any` | No |  |
| `product_id` | `string` | Yes |  |
| `promotions` | `table` | No |  |
| `rates` | `any` | No |  |
| `requested_values` | `table` | No |  |
| `sender` | `table` | No | Sender details for a transaction. |
| `source` | `table` | Yes | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | `table` | No | Qualifying statement details for a payment transaction. |
| `status` | `table` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Transaction():create({
  destination = --[[ table ]],
  external_id = --[[ string ]],
  pin = --[[ table ]],
  prices = --[[ table ]],
  product_id = --[[ string ]],
  source = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Transaction():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Transaction():load({ transaction_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Transaction():update({
  transaction_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TransactionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

