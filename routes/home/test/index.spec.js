/* eslint no-invalid-this: "off" */
import '../index.js';
import {html} from '@polymer/lit-element';
import {render} from 'lit-html';

describe('home-page', () => {
  before(function() {
    render(html`
    <test-fixture id="HomeTestFixture">
      <template>
        <home-page></home-page>
      </template>
    </test-fixture>
    `, document.getElementById('test-container'));
  });

  beforeEach(function() {
    this.element = fixture('HomeTestFixture');
  });

  it('shoud have shadowRoot', function() {
    expect(this.element.shadowRoot).to.not.be.null;
  });
});
