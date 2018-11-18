import {template} from './template';
import styles from './template.css';
import AoflElement from '@aofl/web-components/aofl-element';
import {routerInstance} from '@aofl/router';
import {html} from '@polymer/lit-element';

/**
 *
 * @class RouteViewElement
 * @extends {AoflElement}
 */
class RouteViewElement extends AoflElement {
  /**
   *
   * Creates an instance of RouteViewElement.
   */
  constructor() {
    super();
    this.template = template;
    routerInstance.after((request, response, next) => {
      response.matchedRoute.resolve()
      .then((component) => {
        document.title = response.matchedRoute.title;
        let t = `<${component.default.is}></${component.default.is}>`;
        this.template = () => html([t]);
        this.requestUpdate();
        next(request, response, next);
      })
      .catch((e) => {
        console.log(e);
      });
    });
  }

  /**
   *
   *
   * @readonly
   */
  static get is() {
    return 'route-view';
  }

  /**
   *
   *
   * @param {Array} args
   */
  connectedCallback(...args) {
    super.connectedCallback(...args);

    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    if (typeof aofljsConfig.__prerender__ === 'undefined') {
      this.classList.add('loaded');
    }
  }
  /**
   *
   * @return {Object}
   * @memberof RouteViewElement
   */
  render() {
    return super.render(this.template, [styles]);
  }
}

customElements.define(RouteViewElement.is, RouteViewElement);

export default RouteViewElement;
