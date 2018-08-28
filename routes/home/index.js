/**
 * @route /
 * @title AofL::Home
 * @prerender true
 */
import {template} from './template';
import AoflElement from '@aofl/web-components/aofl-element';
import styles from './styles.css';

/**
 *
 * @class HomePage
 * @extends {AoflElement}
 */
const HomePage = class HomePage extends AoflElement {
  /**
   *
   * Creates an instance of HomePage.
   * @memberof HomePage
   */
  constructor() {
    super();
  }

  /**
   *
   * @readonly
   * @static
   * @memberof HomePage
   */
  static get is() {
    return 'home-page';
  }

  /**
   *
   * @return {Object}
   * @memberof HomePage
   */
  _render() {
    return super._render(template, [window.globalStyles, styles]);
  }
};

customElements.define(HomePage.is, HomePage);

export default HomePage;
