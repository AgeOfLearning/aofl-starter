/* eslint no-invalid-this: "off" */
import '../index.js';
import {html, render} from 'lit-html';

describe('home-page', () => {
  before(function() {
    this.testContainer = getTestContainer();
  });

  beforeEach(function() {
    render(html`
    <test-fixture id="HomeTestFixture">
      <template>
        <home-page></home-page>
      </template>
    </test-fixture>
    `, this.testContainer);

    this.element = fixture('HomeTestFixture');
  });

  it('shoud have shadowRoot', async function() {
    await this.element.updateComplete;
    expect(this.element.shadowRoot).to.not.be.null;
  });
});
