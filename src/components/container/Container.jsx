import React from 'react';
import { arrayOf, node, oneOfType, string } from 'prop-types';

import './Container.scss';

/**
 * This component constrains the width of its descendants
 * to 940px and adds a padding of 24px all around.
 */
function Container({ extraClassNames, children }) {
  const className = `container ${extraClassNames}`;
  return <div className={className}>{children}</div>;
}

Container.propTypes = {
  extraClassNames: string,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

Container.defaultProps = {
  extraClassNames: '',
};

export default Container;
