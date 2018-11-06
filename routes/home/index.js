/**
 * @route /
 * @title AofL::Home
 * @prerender true
 */
import {template} from './template';
import AoflElement from '@aofl/web-components/aofl-element';
import styles from './template.css';

/**
 *
 * @extends {AoflElement}
 */
class HomePage extends AoflElement {
  /**
   *
   * Creates an instance of HomePage.
   */
  constructor() {
    super();
  }

  /**
   *
   * @readonly
   */
  static get is() {
    return 'home-page';
  }

  /**
   *
   * @return {Object}
   */
  render() {
    return super.render(template, [styles]);
  }
};

customElements.define(HomePage.is, HomePage);

export default HomePage;
