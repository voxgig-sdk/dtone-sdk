# Dtone Python SDK



The Python SDK for the Dtone API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Balance()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/dtone-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from dtone_sdk import DtoneSDK

client = DtoneSDK({
    "apikey": os.environ.get("DTONE_APIKEY"),
})
```

### 2. List balance records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    balances = client.Balance().list()
    for balance in balances:
        print(balance)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a campaign

Campaign is nested under campaign, so provide the `campaign_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    campaign = client.Campaign().load({"campaign_id": 1})
    print(campaign)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    balances = client.Balance().list()
    print(balances)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = DtoneSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
balance = client.Balance().list()
# balance contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = DtoneSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DTONE_TEST_LIVE=TRUE
DTONE_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### DtoneSDK

```python
from dtone_sdk import DtoneSDK

client = DtoneSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = DtoneSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### DtoneSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Balance` | `(data) -> BalanceEntity` | Create a Balance entity instance. |
| `BenefitType` | `(data) -> BenefitTypeEntity` | Create a BenefitType entity instance. |
| `Campaign` | `(data) -> CampaignEntity` | Create a Campaign entity instance. |
| `Country` | `(data) -> CountryEntity` | Create a Country entity instance. |
| `CreditPartyBenefit` | `(data) -> CreditPartyBenefitEntity` | Create a CreditPartyBenefit entity instance. |
| `CreditPartyStatus` | `(data) -> CreditPartyStatusEntity` | Create a CreditPartyStatus entity instance. |
| `MobileNumberLookup` | `(data) -> MobileNumberLookupEntity` | Create a MobileNumberLookup entity instance. |
| `Operator` | `(data) -> OperatorEntity` | Create an Operator entity instance. |
| `Product` | `(data) -> ProductEntity` | Create a Product entity instance. |
| `Promotion` | `(data) -> PromotionEntity` | Create a Promotion entity instance. |
| `Service` | `(data) -> ServiceEntity` | Create a Service entity instance. |
| `StatementInquiry` | `(data) -> StatementInquiryEntity` | Create a StatementInquiry entity instance. |
| `Transaction` | `(data) -> TransactionEntity` | Create a Transaction entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `balance = client.Balance()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `float` |  |
| `credit_limit` | `float` |  |
| `holding` | `float` |  |
| `id` | `int` |  |
| `unit` | `str` |  |
| `unit_type` | `str` |  |

#### Example: List

```python
balances = client.Balance().list()
```


### BenefitType

Create an instance: `benefit_type = client.BenefitType()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `str` |  |

#### Example: List

```python
benefit_types = client.BenefitType().list()
```


### Campaign

Create an instance: `campaign = client.Campaign()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `end_date` | `str` |  |
| `id` | `int` |  |
| `products` | `list` |  |
| `start_date` | `str` |  |
| `terms` | `str` |  |
| `title` | `str` |  |

#### Example: Load

```python
campaign = client.Campaign().load({"campaign_id": 1})
```

#### Example: List

```python
campaigns = client.Campaign().list()
```


### Country

Create an instance: `country = client.Country()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `iso_code` | `str` | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` | `str` |  |
| `regions` | `list` |  |

#### Example: Load

```python
country = client.Country().load({"country_iso_code": "country_iso_code"})
```

#### Example: List

```python
countrys = client.Country().list()
```


### CreditPartyBenefit

Create an instance: `credit_party_benefit = client.CreditPartyBenefit()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | Remaining benefit amount. |
| `country` | `dict` |  |
| `credit_party_identifier` | `dict` |  |
| `expiration_date` | `str` | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | `int` | Page number |
| `per_page` | `int` | Number of records per page |
| `service_id` | `int` | Service identifier. |
| `type` | `str` |  |
| `unit` | `str` |  |
| `unit_type` | `str` |  |

#### Example: List

```python
credit_party_benefits = client.CreditPartyBenefit().list()
```


### CreditPartyStatus

