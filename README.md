# nci classic ui

Web interface for [nci](https://github.com/node-ci/nci).

## Installation

```sh
npm install nci-classic-ui
```

## Usage


To enable add this plugin to the `plugins` section (it's better to place it at
the end, because it will add request listener that servevs index page for all
urls) at server config:

```json
{
    "plugins": [
        "nci-classic-ui"
    ]
....
}
```

You may also want to serve static files for that interdace using
[nci-static-server](https://github.com/node-ci/nci-static-server).

You can see web interface at http://`http.host`:`http.port` (from your
server config).
