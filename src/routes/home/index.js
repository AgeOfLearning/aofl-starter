/**
 * @route /
 * @title AofL::Home
 * @prerender false
 */
import {template} from './template';
import {AoflElement, customElement} from '@aofl/element';
import styles from './template.css';

/**
 * @extends {AoflElement}
 */
@customElement('home-page')
class HomePage extends AoflElement {
  /**
   * @type {String}
   * @static
   * @readonly
   */
  static is = 'home-page';
  /**
   * @protected
   * @return {Object}
   */
  render() {
    return super.render(template, [styles]);
  }
}

export default HomePage;
