/* eslint no-invalid-this: "off" */
import {html, render} from 'lit-html';
import {routerInstance} from '@aofl/router';
import '../';

describe('link-to', function() {
  before(function() {
    this.testContainer = getTestContainer();
    this.routerInstance = routerInstance;
    this.mockFireEvent = (el, etype) => {
      const clickEvent = new Event('click');
      el.dispatchEvent(clickEvent);
    };
  });

  beforeEach(function() {
    render(html`
      <test-fixture id="LinkToBasicTestFixture">
        <template>
          <link-to href="/login"></link-to>
        </template>
      </test-fixture>
    `, this.testContainer);
    this.element = fixture('LinkToBasicTestFixture');

    sinon.spy(this.routerInstance, 'navigate');
  });

  afterEach(function() {
    this.routerInstance.navigate.restore();
  });

  it('Should render', function() {
    expect(this.element.shadowRoot).to.not.equal(null);
    expect(this.element.href).to.equal(__webpack_public_path__ + 'login'); // eslint-disable-line
  });

  it('Should call router navigate when clicked', async function() {
    try {
      await this.element.updateComplete;
      this.mockFireEvent(this.element.shadowRoot.children[1], 'click');
      await new Promise((resolve) => {
        setTimeout(() => {
          expect(this.routerInstance.navigate.called).to.be.true;
          resolve();
        }, 50);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  });
});
