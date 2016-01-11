# nci classic ui

Web interface for [nci](https://github.com/node-ci/nci).

It's damn fast single page web application which immediately responds on any
user interaction. This app doesn't use http api, it's built using only realtime 
technologies for communication (socket.io). When any build action (start, 
cancel, completion, etc) takes place on server side all clients will know about
that immediately. So you almost never need to refresh page by yourself.

It also has beautiful build console output which is very close to terminal
emulator.

Currently this app doesn't provide any project manipulation actions (edit
config, rename or remove project, etc).


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
