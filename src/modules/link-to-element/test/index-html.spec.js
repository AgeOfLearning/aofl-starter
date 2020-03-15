/* eslint babel/no-invalid-this: "off" */
import {html, render} from 'lit-html';
import {routerInstance} from '@aofl/router';
import {environment} from '../../constants-enumerate';
import '../';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('link-to', function() {
  before(function() {
    this.pathname = location.pathname;
    this.routerInstance = routerInstance;
    this.routerInstance.init({
      routes: [
        {
          resolve: () => Promise.resolve(),
          rotation: 'routes',
          path: '/',
          dynamic: false,
          title: '',
          locale: 'en-US',
          template: 'main'
        },
        {
          resolve: () => Promise.resolve(),
          rotation: 'routes',
          path: '/login/',
          dynamic: false,
          title: '',
          locale: 'en-US',
          template: 'main'
        }
      ]
    });
    this.mockFireEvent = (el) => {
      const clickEvent = new Event('click');
      el.dispatchEvent(clickEvent);
    };
  });

  beforeEach(async function() {
    this.testContainer = getTestContainer();

    render(html`
      <link-to id="LinkToBasicTestFixture" href="/login">Login</link-to>
      <link-to id="LinkToTrackTestFixture" href="/login" track-url>Login</link-to>
      <link-to id="LinkToSameUrlTestFixture" href="${location.pathname}" track-url>CurrentPage</link-to>
    `, this.testContainer);

    this.element = this.testContainer.querySelector('#LinkToBasicTestFixture');
    this.elementTrack = this.testContainer.querySelector('#LinkToTrackTestFixture');
    this.sameUrlElement = this.testContainer.querySelector('#LinkToSameUrlTestFixture');

    const promises = [
      this.element.updateComplete,
      this.elementTrack.updateComplete,
      this.sameUrlElement.updateComplete
    ];

    await Promise.all(promises);

    spy(this.routerInstance, 'navigate');
    spy(this.routerInstance, 'after');
    spy(this.element, 'checkActive');
    spy(this.elementTrack, 'checkActive');
    spy(this.elementTrack, 'routerUnsubscribe');
  });

  afterEach(function() {
    this.routerInstance.navigate.restore();
    this.routerInstance.after.restore();
    this.element.checkActive.restore();
    this.elementTrack.checkActive.restore();
    this.elementTrack.routerUnsubscribe.restore();
    window.history.pushState(null, null, this.pathname);
  });

  it('Should render', function() {
    expect(this.element.shadowRoot).to.not.equal(null);
    expect(this.element.href).to.equal(environment.PUBLIC_PATH + 'login');
  });

  it('Should call router navigate when clicked', async function() {
    this.mockFireEvent(this.element, 'click');
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(this.routerInstance.navigate.called).to.be.true;
        resolve();
      }, 50);
    });
  });

  it('should not have an .active class without track-url attribute', function() {
    expect(this.element.classList.contains('active')).to.be.false;
  });

  it('should not have an .active class with track-url attribute', function() {
    expect(this.elementTrack.classList.contains('active')).to.be.false;
  });

  it('should call checkActive when router middleware executes', async function() {
    await this.routerInstance.navigate('/');
    expect(this.elementTrack.checkActive.called).to.be.true;
  });
  it('should not call checkActive when router middleware executes without track-url attribute', async function() {
    await this.routerInstance.navigate('/');
    expect(this.element.checkActive.called).to.be.false;
  });

  it('should do nothing if the anchor in the shadowdom is clicked', async function() {
    const anchor = this.element.shadowRoot.querySelector('a');
    this.mockFireEvent(anchor, 'click');
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(this.routerInstance.navigate.called).to.be.false;
        resolve();
      }, 50);
    });
  });

  it('should not unsubscribe from router when element disconnects', function() {
    this.element.parentNode.removeChild(this.element);
    expect(this.routerInstance.after.called).to.be.false;
  });

  it('should unsubscribe from router when tracking element disconnects', function() {
    this.elementTrack.parentNode.removeChild(this.elementTrack);
    expect(this.elementTrack.routerUnsubscribe.called).to.be.true;
  });
});
