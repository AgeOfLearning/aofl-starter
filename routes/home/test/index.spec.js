import '../index.js';
import {html} from '@polymer/lit-element';
import {render} from 'lit-html';

describe('home-page', () => {
  let element;

  before(function() {
    render(html`
    <test-fixture id="HomeTestFixture">
      <template>
        <home-page></home-page>
      </template>
    </test-fixture>
    `, document.getElementById('test-container'));
  });

  beforeEach(() => {
    element = fixture('HomeTestFixture');
    incrementBtn = element.shadowRoot.getElementById('increment');
    decrementBtn = element.shadowRoot.getElementById('decrement');
    count = element.shadowRoot.getElementById('count');
  });

  it('shoud have shadowRoot', () => {
    expect(element.shadowRoot).to.not.equal(null);
  });
});
