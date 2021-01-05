import { redirectApp } from '@dtap/ui-utils';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ErrorBoundary from './error-boundary';
const PublicRouteComponent = ({component: Component, computedMatch, isAuthenticated = false, ...rest}: RouteProps | any) => {
  const encloseInErrorBoundary = (props: any) => {
    if (!computedMatch.isExact) {
      if (process.env['NODE_ENV'] !== 'production') {
        redirectApp("/signin");
      } else {
        return <Redirect
          to={{
            pathname: '/signin'
          }}
        />
      }
    } else if (computedMatch.path === '/signin' && isAuthenticated) {
      if (process.env['NODE_ENV'] === 'production') {
        redirectApp("/home");
        return <></>;
      } else {
        return <Redirect
          to={{
            pathname: '/home'
          }}
        />
      }
    }
    return <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  };

  if (!Component) throw new Error(`A component needs to be specified for path ${(rest as any).path}`);

  return <Route {...rest} render={encloseInErrorBoundary} />;
};

const mapStateToProps = (state: any) => {
  const isAuthenticated = state.authentication.isAuthenticated;
  const statusCode = state.authentication.isAuthenticatedStatusCode;
  return {
    isAuthenticated,
    statusCode
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {},
    dispatch
  )
};
const PublicRoute = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(PublicRouteComponent);

export default PublicRoute;
export { PublicRoute };

