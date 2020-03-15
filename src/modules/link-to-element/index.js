import {AoflElement, property, customElement} from '@aofl/element';
import {routerInstance, PathUtils} from '@aofl/router';
import {environment} from '../constants-enumerate';

/**
 * @private
 * @type {RegExp}
 */
const PUBLIC_PATH_REGEX = new RegExp('^' + environment.PUBLIC_PATH, 'i');

/**
 * @extends {AoflElement}
 */
@customElement('link-to')
class LinkToElement extends AoflElement {
  /**
   * @type {String}
   * @readonly
   */
  static is = 'link-to';
  /**
   * @type {String}
   */
  @property({converter(value) {
    const href = PathUtils.removeLeadingSlash(value.replace(PUBLIC_PATH_REGEX, ''));
    return '/' + PathUtils.removeLeadingSlash(environment.PUBLIC_PATH + href, '');
  }})
  href = '';
  /**
   * @type {Boolean}
   */
  @property({type: Boolean})
  ['disabled'] = false;
  /**
   * @type {Boolean}
   */
  @property({type: Boolean})
  ['track-url'] = false;
  /**
   * @type {Boolean}
   */
  @property({type: Boolean})
  ['track-url-partial'] = false;
  /**
   * @private
   * @type {Function}
   */
  routerUnsubscribe = () => {};
  /**
   * @private
   * @type {Boolean}
   */
  ctrlClick = false;

  /**
   * @private
   * @type {Function}
   * @param {Event} e
   */
  clickHandler = (e) => {
    if (this.disabled) return;
    if (this.ctrlClick) {
      window.open(this.href, '_blank');
    } else if (location.href.replace(location.origin, '') !== this.href) {
      try {
        routerInstance.navigate(this.href, {
          forceReload: true
        });
      } catch (e) {}
    }
  }
  /**
   * @private
   * @type {Function}
   * @param {Event} e
   */
  keydownHandler = (e) => {
    if (e.which === 17 || e.which === 91) {
      this.ctrlClick = true;
      window.addEventListener('keyup', this.keyupHandler);
    }
  };
  /**
   * @private
   * @type {Function}
   * @param {Event} e
   */
  keyupHandler = (e) => {
    if (e.which === 17 || e.which === 91) {
      this.ctrlClick = false;
      window.addEventListener('keyup', this.keyupHandler);
    }
  };
  /**
   * @private
   * @type {Function}
   * @param {Event} e
   */
  focusHandler = (e) => {
    this.ctrlClick = false;
  }
  /**
   * Check if path matches href.
   *
   * @private
   * @param {String} path
   */
  checkActive(path) {
    const cleanHref = PathUtils.removeTrailingSlash(PathUtils.cleanPath(this.href)) + '/';
    const cleanPath = PathUtils.removeTrailingSlash(PathUtils.cleanPath(path)) + '/';

    if (cleanHref === cleanPath) {
      this.classList.add('active');
    } else if (this['track-url-partial'] && cleanPath.indexOf(cleanHref) === 0) {
      this.classList.add('active');
    } else {
      this.classList.remove('active');
    }
  }
  /**
   *
   */
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('keydown', this.keydownHandler);
    this.addEventListener('click', this.clickHandler);
    window.addEventListener('focus', this.focusHandler);
    if (this['track-url'] || this['track-url-partial']) {
      this.checkActive(location.pathname);
      this.routerUnsubscribe = routerInstance.after((request, response, next) => {
        this.checkActive(response.to);
        next(response);
      });
    }
  }
  /**
   *
   * @return {Object}
   */
  render() {
    return super.render(
      (ctx, html) => html`
        <a href="${ctx.href}" @click="${(e) => e.preventDefault()}">
          <slot></slot>
        </a>`,
      [
        `a {
          display: inherit;
          color: inherit;
          text-decoration: inherit;
          background-color: rgba(0, 0, 0, 0);
        };

        a:hover {
          color: inherit;
          text-decoration: inherit;
        }`
      ]
    );
  }
  /**
   *
   */
  disconnectedCallback() {
    window.removeEventListener('keyup', this.keyupHandler);
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('focus', this.focusHandler);
    this.removeEventListener('click', this.clickHandler);
    this.routerUnsubscribe();
    super.disconnectedCallback();
  }
}

export default LinkToElement;
