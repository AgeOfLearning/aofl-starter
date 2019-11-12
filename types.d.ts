/**
 * @extends {AoflElement}
 */
declare class LinkToElement extends AoflElement {
    /**
     * @type {String}
     * @readonly
     */
    readonly is: string;
    /**
     * @type {String}
     */
    href: string;
    /**
     * @type {Boolean}
     */
    disabled: boolean;
    /**
     * @type {Boolean}
     */
    track-url: boolean;
    /**
     * @type {Boolean}
     */
    track-url-partial: boolean;
    /**
     *
     */
    connectedCallback(): void;
    /**
     *
     * @return {Object}
     */
    render(): any;
    /**
     *
     */
    disconnectedCallback(): void;
}

/**
 * Creates an instance of RouteViewElement.
 */
declare class RouteViewElement extends AoflElement {
    /**
     *
     * @type {String}
     * @readonly
     */
    readonly is: string;
    /**
     *
     *
     * @param {Array} args
     */
    connectedCallback(...args: any[][]): void;
    /**
     *
     * @return {Object}
     */
    render(): any;
}

/**
 * @extends {AoflElement}
 */
declare class HomePage extends AoflElement {
    /**
     *
     * @type {String}
     * @readonly
     */
    readonly is: string;
    /**
     *
     * @return {Object}
     */
    render(): any;
}

