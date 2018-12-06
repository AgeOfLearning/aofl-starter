/* eslint no-invalid-this: "off" */
import {html, render} from 'lit-html';
import {routerInstance} from '@aofl/router';
import '..';

const pageElem = 'div';
describe('route-view', function() {
  before(function() {
    this.testContainer = getTestContainer();
    this.routerInstance = routerInstance;
  });

  beforeEach(function() {
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

    sinon.stub(this.routerInstance, 'after').callsFake((fn) => {
      this.mws.push(sinon.spy(fn));
    });
    sinon.stub(this.routerInstance, 'navigate').callsFake(() => {
      this.mws.forEach((mw) => mw(response, response, ()=>{}));
    });

    render(html`
      <test-fixture id="ViewTestFixture">
        <template>
          <route-view></route-view>
        </template>
      </test-fixture>
    `, this.testContainer);

    this.viewElement = fixture('ViewTestFixture');
  });

  afterEach(function() {
    this.routerInstance.after.restore();
    this.routerInstance.navigate.restore();
  });

  it('Should register router middleware', async function() {
    try {
      await this.viewElement.renderComplete;
      this.routerInstance.navigate('/');
      await this.viewElement.renderComplete;
      expect(this.mws.every((mw) => typeof mw.args[0] === 'object')).to.equal(true);
    } catch (e) {
      return Promise.reject(e);
    }
  });
});
