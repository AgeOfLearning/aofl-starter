import {template} from './template';
import styles from './template.css';
import {AoflElement, property, customElement} from '@aofl/web-components/aofl-element';
import {routerInstance} from '@aofl/router';

const LEADING_SLASH_REGEX = /^\//;
const PUBLIC_PATH_REGEX = new RegExp('^' + __webpack_public_path__); // eslint-disable-line

/**
 *
 * @class LinkToElement
 * @extends {AoflElement}
 */
@customElement('link-to')
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
  static is = 'link-to';
  /**
   * @return {Object}
   */
  @property({type: String})
  href = '';

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

export default LinkToElement;
