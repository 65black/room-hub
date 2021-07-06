import './Container.scss';

/**
 * This component constrains the width of its descendants
 * to 940px and adds a padding of 24px all around.
 */
function Container({ extraClassNames = '', children }) {
  const className = `container ${extraClassNames}`.trim();
  return <div className={className}>{children}</div>;
}

export default Container;
