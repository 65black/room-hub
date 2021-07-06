import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import './Breadcrumbs.scss';

function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map(({ breadcrumb, location }) => {
        return (
          <NavLink
            key={breadcrumb.key}
            className="breadcrumbs__link"
            to={breadcrumb.key}
            data-iscurrent={location.pathname === breadcrumb.key}
          >
            {breadcrumb.props.children}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
