/**
 * @route /
 * @title AofL::Home
 * @prerender false
 */
import {template} from './template';
import {AoflElement, customElement} from '@aofl/web-components/aofl-element';
import styles from './template.css';

/**
 *
 * @extends {AoflElement}
 */
@customElement('home-page')
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
  static is = 'home-page';

  /**
   *
   * @return {Object}
   */
  render() {
    return super.render(template, [styles]);
  }
}

export default HomePage;
