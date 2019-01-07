import {template} from './template';
import styles from './template.css';
import AoflElement from '@aofl/web-components/aofl-element';
import {routerInstance} from '@aofl/router';

const LEADING_SLASH_REGEX = /^\//;
const PUBLIC_PATH_REGEX = new RegExp('^' + __webpack_public_path__); // eslint-disable-line

/**
 *
 * @class LinkToElement
 * @extends {AoflElement}
 */
class LinkToElement extends AoflElement {
  /**
   *
   * Creates an instance of LinkToElement.
   */
  constructor() {
    super();
    this.href = '';
  }
  /**
   *
   * @readonly
   */
  static get is() {
    return 'link-to';
  }
  /**
   * @return {Object}
   */
  static get properties() {
    return {
      href: String,
      reflect: true
    };
  }
  /**
   * @param {Event} e
   * @return {void}
   */
  clickHandler(e) {
    e.preventDefault();
    routerInstance.navigate(this.href);
  }
  /**
   *
   * @param {String} name
   * @param {*} oldValue
   * @param {*} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'href') {
      const href = this.href.replace(PUBLIC_PATH_REGEX, '').replace(LEADING_SLASH_REGEX, '');
      this.href = __webpack_public_path__ + href; // eslint-disable-line
    }
  }
  /**
   *
   * @return {Object}
   */
  render() {
    if (location.pathname === this.href) {
      this.classList.add('active');
    } else {
      this.classList.remove('active');
    }

    return super.render(template, [styles]);
  }
}

customElements.define(LinkToElement.is, LinkToElement);

export default LinkToElement;
