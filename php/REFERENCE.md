# Dtone PHP SDK Reference

Complete API reference for the Dtone PHP SDK.


## DtoneSDK

### Constructor

```php
require_once __DIR__ . '/dtone_sdk.php';

$client = new DtoneSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DtoneSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = DtoneSDK::test();
```


### Instance Methods

#### `Balance($data = null)`

Create a new `BalanceEntity` instance. Pass `null` for no initial data.

#### `BenefitType($data = null)`

Create a new `BenefitTypeEntity` instance. Pass `null` for no initial data.

#### `Campaign($data = null)`

Create a new `CampaignEntity` instance. Pass `null` for no initial data.

#### `Country($data = null)`

Create a new `CountryEntity` instance. Pass `null` for no initial data.

#### `CreditPartyBenefit($data = null)`

Create a new `CreditPartyBenefitEntity` instance. Pass `null` for no initial data.

#### `CreditPartyStatus($data = null)`

Create a new `CreditPartyStatusEntity` instance. Pass `null` for no initial data.

#### `MobileNumberLookup($data = null)`

Create a new `MobileNumberLookupEntity` instance. Pass `null` for no initial data.

#### `Operator($data = null)`

Create a new `OperatorEntity` instance. Pass `null` for no initial data.

#### `Product($data = null)`

Create a new `ProductEntity` instance. Pass `null` for no initial data.

#### `Promotion($data = null)`

Create a new `PromotionEntity` instance. Pass `null` for no initial data.

#### `Service($data = null)`

Create a new `ServiceEntity` instance. Pass `null` for no initial data.

#### `StatementInquiry($data = null)`

Create a new `StatementInquiryEntity` instance. Pass `null` for no initial data.

#### `Transaction($data = null)`

Create a new `TransactionEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): DtoneUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BalanceEntity

```php
$balance = $client->Balance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `float` | Yes |  |
| `credit_limit` | `float` | Yes |  |
| `holding` | `float` | Yes |  |
| `id` | `int` | Yes |  |
| `unit` | `string` | Yes |  |
| `unit_type` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Balance()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BalanceEntity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BenefitTypeEntity

```php
$benefit_type = $client->BenefitType();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->BenefitType()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BenefitTypeEntity`

Create a new `BenefitTypeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CampaignEntity

```php
$campaign = $client->Campaign();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `end_date` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `products` | `array` | Yes |  |
| `start_date` | `string` | Yes |  |
| `terms` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Campaign()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Campaign()->load(["campaign_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CampaignEntity`

Create a new `CampaignEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CountryEntity

```php
$country = $client->Country();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso_code` | `string` | Yes | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` | `string` | Yes |  |
| `regions` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Country()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Country()->load(["country_iso_code" => "country_iso_code"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CountryEntity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CreditPartyBenefitEntity

```php
$credit_party_benefit = $client->CreditPartyBenefit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | Yes | Remaining benefit amount. |
| `country` | `array` | Yes |  |
| `credit_party_identifier` | `array` | Yes |  |
| `expiration_date` | `string` | Yes | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | `int` | No | Page number |
| `per_page` | `int` | No | Number of records per page |
| `service_id` | `int` | Yes | Service identifier. |
| `type` | `string` | Yes |  |
| `unit` | `string` | Yes |  |
| `unit_type` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->CreditPartyBenefit()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CreditPartyBenefitEntity`

Create a new `CreditPartyBenefitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CreditPartyStatusEntity

```php
$credit_party_status = $client->CreditPartyStatus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation_date` | `string` | Yes | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` | `array` | Yes |  |
| `installation_date` | `string` | Yes | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | `int` | Yes | Service identifier. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CreditPartyStatus()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CreditPartyStatusEntity`

Create a new `CreditPartyStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MobileNumberLookupEntity

```php
$mobile_number_lookup = $client->MobileNumberLookup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `array` | Yes |  |
| `id` | `int` | Yes | Operator identifier. |
| `identified` | `bool` | Yes | Indicates whether operator was identified as a direct match |
| `mobile_number` | `string` | Yes | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` | `string` | Yes |  |
| `page` | `int` | No | Page number |
| `per_page` | `int` | No | Number of records per page |
| `regions` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->MobileNumberLookup()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MobileNumberLookupEntity`

Create a new `MobileNumberLookupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OperatorEntity

```php
$operator = $client->Operator();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `array` | Yes |  |
| `id` | `int` | Yes | Operator identifier. |
| `name` | `string` | Yes |  |
| `regions` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Operator()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Operator()->load(["operator_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OperatorEntity`

Create a new `OperatorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductEntity

```php
$product = $client->Product();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Product()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Product()->load(["product_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductEntity`

Create a new `ProductEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PromotionEntity

```php
$promotion = $client->Promotion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `end_date` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `operator` | `array` | Yes |  |
| `products` | `array` | Yes |  |
| `start_date` | `string` | Yes |  |
| `terms` | `string` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Promotion()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Promotion()->load(["promotion_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PromotionEntity`

Create a new `PromotionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ServiceEntity

```php
$service = $client->Service();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | Yes | Service identifier. |
| `name` | `string` | Yes |  |
| `subservices` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Service()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Service()->load(["service_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ServiceEntity`

Create a new `ServiceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StatementInquiryEntity

```php
$statement_inquiry = $client->StatementInquiry();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `string` | Yes | Account number. |
| `account_qualifier` | `string` | No |  |
| `balance` | `array` | Yes |  |
| `dates` | `array` | Yes |  |
| `page` | `int` | No | Page number |
| `per_page` | `int` | No | Number of records per page |
| `product_id` | `int` | Yes | Product identifier. |
| `reference` | `mixed` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->StatementInquiry()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StatementInquiryEntity`

Create a new `StatementInquiryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TransactionEntity

```php
$transaction = $client->Transaction();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additional_identifier` | `array` | No | Additional details for a transaction. |
| `adjusted_values` | `array` | No |  |
| `auto_confirm` | `bool` | No | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | `array` | No | Beneficiary details for a transaction. |
| `benefits` | `array` | No |  |
| `calculation_mode` | `mixed` | No |  |
| `callback_url` | `string` | No | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` | `string` | No |  |
| `confirmation_expiration_date` | `string` | No |  |
| `creation_date` | `string` | No |  |
| `credit_party_identifier` | `array` | No | Receiving account details for a transaction. |
| `debit_party_identifier` | `array` | No | Sending account details for a transaction. |
| `destination` | `array` | Yes | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `metadata` | `array` | No | Optional metadata related to the transaction. |
| `operator_reference` | `string` | No |  |
| `pin` | `array` | Yes |  |
| `prices` | `array` | Yes |  |
| `product` | `mixed` | No |  |
| `product_id` | `string` | Yes |  |
| `promotions` | `array` | No |  |
| `rates` | `mixed` | No |  |
| `requested_values` | `array` | No |  |
| `sender` | `array` | No | Sender details for a transaction. |
| `source` | `array` | Yes | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | `array` | No | Qualifying statement details for a payment transaction. |
| `status` | `array` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Transaction()->create([
  "destination" => null, // array
  "external_id" => null, // string
  "pin" => null, // array
  "prices" => null, // array
  "product_id" => null, // string
  "source" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Transaction()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Transaction()->load(["transaction_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Transaction()->update([
  "transaction_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TransactionEntity`

Create a new `TransactionEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new DtoneSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

