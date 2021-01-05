// import {DashboardPage} from '../../views';
import { RootPage, SystemAssignment } from '@dtap/ui-core-components';
import React from "react";

export default (params?: any): any[] => {
  const route = [
    {
      name: "operation",
      exact: true,
      path: "/:appName/projects/:projectId/acquisitions/",
      component: () => <div>Acquisitions Page</div>
    },
    {
      name: "operation",
      exact: true,
      path: "/:appName/invoice/:projectId/:action/:layoutName/:taskKeyDef+",
      component: () => <div>invoice</div>
    },
    {
      name: "system",
      exact: true,
      path: "/:appName/role-assignment/",
      component: SystemAssignment
    },
    {
      name: "home",
      exact: true,
      path: "/home",
      // component: () => <div>Dashboard Page</div>
      component: RootPage
    },
    {
      name: "home",
      exact: true,
      path: "/",
      // component: () => <div>Dashboard Page</div>
      component: RootPage
    }
  ];
  return route;
};
