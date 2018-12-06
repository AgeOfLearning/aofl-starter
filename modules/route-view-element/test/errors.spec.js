/* eslint no-invalid-this: "off" */
import {html, render} from 'lit-html';
import {routerInstance} from '@aofl/router';
import '../';

describe('route-view ERROR', function() {
  before(function() {
    this.testContainer = getTestContainer();
    this.routerInstance = routerInstance;
  });

  beforeEach(function() {
    this.mws = [];
    const response = {
      matchedRoute: {
        resolve() {
          return Promise.reject('rejected');
        }
      }
    };
    sinon.stub(this.routerInstance, 'after').callsFake((fn) => {
      this.mws.push(sinon.spy(fn));
    });
    sinon.stub(this.routerInstance, 'navigate').callsFake(() => {
      this.mws.forEach((mw) => mw(response, response, ()=>{}));
    });

    render(html`
      <test-fixture id="RouterViewErrorTestFixture">
        <template>
          <route-view></route-view>
        </template>
      </test-fixture>
    `, this.testContainer);
    this.viewElement = fixture('RouterViewErrorTestFixture');
    sinon.spy(this.viewElement, 'render');
  });

  afterEach(function() {
    this.viewElement.render.restore();
    this.routerInstance.after.restore();
    this.routerInstance.navigate.restore();
  });

  it('Should render', async function() {
    try {
      await this.viewElement.updateComplete;
      expect(this.viewElement.shadowRoot).to.not.equal(null);
    } catch (e) {
      return Promise.reject(e);
    }
  });

  it('Should register router middleware and navigate', async function() {
    await this.viewElement.updateComplete;
    try {
      await new Promise((resolve) => {
        this.routerInstance.after(() => {
          setTimeout(() => {
            expect(this.viewElement.render.called).to.true;
            resolve();
          }, 500);
        });
        this.routerInstance.navigate('/');
      });
    } catch (e) {
      return Promise.reject(e);
    }
  });
});
