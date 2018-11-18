import {template} from './template';
import styles from './template.css';
import AoflElement from '@aofl/web-components/aofl-element';
import {routerInstance} from '@aofl/router';

const LEADING_SLASH_REGEX = /^\//;
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
    this.publicPath = __webpack_public_path__; // eslint-disable-line
    this.publicPathRegex = new RegExp('^' + this.publicPath);
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
      const href = this.href.replace(this.publicPathRegex, '').replace(LEADING_SLASH_REGEX, '');
      this.href = this.publicPath + href;
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
