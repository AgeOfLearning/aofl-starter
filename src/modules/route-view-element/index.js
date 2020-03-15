import {template} from './template';
import styles from './template.css';
import {AoflElement, customElement} from '@aofl/element';
import {html} from 'lit-html';
import {routerInstance} from '@aofl/router';

/**
 * @extends {AoflElement}
 */
@customElement('route-view')
class RouteViewElement extends AoflElement {
  /**
   * Creates an instance of RouteViewElement.
   */
  constructor() {
    super();
    this.template = template;
    routerInstance.after((request, response, next) => {
      response.matchedRoute.resolve()
        .then((component) => {
          document.title = response.matchedRoute.title;
          const t = `<${component.default.is}></${component.default.is}>`;
          this.template = () => html([t]);
          this.requestUpdate();
          next(response);
        })
        .catch((e) => {});
    });
  }
  /**
   *
   * @type {String}
   * @readonly
   */
  static is = 'route-view';
  /**
   *
   *
   * @param {Array} args
   */
  connectedCallback(...args) {
    super.connectedCallback(...args);

    /* istanbul ignore next */
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    /* istanbul ignore else */
    if (typeof aofljsConfig.__prerender__ === 'undefined') {
      this.classList.add('loaded');
    }
  }
  /**
   *
   * @return {Object}
   */
  render() {
    return super.render(this.template, [styles]);
  }
}

export default RouteViewElement;
