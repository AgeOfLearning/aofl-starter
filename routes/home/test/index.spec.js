/* eslint no-invalid-this: "off" */
import '../index.js';
import {html, render} from 'lit-html';

describe('home-page', () => {
  beforeEach(function() {
    render(html`
    <test-fixture id="HomeTestFixture">
      <template>
        <home-page></home-page>
      </template>
    </test-fixture>
    `, document.getElementById('test-container'));

    this.element = fixture('HomeTestFixture');
  });

  it('shoud have shadowRoot', function() {
    expect(this.element.shadowRoot).to.not.be.null;
  });
});
