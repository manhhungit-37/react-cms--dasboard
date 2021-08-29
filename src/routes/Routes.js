import React from 'react';
import { Route, Switch } from 'react-router-dom';

// config
import { ROLES } from 'configs/roles'
 
import RoleRoute from './RoleRoute';

// views
const Photo = React.lazy(() => import('views/photo'));
const PhotoDetail = React.lazy(() => import('views/photo/PhotoDetail'));
const PhotoAddEdit = React.lazy(() => import('views/photo/PhotoAddEdit'));
const Report = React.lazy(() => import('views/report'));
const Kanban = React.lazy(() => import('views/kanban'));
const Member = React.lazy(() => import('views/member'));
const MemberAddEdit = React.lazy(() => import('views/member/MemberAddEdit'));
const User = React.lazy(() => import('views/user'));

const routesConfig = [
  {
    path: '/photo/list',
    component: Photo,
    requiredRoles: [ROLES.ADMIN, ROLES.OPERATOR]
  },
  {
    path: '/photo/add',
    component: PhotoAddEdit,
    requiredRoles: [ROLES.ADMIN]
  },
  {
    path: '/photo/edit/:id',
    component: PhotoAddEdit,
    requiredRoles: [ROLES.ADMIN]
  },
  {
    path: '/photo/:id',
    component: PhotoDetail,
    requiredRoles: [ROLES.ADMIN, ROLES.OPERATOR]
  },
  {
    path: '/kanban',
    component: Kanban,
    requiredRoles: [ROLES.ADMIN, ROLES.OPERATOR]
  },
  {
    path: '/member/add',
    component: MemberAddEdit,
    requiredRoles: [ROLES.ADMIN]
  },
  {
    path: '/member/:id',
    component: MemberAddEdit,
    requiredRoles: [ROLES.ADMIN, ROLES.OPERATOR]
  },
  {
    path: '/member',
    component: Member,
    requiredRoles: [ROLES.ADMIN, ROLES.OPERATOR]
  },
  {
    path: '/user',
    component: User,
    requiredRoles: [ROLES.ADMIN, ROLES.OPERATOR]
  },
  {
    path: '/report',
    component: Report,
    requiredRoles: [ROLES.ADMIN, ROLES.OPERATOR]
  },
  {
    path: '/',
    component: Report,
    requiredRoles: [ROLES.ADMIN, ROLES.OPERATOR]
  },
]

function Routes() {
  return (
    <Switch>  
      {routesConfig.map((route, index) => {
        const Component = route.component;
        return (
          <Route key={`routes-${index}`} path={route.path} render={props => (
            <RoleRoute requiredRoles={route.requiredRoles}>
              <Component {...props} />
            </RoleRoute>
          )} />
        )
      })}
    </Switch>
  )
}

export default Routes
