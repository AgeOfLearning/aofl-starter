import {template} from './template';
import styles from './template.css';
import {AoflElement, html, customElement} from '@aofl/web-components/aofl-element';
import {routerInstance} from '@aofl/router';

/**
 *
 * @class RouteViewElement
 * @extends {AoflElement}
 */
@customElement('route-view')
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
          const t = `<${component.default.is}></${component.default.is}>`;
          this.template = () => html([t]);
          this.requestUpdate();
          next(request, response, next);
        })
        .catch((e) => {});
    });
  }

  /**
   *
   *
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

export default RouteViewElement;
