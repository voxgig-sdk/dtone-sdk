# Dtone PHP SDK



The PHP SDK for the Dtone API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Balance()` — with named operations (`list`/`load`/`create`/`update`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/dtone-sdk/releases](https://github.com/voxgig-sdk/dtone-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'dtone_sdk.php';

$client = new DtoneSDK([
    "apikey" => getenv("DTONE_APIKEY"),
]);
```

### 2. List balance records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $balances = $client->Balance()->list();
    foreach ($balances as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["available"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a campaign

Campaign is nested under campaign, so provide the `campaign_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Campaign record (throws on error).
    $campaign = $client->Campaign()->load(["campaign_id" => 1]);
    print_r($campaign->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $balances = $client->Balance()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = DtoneSDK::test();

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$balance = $client->Balance()->list();
print_r(array_map(fn($item) => $item->data_get(), $balance));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new DtoneSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
DTONE_TEST_LIVE=TRUE
DTONE_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### DtoneSDK

```php
require_once 'dtone_sdk.php';
$client = new DtoneSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = DtoneSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### DtoneSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Balance` | `($data): BalanceEntity` | Create a Balance entity instance. |
| `BenefitType` | `($data): BenefitTypeEntity` | Create a BenefitType entity instance. |
| `Campaign` | `($data): CampaignEntity` | Create a Campaign entity instance. |
| `Country` | `($data): CountryEntity` | Create a Country entity instance. |
| `CreditPartyBenefit` | `($data): CreditPartyBenefitEntity` | Create a CreditPartyBenefit entity instance. |
| `CreditPartyStatus` | `($data): CreditPartyStatusEntity` | Create a CreditPartyStatus entity instance. |
| `MobileNumberLookup` | `($data): MobileNumberLookupEntity` | Create a MobileNumberLookup entity instance. |
| `Operator` | `($data): OperatorEntity` | Create an Operator entity instance. |
| `Product` | `($data): ProductEntity` | Create a Product entity instance. |
| `Promotion` | `($data): PromotionEntity` | Create a Promotion entity instance. |
| `Service` | `($data): ServiceEntity` | Create a Service entity instance. |
| `StatementInquiry` | `($data): StatementInquiryEntity` | Create a StatementInquiry entity instance. |
| `Transaction` | `($data): TransactionEntity` | Create a Transaction entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Operations: List.

API path: `/balances`

#### BenefitType

| Field | Description |
| --- | --- |
| `name` |  |

Operations: List.

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

Operations: List, Load.

API path: `/campaigns`

#### Country

| Field | Description |
| --- | --- |
| `iso_code` | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` |  |
| `regions` |  |

Operations: List, Load.

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

Operations: List.

API path: `/lookup/credit-party-benefits`

#### CreditPartyStatus

| Field | Description |
| --- | --- |
| `activation_date` | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` |  |
| `installation_date` | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | Service identifier. |

Operations: Load.

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

Operations: List.

API path: `/lookup/mobile-number/{mobile_number}`

#### Operator

| Field | Description |
| --- | --- |
| `country` |  |
| `id` | Operator identifier. |
| `name` |  |
| `regions` |  |

Operations: List, Load.

API path: `/operators`

#### Product

| Field | Description |
| --- | --- |

Operations: List, Load.

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

Operations: List, Load.

API path: `/promotions`

#### Service

| Field | Description |
| --- | --- |
| `id` | Service identifier. |
| `name` |  |
| `subservices` |  |

Operations: List, Load.

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

Operations: List.

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

Operations: Create, List, Load, Update.

API path: `/async/transactions`



## Entities


### Balance

Create an instance: `$balance = $client->Balance();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `float` |  |
| `credit_limit` | `float` |  |
| `holding` | `float` |  |
| `id` | `int` |  |
| `unit` | `string` |  |
| `unit_type` | `string` |  |

#### Example: List

```php
// list() returns an array of Balance records (throws on error).
$balances = $client->Balance()->list();
```


### BenefitType

Create an instance: `$benefit_type = $client->BenefitType();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |

#### Example: List

```php
// list() returns an array of BenefitType records (throws on error).
$benefit_types = $client->BenefitType()->list();
```


### Campaign

Create an instance: `$campaign = $client->Campaign();`

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
| `id` | `int` |  |
| `products` | `array` |  |
| `start_date` | `string` |  |
| `terms` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Campaign record (throws on error).
$campaign = $client->Campaign()->load(["campaign_id" => 1]);
```

#### Example: List

```php
// list() returns an array of Campaign records (throws on error).
$campaigns = $client->Campaign()->list();
```


### Country

Create an instance: `$country = $client->Country();`

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
| `regions` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Country record (throws on error).
$country = $client->Country()->load(["country_iso_code" => "country_iso_code"]);
```

#### Example: List

```php
// list() returns an array of Country records (throws on error).
$countrys = $client->Country()->list();
```


### CreditPartyBenefit

Create an instance: `$credit_party_benefit = $client->CreditPartyBenefit();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | Remaining benefit amount. |
| `country` | `array` |  |
| `credit_party_identifier` | `array` |  |
| `expiration_date` | `string` | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | `int` | Page number |
| `per_page` | `int` | Number of records per page |
| `service_id` | `int` | Service identifier. |
| `type` | `string` |  |
| `unit` | `string` |  |
| `unit_type` | `string` |  |

#### Example: List

```php
// list() returns an array of CreditPartyBenefit records (throws on error).
$credit_party_benefits = $client->CreditPartyBenefit()->list();
```


### CreditPartyStatus

Create an instance: `$credit_party_status = $client->CreditPartyStatus();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation_date` | `string` | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` | `array` |  |
| `installation_date` | `string` | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | `int` | Service identifier. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CreditPartyStatus record (throws on error).
$credit_party_status = $client->CreditPartyStatus()->load();
```


### MobileNumberLookup

Create an instance: `$mobile_number_lookup = $client->MobileNumberLookup();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `array` |  |
| `id` | `int` | Operator identifier. |
| `identified` | `bool` | Indicates whether operator was identified as a direct match |
| `mobile_number` | `string` | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` | `string` |  |
| `page` | `int` | Page number |
| `per_page` | `int` | Number of records per page |
| `regions` | `array` |  |

#### Example: List

```php
// list() returns an array of MobileNumberLookup records (throws on error).
$mobile_number_lookups = $client->MobileNumberLookup()->list();
```


### Operator

Create an instance: `$operator = $client->Operator();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `array` |  |
| `id` | `int` | Operator identifier. |
| `name` | `string` |  |
| `regions` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Operator record (throws on error).
$operator = $client->Operator()->load(["operator_id" => 1]);
```

#### Example: List

```php
// list() returns an array of Operator records (throws on error).
$operators = $client->Operator()->list();
```


### Product

Create an instance: `$product = $client->Product();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Product record (throws on error).
$product = $client->Product()->load(["product_id" => 1]);
```

#### Example: List

```php
// list() returns an array of Product records (throws on error).
$products = $client->Product()->list();
```


### Promotion

Create an instance: `$promotion = $client->Promotion();`

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
| `id` | `int` |  |
| `operator` | `array` |  |
| `products` | `array` |  |
| `start_date` | `string` |  |
| `terms` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Promotion record (throws on error).
$promotion = $client->Promotion()->load(["promotion_id" => 1]);
```

#### Example: List

```php
// list() returns an array of Promotion records (throws on error).
$promotions = $client->Promotion()->list();
```


### Service

Create an instance: `$service = $client->Service();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` | Service identifier. |
| `name` | `string` |  |
| `subservices` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Service record (throws on error).
$service = $client->Service()->load(["service_id" => 1]);
```

#### Example: List

```php
// list() returns an array of Service records (throws on error).
$services = $client->Service()->list();
```


### StatementInquiry

Create an instance: `$statement_inquiry = $client->StatementInquiry();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `string` | Account number. |
| `account_qualifier` | `string` |  |
| `balance` | `array` |  |
| `dates` | `array` |  |
| `page` | `int` | Page number |
| `per_page` | `int` | Number of records per page |
| `product_id` | `int` | Product identifier. |
| `reference` | `mixed` |  |

#### Example: List

```php
// list() returns an array of StatementInquiry records (throws on error).
$statement_inquirys = $client->StatementInquiry()->list();
```


### Transaction

Create an instance: `$transaction = $client->Transaction();`

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
| `additional_identifier` | `array` | Additional details for a transaction. |
| `adjusted_values` | `array` |  |
| `auto_confirm` | `bool` | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | `array` | Beneficiary details for a transaction. |
| `benefits` | `array` |  |
| `calculation_mode` | `mixed` |  |
| `callback_url` | `string` | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` | `string` |  |
| `confirmation_expiration_date` | `string` |  |
| `creation_date` | `string` |  |
| `credit_party_identifier` | `array` | Receiving account details for a transaction. |
| `debit_party_identifier` | `array` | Sending account details for a transaction. |
| `destination` | `array` | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` | `string` |  |
| `id` | `string` |  |
| `metadata` | `array` | Optional metadata related to the transaction. |
| `operator_reference` | `string` |  |
| `pin` | `array` |  |
| `prices` | `array` |  |
| `product` | `mixed` |  |
| `product_id` | `string` |  |
| `promotions` | `array` |  |
| `rates` | `mixed` |  |
| `requested_values` | `array` |  |
| `sender` | `array` | Sender details for a transaction. |
| `source` | `array` | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | `array` | Qualifying statement details for a payment transaction. |
| `status` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Transaction record (throws on error).
$transaction = $client->Transaction()->load(["transaction_id" => 1]);
```

#### Example: List

```php
// list() returns an array of Transaction records (throws on error).
$transactions = $client->Transaction()->list();
```

#### Example: Create

```php
$transaction = $client->Transaction()->create([
    "destination" => null, // array
    "external_id" => null, // string
    "pin" => null, // array
    "prices" => null, // array
    "product_id" => null, // string
    "source" => null, // array
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── dtone_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`dtone_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$balance = $client->Balance();
$balance->list();

// $balance->data_get() now returns the balance data from the last list
// $balance->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
