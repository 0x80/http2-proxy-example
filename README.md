# Example for using http2-proxy

This code is an attempt to forward requests to an API while modifying the url to attach API keys.

The proxy itself will be quarded from unauthorized requests when hosted. Only the client app will make those requests. By tagging the API and APP keys to the url, the client doesn't have to know / can not expose these.

## Usage

* `yarn`: Install
* `yarn watch`: Compile in watch mode

Then in another shell start the server with `yarn start`

## Test

Request without keys:

```sh
curl -i --cacert ./ssl/cert.pem https://localhost:8008/flightstats/flex/airports/rest/v1/json/all
```

Request with keys:

```sh
curl -i --cacert ./ssl/cert.pem https://localhost:8008/flightstats/flex/airports/rest/v1/json/all\?appId\=1234\&appKey\=1234
```
