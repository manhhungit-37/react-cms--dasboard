import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  role: state.user?.user?.role
})
function RoleRoute({ role, requiredRoles, children }) {
  const history = useHistory();
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if(!role) return;
    const checkRole = requiredRoles.includes(role)
    if(!checkRole) {
      // do something -> navigate eror 404 -> access denied
      history.replace('/report');
      return;
    };

    setPermission(checkRole);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  return <>{permission && children}</>
}

export default connect(mapStateToProps, null)(RoleRoute);
