# Dtone Golang SDK Reference

Complete API reference for the Dtone Golang SDK.


## DtoneSDK

### Constructor

```go
func NewDtoneSDK(options map[string]any) *DtoneSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *DtoneSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *DtoneSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Balance(data map[string]any) DtoneEntity`

Create a new `Balance` entity instance. Pass `nil` for no initial data.

#### `BenefitType(data map[string]any) DtoneEntity`

Create a new `BenefitType` entity instance. Pass `nil` for no initial data.

#### `Campaign(data map[string]any) DtoneEntity`

Create a new `Campaign` entity instance. Pass `nil` for no initial data.

#### `Country(data map[string]any) DtoneEntity`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `CreditPartyBenefit(data map[string]any) DtoneEntity`

Create a new `CreditPartyBenefit` entity instance. Pass `nil` for no initial data.

#### `CreditPartyStatus(data map[string]any) DtoneEntity`

Create a new `CreditPartyStatus` entity instance. Pass `nil` for no initial data.

#### `MobileNumberLookup(data map[string]any) DtoneEntity`

Create a new `MobileNumberLookup` entity instance. Pass `nil` for no initial data.

#### `Operator(data map[string]any) DtoneEntity`

Create a new `Operator` entity instance. Pass `nil` for no initial data.

#### `Product(data map[string]any) DtoneEntity`

Create a new `Product` entity instance. Pass `nil` for no initial data.

#### `Promotion(data map[string]any) DtoneEntity`

Create a new `Promotion` entity instance. Pass `nil` for no initial data.

#### `Service(data map[string]any) DtoneEntity`

Create a new `Service` entity instance. Pass `nil` for no initial data.

#### `StatementInquiry(data map[string]any) DtoneEntity`

Create a new `StatementInquiry` entity instance. Pass `nil` for no initial data.

#### `Transaction(data map[string]any) DtoneEntity`

Create a new `Transaction` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BalanceEntity

```go
balance := client.Balance(nil)
fmt.Println(balance.GetName()) // "balance"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `float64` | Yes |  |
| `credit_limit` | `float64` | Yes |  |
| `holding` | `float64` | Yes |  |
| `id` | `int` | Yes |  |
| `unit` | `string` | Yes |  |
| `unit_type` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Balance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BenefitTypeEntity

```go
benefitType := client.BenefitType(nil)
fmt.Println(benefitType.GetName()) // "benefit_type"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.BenefitType(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BenefitTypeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CampaignEntity

