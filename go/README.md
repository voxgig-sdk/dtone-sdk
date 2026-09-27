# Dtone Golang SDK



The Golang SDK for the Dtone API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Balance(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/dtone-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/dtone-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/dtone-sdk/go=../dtone-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/dtone-sdk/go"
)

func main() {
    client := sdk.NewDtoneSDK(map[string]any{
        "apikey": os.Getenv("DTONE_APIKEY"),
    })

    // List balance records — the value is the array of records itself.
    balances, err := client.Balance(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range balances.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
operators, err := client.Operator(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = operators
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

operator, err := client.Operator(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(operator) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewDtoneSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewDtoneSDK

```go
func NewDtoneSDK(options map[string]any) *DtoneSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *DtoneSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### DtoneSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Balance` | `(data map[string]any) DtoneEntity` | Create a Balance entity instance. |
| `BenefitType` | `(data map[string]any) DtoneEntity` | Create a BenefitType entity instance. |
| `Campaign` | `(data map[string]any) DtoneEntity` | Create a Campaign entity instance. |
| `Country` | `(data map[string]any) DtoneEntity` | Create a Country entity instance. |
| `CreditPartyBenefit` | `(data map[string]any) DtoneEntity` | Create a CreditPartyBenefit entity instance. |
| `CreditPartyStatus` | `(data map[string]any) DtoneEntity` | Create a CreditPartyStatus entity instance. |
| `MobileNumber` | `(data map[string]any) DtoneEntity` | Create a MobileNumber entity instance. |
| `Operator` | `(data map[string]any) DtoneEntity` | Create an Operator entity instance. |
| `Product` | `(data map[string]any) DtoneEntity` | Create a Product entity instance. |
| `Promotion` | `(data map[string]any) DtoneEntity` | Create a Promotion entity instance. |
| `Service` | `(data map[string]any) DtoneEntity` | Create a Service entity instance. |
| `Statement` | `(data map[string]any) DtoneEntity` | Create a Statement entity instance. |
| `Transaction` | `(data map[string]any) DtoneEntity` | Create a Transaction entity instance. |

### Entity interface (DtoneEntity)

All entities implement the `DtoneEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    balance, err := client.Balance(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // balance is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Balance

| Field | Description |
| --- | --- |
| `"available"` |  |
| `"credit_limit"` |  |
| `"holding"` |  |
| `"id"` |  |
| `"unit"` |  |
| `"unit_type"` |  |

Operations: List.

API path: `/balances`

#### BenefitType

| Field | Description |
| --- | --- |
| `"name"` |  |

Operations: List.

API path: `/benefit-types`

#### Campaign

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"end_date"` |  |
| `"id"` |  |
| `"products"` |  |
| `"start_date"` |  |
| `"terms"` |  |
| `"title"` |  |

Operations: List, Load.

API path: `/campaigns`

#### Country

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"iso_code"` | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `"name"` |  |
| `"regions"` |  |

Operations: List, Load.

API path: `/countries`

#### CreditPartyBenefit

| Field | Description |
| --- | --- |
| `"credit_party_identifier"` |  |
| `"page"` | Page number |
| `"per_page"` | Number of records per page |
| `"service_id"` | Service identifier. |

Operations: Create.

API path: `/lookup/credit-party-benefits`

#### CreditPartyStatus

| Field | Description |
| --- | --- |
| `"activation_date"` | A `null` value denotes that credit party has not yet been activated on the actual network |
| `"credit_party_identifier"` |  |
| `"installation_date"` | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `"service_id"` | Service identifier. |

Operations: Create.

API path: `/lookup/credit-party-status`

#### MobileNumber

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"mobile_number"` | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `"page"` | Page number |
| `"per_page"` | Number of records per page |

Operations: Create, Load.

API path: `/lookup/mobile-number`

#### Operator

| Field | Description |
| --- | --- |
| `"country"` |  |
| `"id"` | Operator identifier. |
| `"name"` |  |
| `"regions"` |  |

Operations: List, Load.

API path: `/operators`

#### Product

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: List, Load.

API path: `/products`

#### Promotion

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"end_date"` |  |
| `"id"` |  |
| `"operator"` |  |
| `"products"` |  |
| `"start_date"` |  |
| `"terms"` |  |
| `"title"` |  |

Operations: List, Load.

API path: `/promotions`

#### Service

| Field | Description |
| --- | --- |
| `"id"` | Service identifier. |
| `"name"` |  |
| `"subservices"` |  |

Operations: List, Load.

API path: `/services`

#### Statement

| Field | Description |
| --- | --- |
| `"account_number"` | Account number. |
| `"account_qualifier"` |  |
| `"page"` | Page number |
| `"per_page"` | Number of records per page |
| `"product_id"` | Product identifier. |

Operations: Create.

API path: `/lookup/statement-inquiry`

#### Transaction

| Field | Description |
| --- | --- |
| `"additional_identifier"` | Additional details for a transaction. |
| `"adjusted_values"` |  |
| `"auto_confirm"` | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `"beneficiary"` | Beneficiary details for a transaction. |
| `"benefits"` |  |
| `"calculation_mode"` |  |
| `"callback_url"` | Transaction status updates will be sent to this endpoint. |
| `"confirmation_date"` |  |
| `"confirmation_expiration_date"` |  |
| `"creation_date"` |  |
| `"credit_party_identifier"` | Receiving account details for a transaction. |
| `"debit_party_identifier"` | Sending account details for a transaction. |
| `"destination"` | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `"external_id"` |  |
| `"id"` |  |
| `"metadata"` | Optional metadata related to the transaction. |
| `"operator_reference"` |  |
| `"pin"` |  |
| `"prices"` |  |
| `"product"` |  |
| `"product_id"` |  |
| `"promotions"` |  |
| `"rates"` |  |
| `"requested_values"` |  |
| `"sender"` | Sender details for a transaction. |
| `"source"` | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `"statement_identifier"` | Qualifying statement details for a payment transaction. |
| `"status"` |  |

Operations: Create, List, Load.

API path: `/transactions/{transaction_id}/cancel`



## Entities


### Balance

Create an instance: `balance := client.Balance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `float64` |  |
| `credit_limit` | `float64` |  |
| `holding` | `float64` |  |
| `id` | `int` |  |
| `unit` | `string` |  |
| `unit_type` | `string` |  |

#### Example: List

```go
balances, err := client.Balance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(balances) // the array of records
```


### BenefitType

Create an instance: `benefitType := client.BenefitType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |

#### Example: List

```go
benefitTypes, err := client.BenefitType(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(benefitTypes) // the array of records
```


### Campaign

Create an instance: `campaign := client.Campaign(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `end_date` | `string` |  |
| `id` | `int` |  |
| `products` | `[]any` |  |
| `start_date` | `string` |  |
| `terms` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```go
campaign, err := client.Campaign(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(campaign) // the loaded record
```

#### Example: List

```go
campaigns, err := client.Campaign(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(campaigns) // the array of records
```


### Country

Create an instance: `country := client.Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `iso_code` | `string` | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` | `string` |  |
| `regions` | `[]any` |  |

#### Example: Load

```go
country, err := client.Country(nil).Load(map[string]any{"id": "country_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(country) // the loaded record
```

#### Example: List

```go
countrys, err := client.Country(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(countrys) // the array of records
```


### CreditPartyBenefit

Create an instance: `creditPartyBenefit := client.CreditPartyBenefit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credit_party_identifier` | `map[string]any` |  |
| `page` | `int` | Page number |
| `per_page` | `int` | Number of records per page |
| `service_id` | `int` | Service identifier. |

#### Example: Create

```go
result, err := client.CreditPartyBenefit(nil).Create(map[string]any{
    "credit_party_identifier": map[string]any{},
    "service_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### CreditPartyStatus

Create an instance: `creditPartyStatus := client.CreditPartyStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation_date` | `string` | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` | `map[string]any` |  |
| `installation_date` | `string` | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | `int` | Service identifier. |

#### Example: Create

```go
result, err := client.CreditPartyStatus(nil).Create(map[string]any{
    "activation_date": "example_activation_date",
    "credit_party_identifier": map[string]any{},
    "installation_date": "example_installation_date",
    "service_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### MobileNumber

Create an instance: `mobileNumber := client.MobileNumber(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `mobile_number` | `string` | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `page` | `int` | Page number |
| `per_page` | `int` | Number of records per page |

#### Example: Load

```go
mobileNumber, err := client.MobileNumber(nil).Load(map[string]any{"id": "mobile_number_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(mobileNumber) // the loaded record
```

#### Example: Create

```go
result, err := client.MobileNumber(nil).Create(map[string]any{
    "mobile_number": "example_mobile_number",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Operator

Create an instance: `operator := client.Operator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `map[string]any` |  |
| `id` | `int` | Operator identifier. |
| `name` | `string` |  |
| `regions` | `[]any` |  |

#### Example: Load

```go
operator, err := client.Operator(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(operator) // the loaded record
```

#### Example: List

```go
operators, err := client.Operator(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(operators) // the array of records
```


### Product

Create an instance: `product := client.Product(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
product, err := client.Product(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(product) // the loaded record
```

#### Example: List

```go
products, err := client.Product(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(products) // the array of records
```


### Promotion

Create an instance: `promotion := client.Promotion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `end_date` | `string` |  |
| `id` | `int` |  |
| `operator` | `map[string]any` |  |
| `products` | `[]any` |  |
| `start_date` | `string` |  |
| `terms` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```go
promotion, err := client.Promotion(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(promotion) // the loaded record
```

#### Example: List

```go
promotions, err := client.Promotion(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(promotions) // the array of records
```


### Service

Create an instance: `service := client.Service(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` | Service identifier. |
| `name` | `string` |  |
| `subservices` | `[]any` |  |

#### Example: Load

```go
service, err := client.Service(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(service) // the loaded record
```

#### Example: List

```go
services, err := client.Service(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(services) // the array of records
```


### Statement

Create an instance: `statement := client.Statement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `string` | Account number. |
| `account_qualifier` | `string` |  |
| `page` | `int` | Page number |
| `per_page` | `int` | Number of records per page |
| `product_id` | `int` | Product identifier. |

#### Example: Create

```go
result, err := client.Statement(nil).Create(map[string]any{
    "account_number": "example_account_number",
    "product_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Transaction

Create an instance: `transaction := client.Transaction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `additional_identifier` | `map[string]any` | Additional details for a transaction. |
| `adjusted_values` | `map[string]any` |  |
| `auto_confirm` | `bool` | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | `map[string]any` | Beneficiary details for a transaction. |
| `benefits` | `[]any` |  |
| `calculation_mode` | `any` |  |
| `callback_url` | `string` | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` | `string` |  |
| `confirmation_expiration_date` | `string` |  |
| `creation_date` | `string` |  |
| `credit_party_identifier` | `map[string]any` | Receiving account details for a transaction. |
| `debit_party_identifier` | `map[string]any` | Sending account details for a transaction. |
| `destination` | `map[string]any` | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` | `string` |  |
| `id` | `string` |  |
| `metadata` | `map[string]any` | Optional metadata related to the transaction. |
| `operator_reference` | `string` |  |
| `pin` | `map[string]any` |  |
| `prices` | `map[string]any` |  |
| `product` | `any` |  |
| `product_id` | `string` |  |
| `promotions` | `[]any` |  |
| `rates` | `any` |  |
| `requested_values` | `map[string]any` |  |
| `sender` | `map[string]any` | Sender details for a transaction. |
| `source` | `map[string]any` | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | `map[string]any` | Qualifying statement details for a payment transaction. |
| `status` | `map[string]any` |  |

#### Example: Load

```go
transaction, err := client.Transaction(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(transaction) // the loaded record
```

#### Example: List

```go
transactions, err := client.Transaction(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(transactions) // the array of records
```

#### Example: Create

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

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

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

Rate limiting.

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

Retry.

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

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/dtone-sdk/go/
├── dtone.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/dtone-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
operator := client.Operator(nil)
operator.List(nil, nil)

// operator.Data() now returns the operator data from the last list
// operator.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
