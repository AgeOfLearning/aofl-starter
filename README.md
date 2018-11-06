# AOFL JS

## Introduction
AOFL JS is a light, web component based framework. It provides the bare necessities of a PWA (Progressive Web Application). It's composed of a simple core library which includes Polymer's [LitElement](https://github.com/Polymer/lit-element) for web component composition, a preconfigured build process and a flat directory structure. Its ecosystem includes a [store](https://www.npmjs.com/package/@aofl/store) for state management, a client side [router](https://www.npmjs.com/package/@aofl/router) and [i18n](https://www.npmjs.com/package/@aofl/i18n-mixin) support and several other libraries and supporting components.


### The build process
This is achieved through the build process which, takes the client side routes, templates and configuration information to pre build the associated route directories, styles, scripts, images and an index.html for each. The resulting build directory tree is what is published to the server. The apps from there should lazy load any other required resources.

### Flat directory structure
Deeply nested directory structures can wreak havoc on the approachability, scalability and maintenence of a project and add an inordinate amount of time in planning and reorganizing these structures as the application scales. For these reasons we promote using the root `js/` directory to house all global components, middleware, loaders, classes, etc. using a proposed naming convention to distinguish them.

__Browser compatability__<br />
AOFL JS supports all browsers that are [ES5-compliant](http://kangax.github.io/compat-table/es5/) (IE10 and below are not supported).


## Getting started

`npm i -g @aofl/cli`

`aofl init path/to/my-pwa-app`

`cd path/to/my-pwa-app`

`npm run start:dev`

Go to `http://localhost:8080` to find a sample home page.


## Ecosystem
| Project | Status | Description |
|---------|--------|-------------|
| [@aofl/cli]            | v1.2.0 | Aofl app scaffolding |
| [@aofl/store]          | v1.2.0 | Large-scale state management |
| [@aofl/router]         | v1.2.0 | Client side routing |
| [@aofl/web-components] | v1.2.0 | Utility web components |
| [@aofl/i18n-mixin]     | v1.2.0 | Component translation |
| [@aofl/rotations]      | v1.2.0 | A/B Testing support |

[@aofl/cli]: https://www.npmjs.com/package/@aofl/aofljs-cli
[@aofl/store]: https://www.npmjs.com/package/@aofl/store
[@aofl/router]: https://www.npmjs.com/package/@aofl/router
[@aofl/web-components]: https://www.npmjs.com/package/@aofl/web-components
[@aofl/i18n-mixin]: https://www.npmjs.com/package/@aofl/i18n-mixin
[@aofl/rotations]: https://www.npmjs.com/package/@aofl/rotations

## Contributing

## Known issues

