# Digital Value Services API

Starting out on your integration journey? Access our [quick start guide](https://developers.dtone.com/get-started.html). # Overview Welcome to the comprehensive reference and guide to the Digital Value Services (DVS) API. As the main gateway, this API plays a crucial role in faciliating a broad spectrum of digital value transactions across the extensive [DT One](https://www.dtone.com) network. Beyond its remarkable global reach, which includes over 160 countries and partnerships with more than 875 mobile operators and billers, the network also encompasses a diverse array of services. These include eSIM options, utility and bill payment services, a multitude of gift card products, gaming PINs, and much more. This diversity in offering ensures that the API can cater to a wide range of digital transaction needs, making it a versatile tool for users worldwide. Structured in the robust foundations of [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) principles, the DVS API uses [JSON](https://en.wikipedia.org/wiki/JSON) for its data interchange format. It encompasses a variety of services, including: - [Discovery Services](#tag/Services) - Explore and identify a wide range of available products and services. - [Transaction Services](#tag/Transactions) - Manage and execute various transaction types efficiently. - [Account Services](#tag/Balances) - Account related operations. - [Look-Up Services](#tag/Mobile-Number) - Utilize search functionalities for specific needs. To access the API, you will need a valid pair of keys as detailed in the [Authentication](#section/Authentication) section. This requires you to first register for a [DT Shop](https://dtshop.dtone.com/account?tab=developer) account. Once registered, you can generate keys for both production and pre-production environments in the Developer Section of your DT Shop account. Your queries and feedback are invaluable to us. Should you have any questions or suggestions about our API, we warmly encourage you to reach out to us by sending an email to the [DVS API support team](mailto:dvs-api-support@dtone.com). Your inputs help us continually improve and tailor our services to better meet your needs. ## Integration Libraries Officially supported [SDK](https://en.wikipedia.org/wiki/Software_development_kit)s are available for the following languages: * [Java](https://github.com/dtone/dtone-dvs-api-java-client) * [Node.js](https://www.npmjs.com/package/@dtone/dvs) These SDKs offer an accelerated path to developing your applications as an alternative to accessing the REST API directly. Separately, we would love to hear from you! If you have any questions and/or suggestions related to our SDKs, please do not hesitate to create corresponding [GitHub issues](https://guides.github.com/features/issues/) or send an email to the [DVS Open Source team](mailto:opensource@dtone.com). ## Sandbox A sandbox environment is available for testing integrations with the DVS API. It is available at [https://preprod-dvs-api.dtone.com/v1/](https://preprod-dvs-api.dtone.com/v1/). You can generate sandbox API keys from your [DT Shop](https://dtshop.dtone.com/account?tab=developer) account, under the **Pre-Production API Keys** section. All transactions on the sandbox environment are simulated: no real transaction goes through. To simulate different responses, the last three digits of the `credit_party_identifier` (that is `mobile_number` or `account_number`, depending on the `required_credit_party_identifier_fields` of a given [Product](/#tag/Products)) will have to be replaced with one of the following suffixes: | Suffix | Transaction Status | Example | | --- | --- | --- | | `100`, `200`, `300` | `COMPLETED` (PIN-less) | `+6595123100` | | `101`, `201`, `301` | `COMPLETED` (PIN-based) | `+6595123201` | | `102`, `202`, `302` | `DECLINED-INVALID-CREDIT-PARTY` | `+6595123102` | | `103`, `203`, `303` | `DECLINED-BARRED-CREDIT-PARTY` | `+6595123103` | | `104`, `204`, `304` | `DECLINED-OPERATOR-CURRENTLY-UNAVAILABLE` | `+6595123204` | | `105`, `205`, `305` | `DECLINED-DUPLICATED-TRANSACTION` | `+6595123105` | | `106`, `206`, `306` | `DECLINED` | `+6595123206` | | `107`, `207`, `307` | `DECLINED-EXCEPTION` | `+6595123107` | The different suffixes for a given transaction status can be used to simulate delays, as follows: * `10X` suffix will take at least 3 seconds to finish * `20X` suffix will take at least 20 seconds to finish * `30X` suffix will take at least 5 minutes to finish Please note that there are products that do not require any credit party identifier such as Gift Cards. For these products, the simulated transaction will always be in `COMPLETED` status. ## Versioning Endpoints of the API are prefixed with a corresponding version number. This method provides complete isolation between implementations and guarantees subsequent major changes to the API will never affect existing integrations. No breaking changes will be introduced within a major version. This distinction is further expounded in the subsection that follows. ### Non-Breaking Changes Also known as backward-compatible changes, such changes allow for your integration to continue without requiring additional changes on your side. Such changes also do not warrant a new version number and will be released without prior communication. Changes in this category are mainly &quot;additive&quot; in nature, with the following examples: * Adding new API endpoints * Adding optional fields to a request body and/or header * Adding fields to a response body and/or header * Data changes: - Adding new Countries / Operators / Products / Services - Modification of text and/or numeric field values, such as: - Country / Operator / Product / Service Names - Wholesale / Retail Prices and/or Rates - Status and Error Descriptions * Adding fields to a callback request body &amp;#128161; Before going live, it is very important to validate that your integration is capable of handling non-breaking API changes to mitigate avoidable disruptions to your service. ### Breaking Changes Breaking changes, on the other hand, require additional changes to your integration. Such changes correspond to major updates in the API and are mainly reserved for changes that brings about a substantial feature and/or improvement to the platform. When such changes occur, as endpoints of the API are prefixed with a corresponding version number, your existing integration won&#39;t be at risk of breaking as complete isolation of differences in implementation between versions are provided. Examples of changes in this category are as follows: * Removing and/or renaming API endpoints * Adding required fields to a request body and/or header * Removing and/or renaming fields from a request body and/or header * Removing and/or renaming fields from a response body and/or header * Removing and/or renaming fields from a callback request body &amp;#128161; When a new version of the API is available and you are keen to upgrade, testing in the sandbox environment to ensure that everything works well with your implementation before switching to the production environment comes highly recommended. ## Transactions The main purpose of this API is to deliver value (for example mobile airtime top-up, data bundles, etc.) to a beneficiary. This is what we call a &quot;transaction&quot;. During the course of a transfer, a transaction undergoes various status changes (or transitions) as illustrated below. ![transaction states](/images/transaction_states.png) As changes in transaction status occur, updates are sent in real-time when a callback URL is provided. In conjunction, transaction status can be queried through one of two means: via the returned `id` or a provided `external_id`. The latter serves as your unique reference and provides a utility to retrieve transaction details when exceptions occur, such as when the supposed API response was not received, as an example. ## Balances Transactions can be created through the platform as long as there is enough balance available in your account. A given balance is composed of the following: | Balance | Description | | --- | --- | | Available | Balance amount available for use | | Holding | Amount being held while transactions are being processed | As a given transaction goes through various changes in status as outlined [here](#section/Overview/Transactions), corresponding balance movements will be made. The following table illustrates the relationship between transaction status and balance movements: | Transaction Status | Balance Movement | Description | | --- | --- | --- | | `CREATED` | Authorize | Transfer wholesale price and fee from available to holding | | `CANCELLED`, `REJECTED`, `DECLINED` | Void | Amount authorized in holding moves back to available | | `COMPLETED` | Capture | Amount authorized in holding is captured, that is debited | | `REVERSED` | Reverse | Debited amount is reversed back into available | ## Flow Once a product has been selected through one of the [discovery methods](/#tag/Services) provided by the API, the actual transfer (that is transaction) can be performed in either one of the following modes: - Asynchronous (recommended) - Synchronous Each mode is accessible via a specific endpoint. As soon as a transaction is confirmed, the transfer order will be sent to the operator for immediate processing. During this time, the transaction will remain in a `CONFIRMED` status until the final status is received from the operator. ### Asynchronous Mode When a transaction is created and confirmed in an asynchronous fashion, the HTTP connection won&#39;t have to be kept open. This preserves system resources on your applications. As such, performing transactions **asynchronously** is **recommended**. ### Synchronous Mode When a transaction is created and confirmed in a synchronous fashion, the HTTP connection will be kept open in an attempt to capture the final status from the receiving operator so it can be returned in the API response. The processing time usually takes just a few seconds. However, with some receiving operators, it may take longer. Our system will keep the HTTP connection open for up to 180 seconds and will return a status before closing this connection. This status can be in one of the final status (for example `COMPLETED`, `DECLINED`) or not (for example `SUBMITTED`). In the latter case, this denotes the transaction is still being processed by the receiving operator. **Note:** your application does not have to wait for the connection to close, it can listen for a shorter period of time and query the final status later on (refer to the &quot;Final Status&quot; section below for more details). ### Final Status Regardless of the processing mode, the application should be designed to capture the final status of a transaction. This can be done through one of the following means: - Checking the status of a specific transaction via the corresponding API method (&quot;pull&quot; mechanism) - Configuring a callback URL passed in the request when creating a transaction (&quot;push&quot; mechanism) ## Callbacks As a transaction is being processed, changes in status will be notified in real-time if a callback URL was provided. Even though one callback per transaction is expected (that is change to either `COMPLETED` or `DECLINED`), a manual reversal from the [DT One](https://dtone.com/) team, which may happen in very rare occasions, will also trigger a callback to inform your application of a change in transaction status to `REVERSED`. This callback endpoint must be implemented by the sending partner, which should expect an HTTP `POST` request containing a transaction object represented in [JSON](https://en.wikipedia.org/wiki/JSON). As callbacks will be sent from the [DT One](https://dtone.com/) servers, these endpoints will have to be publicly-accessible in most cases. During development, a service such as [ngrok](https://ngrok.com/) can be used to expose local servers to the internet. Upon successful receipt of data, the callback endpoint should respond with an HTTP `2XX` status. In the event that the platform did not receive a successful status, callback notifications will be retried several times, beyond which, the transaction status will have to be queried through the API. ## Status and Errors ### HTTP Status Codes [DT One](https://dtone.com/) uses standard HTTP response codes to indicate whether an API request was successful or not. | Status | Description | | --- | --- | | `200` | OK | | `201` | Created: Resource created | | `202` | Accepted: Request has been accepted for processing | | `400` | Bad Request: Request was malformed | | `401` | Unauthorized: Credentials missing or invalid | | `404` | Not Found: Resource doesn&#39;t exist | | `429` | Too Many Requests | | `500` | Server Error: Error occurred on DT One | | `503` | Service Unavailable | ### API Error Codes | Code | Description | HTTP Status | | --- | --- | --- | | `1000400` | Bad Request | `400` | | `1000401` | Unauthorized | `401` | | `1000404` | Resource not found | `404` | | `1000429` | Too many requests | `429` | | `1003001` | Product is not available in your account | `404` | | `1003002` | Requested product amount is out of range | `400` | | `1003003` | Requested product unit is invalid | `400` | | `1003101` | Benefits not defined for available products | `404` | | `1003201` | Promotion not found | `404` | | `1003301` | Campaign not found | `404` | | `1005003` | Credit party mobile number is invalid | `400` | | `1005004` | Service not found | `404` | | `1005005` | Country not found | `404` | | `1005006` | Operator not found | `404` | | `1005503` | Sender mobile number is invalid | `400` | | `1006001` | Insufficient balance | `400` | | `1006003` | Debit party mobile number is invalid | `400` | | `1006009` | Account balance not found | `404` | | `1006503` | Beneficiary mobile number is invalid | `400` | | `1007001` | Transaction external ID has already been used | `400` | | `1007002` | Transaction has already been confirmed | `400` | | `1007004` | Transaction can no longer be confirmed | `400` | | `1007005` | Transaction has already been cancelled | `400` | | `1007007` | Transaction can no longer be cancelled | `400` | | `1007500` | Method not supported by operator | `400` | | `1008004` | Transaction not found | `404` | | `1009001` | Unexpected error, please contact our support team | `500` | | `1009503` | Service unavailable, please retry later | `503` | ### Transaction Status | Class | Status | Description | | --- | --- | --- | | `CREATED` | `CREATED` | Created | | `CONFIRMED` | `CONFIRMED` | Confirmed | | `REJECTED` | `REJECTED` | Rejected | | `REJECTED` | `REJECTED-INVALID-CREDIT-PARTY` | Rejected - Credit party is invalid | | `REJECTED` | `REJECTED-BARRED-CREDIT-PARTY` | Rejected - Credit party is barred | | `REJECTED` | `REJECTED-INELIGIBLE-CREDIT-PARTY` | Rejected - Credit party is ineligible for chosen product | | `REJECTED` | `REJECTED-INVALID-DEBIT-PARTY` | Rejected - Debit party is invalid | | `REJECTED` | `REJECTED-BARRED-DEBIT-PARTY` | Rejected - Debit party is barred | | `REJECTED` | `REJECTED-LIMITATIONS-ON-CREDIT-PARTY-AMOUNT` | Rejected - Limitations on credit party cumulative transaction amount | | `REJECTED` | `REJECTED-LIMITATIONS-ON-CREDIT-PARTY-QUANTITY` | Rejected - Limitations on credit party cumulative transaction quantity | | `REJECTED` | `REJECTED-OPERATOR-CURRENTLY-UNAVAILABLE` | Rejected - Operator currently unavailable | | `REJECTED` | `REJECTED-INSUFFICIENT-BALANCE` | Rejected - Insufficient balance | | `CANCELLED` | `CANCELLED` | Cancelled | | `SUBMITTED` | `SUBMITTED` | Submitted | | `COMPLETED` | `COMPLETED` | Completed | | `REVERSED` | `REVERSED` | Reversed | | `DECLINED` | `DECLINED` | Declined (no additional information available) | | `DECLINED` | `DECLINED-INVALID-CREDIT-PARTY` | Declined - Credit party is invalid | | `DECLINED` | `DECLINED-BARRED-CREDIT-PARTY` | Declined - Credit party is barred | | `DECLINED` | `DECLINED-INELIGIBLE-CREDIT-PARTY` | Declined - Credit party is ineligible for chosen product | | `DECLINED` | `DECLINED-INVALID-DEBIT-PARTY` | Declined - Debit party is invalid | | `DECLINED` | `DECLINED-BARRED-DEBIT-PARTY` | Declined - Debit party is barred | | `DECLINED` | `DECLINED-LIMITATIONS-ON-OPERATOR-AMOUNT` | Declined - Limitations on operator cumulative transaction amount | | `DECLINED` | `DECLINED-LIMITATIONS-ON-CREDIT-PARTY-AMOUNT` | Declined - Limitations on credit party cumulative transaction amount | | `DECLINED` | `DECLINED-LIMITATIONS-ON-CUSTOMER-AMOUNT` | Declined - Limitations on customer cumulative transaction amount | | `DECLINED` | `DECLINED-LIMITATIONS-ON-OPERATOR-QUANTITY` | Declined - Limitations on operator cumulative transaction quantity | | `DECLINED` | `DECLINED-LIMITATIONS-ON-CREDIT-PARTY-QUANTITY` | Declined - Limitations on credit party cumulative transaction quantity | | `DECLINED` | `DECLINED-LIMITATIONS-ON-CUSTOMER-QUANTITY` | Declined - Limitations on customer cumulative transaction quantity | | `DECLINED` | `DECLINED-DUPLICATED-TRANSACTION` | Declined - Duplicated transaction | | `DECLINED` | `DECLINED-OPERATOR-CURRENTLY-UNAVAILABLE` | Declined - Operator currently unavailable | `REJECTED` and `DECLINED` status classes both denote unsuccessful transactions. The primary distinction between these two relates to the party that determined the failure: * `REJECTED` are issued by the DVS platform based on various business rules (for example insufficient balance, limitations, etc) * `DECLINED` are issued by the operators Separately, it is recommended to define application logic based on **classes**, while additional distinction and/or insight are reflected on the actual **status**. ## Pagination API resources supporting bulk fetches via &quot;list&quot; API methods will be returned in a paginated fashion. ### Input Parameters | Field | Required | Type | Description | | --- | --- | --- | --- | | `page` | No | Integer | Page number | | `per_page` | No | Integer | Number of results per page (default 50, max 100) | ### Output Headers | Field | Description | | --- | --- | | `X-Total` | Total number of records | | `X-Total-Pages` | Total number of pages | | `X-Per-Page` | Number of records per page | | `X-Page` | Current page number | | `X-Next-Page` | Next page number (if any) | | `X-Prev-Page` | Previous page number (if any) | ## Internationalization Support for internationalization (i18n) is implemented via [standard HTTP content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation). API resources offering i18n will have the following request and response headers: ### Input Headers | Field | Required | Type | Description | | --- | --- | --- | --- | | `Accept-Language` | No | String | List of preferred languages for the content | ### Output Headers | Field | Description | | --- | --- | | `Content-Language` | List of languages in the returned content | ## Rate Limiting The API endpoints have rate limiting in place to protect our service from excessive number of requests. Rate limiting is enforced for every pair of API key and secret and the number of remaining API requests over a period of time (that is expressed in seconds) is conveyed through corresponding HTTP headers: ### Response Headers | Field | Description | | --- | --- | | `X-Ratelimit-Limit` | Number of allowed API calls over period of time | | `X-Ratelimit-Remaining` | Remaining number of allowed API calls | If the limit is reached, an [HTTP error 429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) will be returned by the server.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 13 entities and 26 HTTP routes. There are 7 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Balance](docs/api/balance.html)

Results: successful operation.

SDK operations: `list`.

### [BenefitType](docs/api/benefit_type.html)

Results: successful operation.

SDK operations: `list`.

### [Campaign](docs/api/campaign.html)

Results: successful operation.

SDK operations: `list`, `load`.

### [Country](docs/api/country.html)

Results: successful operation.

SDK operations: `list`, `load`.

Key fields to recognise:

- `iso_code`: Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. Note that the official list can be extended with additional country codes.

### [CreditPartyBenefit](docs/api/credit_party_benefit.html)

Results: successful operation.

SDK operations: `list`.

Key fields to recognise:

- `amount`: Remaining benefit amount. A value of `-1` indicates an unlimited benefit (for example unlimited data, calls, or SMS).
- `expiration_date`: A `null` value denotes either no expiration applies or that the product benefit has not yet been activated.
- `page`: Page number
- `per_page`: Number of records per page
- `service_id`: Service identifier.

### [CreditPartyStatus](docs/api/credit_party_status.html)

Results: successful operation.

SDK operations: `load`.

Key fields to recognise:

- `activation_date`: A `null` value denotes that credit party has not yet been activated on the actual network
- `installation_date`: A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed
- `service_id`: Service identifier.

### [MobileNumberLookup](docs/api/mobile_number_lookup.html)

Results: successful operation.

SDK operations: `list`.

Key fields to recognise:

- `id`: Operator identifier.
- `identified`: Indicates whether operator was identified as a direct match
- `mobile_number`: Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.
- `page`: Page number
- `per_page`: Number of records per page

### [Operator](docs/api/operator.html)

Results: successful operation.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: Operator identifier.

### [Product](docs/api/product.html)

Results: successful operation.

SDK operations: `list`, `load`.

### [Promotion](docs/api/promotion.html)

Results: successful operation.

SDK operations: `list`, `load`.

### [Service](docs/api/service.html)

Results: successful operation.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: Service identifier. See [Services](#tags/Services) for more details.

### [StatementInquiry](docs/api/statement_inquiry.html)

Results: successful operation.

SDK operations: `list`.

Key fields to recognise:

- `account_number`: Account number.
- `page`: Page number
- `per_page`: Number of records per page
- `product_id`: Product identifier.

### [Transaction](docs/api/transaction.html)

Results: Transaction created; successful operation; Transaction cancelled; Transaction confirmed.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `additional_identifier`: Additional details for a transaction. This information is mostly optional and will be required primarily for compliance reasons for products with additional information requirements as outlined in `required_additional_identifier_fields`.
- `auto_confirm`: Determines whether a transaction will be automatically confirmed upon creation or not. This is opted-out by default. Setting this field to `true` is recommended when transaction details, for example prices, are known as it removes the need to perform a separate API call to [confirm transactions](#operation/postTransactionConfirmAsync).
- `beneficiary`: Beneficiary details for a transaction. This information is mostly optional and will only be required for products with beneficiary information requirements as outlined in `required_beneficiary_fields`.
- `callback_url`: Transaction status updates will be sent to this endpoint. See [Callbacks](#section/Overview/Callbacks) for more details.
- `credit_party_identifier`: Receiving account details for a transaction. This information will be required for the majority of products with credit party inofrmation requirements outlined in `required_credit_party_identifier_fields`, but will be optional for certain products without any upfront recipient, for example Gift Cards.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Balance](docs/api/balance.html) | `list` | `GET /balances` | Required |
| [BenefitType](docs/api/benefit_type.html) | `list` | `GET /benefit-types` | Required |
| [Campaign](docs/api/campaign.html) | `list` | `GET /campaigns` | Required |
| [Campaign](docs/api/campaign.html) | `load` | `GET /campaigns/{campaign_id}` | Required |
| [Country](docs/api/country.html) | `list` | `GET /countries` | Required |
| [Country](docs/api/country.html) | `load` | `GET /countries/{country_iso_code}` | Required |
| [CreditPartyBenefit](docs/api/credit_party_benefit.html) | `list` | `POST /lookup/credit-party-benefits` | Required |
| [CreditPartyStatus](docs/api/credit_party_status.html) | `load` | `POST /lookup/credit-party-status` | Required |
| [MobileNumberLookup](docs/api/mobile_number_lookup.html) | `list` | `GET /lookup/mobile-number/{mobile_number}` | Required |
| [MobileNumberLookup](docs/api/mobile_number_lookup.html) | `list` | `POST /lookup/mobile-number` | Required |
| [Operator](docs/api/operator.html) | `list` | `GET /operators` | Required |
| [Operator](docs/api/operator.html) | `load` | `GET /operators/{operator_id}` | Required |
| [Product](docs/api/product.html) | `list` | `GET /products` | Required |
| [Product](docs/api/product.html) | `load` | `GET /products/{product_id}` | Required |
| [Promotion](docs/api/promotion.html) | `list` | `GET /promotions` | Required |
| [Promotion](docs/api/promotion.html) | `load` | `GET /promotions/{promotion_id}` | Required |
| [Service](docs/api/service.html) | `list` | `GET /services` | Required |
| [Service](docs/api/service.html) | `load` | `GET /services/{service_id}` | Required |
| [StatementInquiry](docs/api/statement_inquiry.html) | `list` | `POST /lookup/statement-inquiry` | Required |
| [Transaction](docs/api/transaction.html) | `create` | `POST /async/transactions` | Required |
| [Transaction](docs/api/transaction.html) | `create` | `POST /sync/transactions` | Required |
| [Transaction](docs/api/transaction.html) | `list` | `GET /transactions` | Required |
| [Transaction](docs/api/transaction.html) | `load` | `GET /transactions/{transaction_id}` | Required |
| [Transaction](docs/api/transaction.html) | `update` | `POST /transactions/{transaction_id}/cancel` | Required |
| [Transaction](docs/api/transaction.html) | `update` | `POST /async/transactions/{transaction_id}/confirm` | Required |
| [Transaction](docs/api/transaction.html) | `update` | `POST /sync/transactions/{transaction_id}/confirm` | Required |

## Connect to the API

- Pre-Production: `https://preprod-dvs-api.dtone.com/v1`
- Production: `https://dvs-api.dtone.com/v1`

The default credential is sent in the `Authorization` header with the `Basic` prefix.

The Digital Value Services API requires requests to be authenticated through individualized API keys. You can view and manage your API keys in [DT Shop](https://dtshop.dtone.com/). Your API keys carry many privileges, so please keep them secure! Do not share your secret API keys in publicly-accessible areas such as [GitHub](https://github.com/), client-side code, and so forth. Authentication to the API is performed via [HTTP Basic Auth](https://tools.ietf.org/html/rfc7235). Provide your API key as the basic auth username value and your API secret as your password. Except when site-to-site VPN is set up, all API requests must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure) with TLS 1.2. On a side note, we strongly recommend securing your applications against common security flaws by employing best practices such as the [OWASP Top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project).

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Seneca Provider](docs/sdks/seneca-provider.html) | `seneca-provider/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `dtone_list`: List records for an entity. Supported entities: `balance`, `benefit_type`, `campaign`, `country`, `credit_party_benefit`, `mobile_number_lookup`, `operator`, `product`, `promotion`, `service`, `statement_inquiry`, `transaction`.
- `dtone_load`: Load one record for an entity. Supported entities: `campaign`, `country`, `credit_party_status`, `operator`, `product`, `promotion`, `service`, `transaction`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