```go
campaign := client.Campaign(nil)
fmt.Println(campaign.GetName()) // "campaign"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `end_date` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `products` | `[]any` | Yes |  |
| `start_date` | `string` | Yes |  |
| `terms` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Campaign(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Campaign(nil).Load(map[string]any{"campaign_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CampaignEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CountryEntity

```go
country := client.Country(nil)
fmt.Println(country.GetName()) // "country"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso_code` | `string` | Yes | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` | `string` | Yes |  |
| `regions` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Country(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Country(nil).Load(map[string]any{"country_iso_code": "country_iso_code"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CreditPartyBenefitEntity

```go
creditPartyBenefit := client.CreditPartyBenefit(nil)
fmt.Println(creditPartyBenefit.GetName()) // "credit_party_benefit"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float64` | Yes | Remaining benefit amount. |
| `country` | `map[string]any` | Yes |  |
| `credit_party_identifier` | `map[string]any` | Yes |  |
| `expiration_date` | `string` | Yes | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | `int` | No | Page number |
| `per_page` | `int` | No | Number of records per page |
| `service_id` | `int` | Yes | Service identifier. |
| `type` | `string` | Yes |  |
| `unit` | `string` | Yes |  |
| `unit_type` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CreditPartyBenefit(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CreditPartyBenefitEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CreditPartyStatusEntity

```go
creditPartyStatus := client.CreditPartyStatus(nil)
fmt.Println(creditPartyStatus.GetName()) // "credit_party_status"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation_date` | `string` | Yes | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` | `map[string]any` | Yes |  |
| `installation_date` | `string` | Yes | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | `int` | Yes | Service identifier. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CreditPartyStatus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CreditPartyStatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MobileNumberLookupEntity

```go
mobileNumberLookup := client.MobileNumberLookup(nil)
fmt.Println(mobileNumberLookup.GetName()) // "mobile_number_lookup"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `map[string]any` | Yes |  |
| `id` | `int` | Yes | Operator identifier. |
| `identified` | `bool` | Yes | Indicates whether operator was identified as a direct match |
| `mobile_number` | `string` | Yes | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` | `string` | Yes |  |
| `page` | `int` | No | Page number |
| `per_page` | `int` | No | Number of records per page |
| `regions` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.MobileNumberLookup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MobileNumberLookupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OperatorEntity

```go
operator := client.Operator(nil)
fmt.Println(operator.GetName()) // "operator"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `map[string]any` | Yes |  |
| `id` | `int` | Yes | Operator identifier. |
| `name` | `string` | Yes |  |
| `regions` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Operator(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Operator(nil).Load(map[string]any{"operator_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OperatorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ProductEntity

```go
product := client.Product(nil)
fmt.Println(product.GetName()) // "product"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Product(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Product(nil).Load(map[string]any{"product_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PromotionEntity

```go
promotion := client.Promotion(nil)
fmt.Println(promotion.GetName()) // "promotion"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `end_date` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `operator` | `map[string]any` | Yes |  |
| `products` | `[]any` | Yes |  |
| `start_date` | `string` | Yes |  |
| `terms` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Promotion(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Promotion(nil).Load(map[string]any{"promotion_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PromotionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ServiceEntity

```go
service := client.Service(nil)
fmt.Println(service.GetName()) // "service"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | Yes | Service identifier. |
| `name` | `string` | Yes |  |
| `subservices` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Service(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Service(nil).Load(map[string]any{"service_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ServiceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StatementInquiryEntity

```go
statementInquiry := client.StatementInquiry(nil)
fmt.Println(statementInquiry.GetName()) // "statement_inquiry"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `string` | Yes | Account number. |
| `account_qualifier` | `string` | No |  |
| `balance` | `map[string]any` | Yes |  |
| `dates` | `map[string]any` | Yes |  |
| `page` | `int` | No | Page number |
| `per_page` | `int` | No | Number of records per page |
| `product_id` | `int` | Yes | Product identifier. |
| `reference` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.StatementInquiry(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StatementInquiryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TransactionEntity

```go
transaction := client.Transaction(nil)
fmt.Println(transaction.GetName()) // "transaction"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additional_identifier` | `map[string]any` | No | Additional details for a transaction. |
| `adjusted_values` | `map[string]any` | No |  |
| `auto_confirm` | `bool` | No | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | `map[string]any` | No | Beneficiary details for a transaction. |
| `benefits` | `[]any` | No |  |
| `calculation_mode` | `any` | No |  |
| `callback_url` | `string` | No | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` | `string` | No |  |
| `confirmation_expiration_date` | `string` | No |  |
| `creation_date` | `string` | No |  |
| `credit_party_identifier` | `map[string]any` | No | Receiving account details for a transaction. |
| `debit_party_identifier` | `map[string]any` | No | Sending account details for a transaction. |
| `destination` | `map[string]any` | Yes | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `metadata` | `map[string]any` | No | Optional metadata related to the transaction. |
| `operator_reference` | `string` | No |  |
| `pin` | `map[string]any` | Yes |  |
| `prices` | `map[string]any` | Yes |  |
| `product` | `any` | No |  |
| `product_id` | `string` | Yes |  |
| `promotions` | `[]any` | No |  |
| `rates` | `any` | No |  |
| `requested_values` | `map[string]any` | No |  |
| `sender` | `map[string]any` | No | Sender details for a transaction. |
| `source` | `map[string]any` | Yes | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | `map[string]any` | No | Qualifying statement details for a payment transaction. |
| `status` | `map[string]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Transaction(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Transaction(nil).Load(map[string]any{"transaction_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Transaction(nil).Create(map[string]any{
    "destination": map[string]any{},
    "external_id": "example_external_id",
    "pin": map[string]any{},
    "prices": map[string]any{},
    "product_id": "example_product_id",
    "source": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Transaction(nil).Update(map[string]any{
    "transaction_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TransactionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Request/response capture ring buffer for debugging |
| `idempotency` | 0.0.1 | Idempotency keys for safe retries of mutating operations |
| `metrics` | 0.0.1 | Statistics capture: per-operation counters and latency |
| `paging` | 0.0.1 | Pagination signals for list operations |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```go
client := sdk.NewDtoneSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Request/response capture ring buffer for debugging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency keys for safe retries of mutating operations.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Statistics capture: per-operation counters and latency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Pagination signals for list operations.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

