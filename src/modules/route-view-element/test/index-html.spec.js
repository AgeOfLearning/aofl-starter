/* eslint babel/no-invalid-this: "off" */
import {html, render} from 'lit-html';
import {routerInstance} from '@aofl/router';
import '..';
import {expect} from 'chai';
import {spy, stub} from 'sinon';

const pageElem = 'div';
describe('route-view', function() {
  beforeEach(function() {
    this.testContainer = getTestContainer();
    this.mws = [];
    const response = {
      matchedRoute: {
        resolve() {
          return Promise.resolve({
            default: {
              is: pageElem
            }
          });
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
      <route-view id="ViewTestFixture"></route-view>
    `, this.testContainer);

    this.viewElement = this.testContainer.querySelector('#ViewTestFixture');
  });

  afterEach(function() {
    routerInstance.after.restore();
    routerInstance.navigate.restore();
  });

  it('Should register router middleware', async function() {
    try {
      await this.viewElement.renderComplete;
      routerInstance.navigate('/');
      await this.viewElement.renderComplete;
      expect(this.mws.every((mw) => typeof mw.args[0] === 'object')).to.equal(true);
    } catch (e) {
      return Promise.reject(e);
    }
  });
});
