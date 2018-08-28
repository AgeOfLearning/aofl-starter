# aofl-js unit testing

aofl-js comes with browser based unit testing configured out of the box.

* [Mocha][mocha] as a test framework.
* [Chai][chai] assertions.
* [Fetch-Mock][fetchMock] For mocking fetch requests.
* [Async][async] to keep your sanity.
* [Lodash][lodash] (3.0) to repeat fewer things.
* [Sinon][sinon] and [sinon-chai][sinon-chai] to test just your things.
* [test-fixture][test-fixture] for easy fixture testing with `<template>` tags.
* [accessibility-developer-tools][a11ydevtools] through `a11ySuite` for simple, automated Accessibility testing.

## Getting started

To run tests once:<br />
`npm test`

To run and watch<br />
`npm run test:watch`

Tests should be written in a test directory as either `*.spec.js` or `*.spec.html` for a given module or component.
```
.
├── component
│   ├── test
│   │   ├── index.spec.html
│   │   ├── index.spec.js
│   │
│   ├── index.js
│   ├── style.css
│   ├── template.js
└── ...
```

## Component unit testing
Component unit tests should be in filenames following the filename convention of *-html.spec.js. e.g. index-html.spec.js. The component test will need to import the component it is testing along with the `html` and `render` methods which will be used to render the component for testing.

### Sample component unit test

```js
import '../index.js';
import {html} from '@polymer/lit-element';
import {render} from 'lit-html';


describe('aofl-app', () => {
  let element;
  before(function() {
    render(html`
      <test-fixture id="BasicTestFixture">
        <template>
          <aofl-app>Hello aofl-app!</aofl-app>
        </template>
      </test-fixture>
      `, document.getElementById('test-container'));
    element = fixture('BasicTestFixture');
  });

  it('instantiating the element with default properties works', function() {
    expect(element.shadowRoot).to.not.equal(null);
    expect(element.localName).to.equal('aofl-app');
  });
});

```

### Sample standard unit test
```js
import Counter from '../Counter';

describe('Counter class', function() {
  it('should increment properly', function() {
    let counter = new Counter(0); // start new counter at 0`
    expect(counter.increment()).to.equal(1);
  });
});
```

### Sample fetch mock & sinon spy

```js
import {html} from '@polymer/lit-element';
import {render} from 'lit-html';
import fetchMock from 'fetch-mock';
import '../index.js';

describe('posts-page', function() {
  let element;
  before(function() {
    render(html`
      <test-fixture id="PostsTestFixture">
        <template>
          <posts-page></posts-page>
        </template>
      </test-fixture>
    `, document.getElementById('test-container'));
    element = fixture('PostsTestFixture');

    fetchMock.get('books/',[{
      'id': 1,
      'title': 'Don Quixote de la Mancha'
    }], {
      overwriteRoutes: false
    });
    sinon.spy(element, 'loadPosts'); // A method that should be called after books/ is fetched
  });

  it('Mocks posts api and renders post links', (done) => {
    let cb = sinon.spy();
    element.init(cb).then(function() {
      expect(cb.called).to.equal(true);
      expect(element.posts[0].title).to.equal('Don Quixote de la Mancha');
      expect(element.loadPosts.called).to.equal(true); // Sinon spy check on loadPosts
      done();
    });
  });
});

```


<!-- References -->
[async]:         https://github.com/caolan/async                               "Async.js"
[chai]:          http://chaijs.com/                                            "Chai Assertion Library"
[fetchMock]:     http://www.wheresrhys.co.uk/fetch-mock/                       "Mock fetch requests"
[mocha]:         http://mochajs.org/                                           "Mocha Test Framework"
[sinon]:         http://sinonjs.org/                                           "Sinon.JS"
[sinon-chai]:    https://github.com/domenic/sinon-chai                         "Chai assertions for Sinon"
[lodash]:        https://lodash.com/                                           "Lo-Dash"
[test-fixture]:  https://github.com/PolymerElements/test-fixture               "Easy DOM fixture testing"
[a11ydevtools]:  https://github.com/GoogleChrome/accessibility-developer-tools "A collection of audit rules checking for common accessibility problems, and an API for running these rules in an HTML page."
