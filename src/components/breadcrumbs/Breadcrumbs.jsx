import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { AuthButton } from '../route-guards/RouteGuards';

import './Breadcrumbs.scss';

function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__links">
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

      <AuthButton />
    </div>
  );
}

export default Breadcrumbs;