Create an instance: `credit_party_status = client.CreditPartyStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation_date` | `str` | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` | `dict` |  |
| `installation_date` | `str` | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | `int` | Service identifier. |

#### Example: Load

```python
credit_party_status = client.CreditPartyStatus().load()
```


### MobileNumberLookup

Create an instance: `mobile_number_lookup = client.MobileNumberLookup()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `dict` |  |
| `id` | `int` | Operator identifier. |
| `identified` | `bool` | Indicates whether operator was identified as a direct match |
| `mobile_number` | `str` | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` | `str` |  |
| `page` | `int` | Page number |
| `per_page` | `int` | Number of records per page |
| `regions` | `list` |  |

#### Example: List

```python
mobile_number_lookups = client.MobileNumberLookup().list({"mobile_number": "example"})
```


### Operator

Create an instance: `operator = client.Operator()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `dict` |  |
| `id` | `int` | Operator identifier. |
| `name` | `str` |  |
| `regions` | `list` |  |

#### Example: Load

```python
operator = client.Operator().load({"operator_id": 1})
```

#### Example: List

```python
operators = client.Operator().list()
```


### Product

Create an instance: `product = client.Product()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
product = client.Product().load({"product_id": 1})
```

#### Example: List

```python
products = client.Product().list()
```


### Promotion

Create an instance: `promotion = client.Promotion()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `end_date` | `str` |  |
| `id` | `int` |  |
| `operator` | `dict` |  |
| `products` | `list` |  |
| `start_date` | `str` |  |
| `terms` | `str` |  |
| `title` | `str` |  |

#### Example: Load

```python
promotion = client.Promotion().load({"promotion_id": 1})
```

#### Example: List

```python
promotions = client.Promotion().list()
```


### Service

Create an instance: `service = client.Service()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` | Service identifier. |
| `name` | `str` |  |
| `subservices` | `list` |  |

#### Example: Load

```python
service = client.Service().load({"service_id": 1})
```

#### Example: List

```python
services = client.Service().list()
```


### StatementInquiry

Create an instance: `statement_inquiry = client.StatementInquiry()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `str` | Account number. |
| `account_qualifier` | `str` |  |
| `balance` | `dict` |  |
| `dates` | `dict` |  |
| `page` | `int` | Page number |
| `per_page` | `int` | Number of records per page |
| `product_id` | `int` | Product identifier. |
| `reference` | `Any` |  |

#### Example: List

```python
statement_inquirys = client.StatementInquiry().list()
```


### Transaction

Create an instance: `transaction = client.Transaction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `additional_identifier` | `dict` | Additional details for a transaction. |
| `adjusted_values` | `dict` |  |
| `auto_confirm` | `bool` | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | `dict` | Beneficiary details for a transaction. |
| `benefits` | `list` |  |
| `calculation_mode` | `Any` |  |
| `callback_url` | `str` | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` | `str` |  |
| `confirmation_expiration_date` | `str` |  |
| `creation_date` | `str` |  |
| `credit_party_identifier` | `dict` | Receiving account details for a transaction. |
| `debit_party_identifier` | `dict` | Sending account details for a transaction. |
| `destination` | `dict` | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` | `str` |  |
| `id` | `str` |  |
| `metadata` | `dict` | Optional metadata related to the transaction. |
| `operator_reference` | `str` |  |
| `pin` | `dict` |  |
| `prices` | `dict` |  |
| `product` | `Any` |  |
| `product_id` | `str` |  |
| `promotions` | `list` |  |
| `rates` | `Any` |  |
| `requested_values` | `dict` |  |
| `sender` | `dict` | Sender details for a transaction. |
| `source` | `dict` | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | `dict` | Qualifying statement details for a payment transaction. |
| `status` | `dict` |  |

#### Example: Load

```python
transaction = client.Transaction().load({"transaction_id": 1})
```

#### Example: List

```python
transactions = client.Transaction().list()
```

#### Example: Create

```python
transaction = client.Transaction().create({
    "destination": {},  # dict
    "external_id": "example_external_id",  # str
    "pin": {},  # dict
    "prices": {},  # dict
    "product_id": "example_product_id",  # str
    "source": {},  # dict
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── dtone_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`dtone_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
balance = client.Balance()
balance.list()

# balance.data_get() now returns the balance data from the last list
# balance.match_get() returns the last match criteria
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
