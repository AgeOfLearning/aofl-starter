/* eslint babel/no-invalid-this: "off" */
import '../index.js';
import {html, render} from 'lit-html';
import {expect} from 'chai';

describe('home-page', () => {
  beforeEach(function() {
    this.testContainer = getTestContainer();
    render(html`
      <home-page id="HomeTestFixture"></home-page>
    `, this.testContainer);

    this.element = this.testContainer.querySelector('#HomeTestFixture');
  });

  it('Should have shadowRoot', async function() {
    await this.element.updateComplete;
    expect(this.element.shadowRoot).to.not.be.null;
  });
});
