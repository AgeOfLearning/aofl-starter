export const template = (context, html) => html`
<a href="${context.href}" @click="${(e) => context.clickHandler(e)}">
  <slot></slot>
</a>
`;
