/* eslint babel/no-invalid-this: "off" */
import {html, render} from 'lit-html';
import {routerInstance} from '@aofl/router';
import '../';
import {spy, stub} from 'sinon';
import {expect} from 'chai';

describe('route-view ERROR', function() {
  beforeEach(function() {
    this.testContainer = getTestContainer();
    this.mws = [];
    const response = {
      matchedRoute: {
        resolve() {
          return Promise.reject('rejected');
        }
      }
    };
    stub(routerInstance, 'after').callsFake((fn) => {
      this.mws.push(spy(fn));
    });
    stub(routerInstance, 'navigate').callsFake(() => {
      this.mws.forEach((mw) => mw(response, response, ()=>{}));
    });

    render(html`
      <route-view id="RouterViewErrorTestFixture"></route-view>
    `, this.testContainer);
    this.viewElement = this.testContainer.querySelector('#RouterViewErrorTestFixture');
    spy(this.viewElement, 'render');
  });

  afterEach(function() {
    this.viewElement.render.restore();
    routerInstance.after.restore();
    routerInstance.navigate.restore();
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
        routerInstance.after(() => {
          setTimeout(() => {
            expect(this.viewElement.render.called).to.true;
            resolve();
          }, 500);
        });
        routerInstance.navigate('/');
      });
    } catch (e) {
      return Promise.reject(e);
    }
  });
});
