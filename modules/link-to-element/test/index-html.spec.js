/* eslint no-invalid-this: "off" */
import {html, render} from '@aofl/web-components/aofl-element';
import {routerInstance} from '@aofl/router';
import '../';

describe('link-to', function() {
  before(function() {
    this.routerInstance = routerInstance;
    this.mockFireEvent = (el, etype) => {
      const clickEvent = new Event('click');
      el.dispatchEvent(clickEvent);
    };
  });

  beforeEach(function() {
    this.testContainer = getTestContainer();

    render(html`
      <link-to id="LinkToBasicTestFixture" href="/login"></link-to>
    `, this.testContainer);

    this.element = this.testContainer.querySelector('#LinkToBasicTestFixture');

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
    await this.element.updateComplete;
    this.mockFireEvent(this.element.shadowRoot.querySelector('a'), 'click');
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(this.routerInstance.navigate.called).to.be.true;
        resolve();
      }, 50);
    });
  });
});
