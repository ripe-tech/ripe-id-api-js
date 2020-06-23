<h1><a href="https://id.platforme.com"><img src="res/logo.svg" alt="RIPE ID API Javascript" height="60" style="height: 60px;"></a></h1>

The Javascript version of the RIPE ID API client.

## Configuration

| Name                    | Type  | Default                          | Description                                                                |
| ----------------------- | ----- | -------------------------------- | -------------------------------------------------------------------------- |
| **RIPEID_BASE_URL**     | `str` | `https://id.platforme.com/api/"` | The base URL to the RIPE ID server instance to be used.                    |
| **RIPEID_LOGIN_URL**    | `str` | `https://id.platforme.com/`      | The base URL to the web login endpoints of the RIPE ID instance.           |
| **RIPEID_ID**           | `str` | `null`                           | The client ID to be used for RIPE ID client authentication.                |
| **RIPEID_SECRET**       | `str` | `null`                           | The client secret to be used for RIPE ID client authentication.            |
| **RIPEID_REDIRECT_URL** | `str` | `null`                           | The redirect URL to be used under the interactive authentication of OAuth. |

## License

RIPE ID API Javascript is currently licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/).

## Build Automation

[![Build Status](https://travis-ci.org/ripe-tech/ripe-id-api-js.svg?branch=master)](https://travis-ci.org/ripe-tech/ripe-id-api-js)
[![Build Status GitHub](https://github.com/ripe-tech/ripe-id-api-js/workflows/Main%20Workflow/badge.svg)](https://github.com/ripe-tech/ripe-id-api-js/actions)
[![npm Status](https://img.shields.io/npm/v/ripe-id-api.svg)](https://www.npmjs.com/package/ripe-id-api)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://www.apache.org/licenses/)
