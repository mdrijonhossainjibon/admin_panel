import { Routes } from 'constants/routes';
import { useAuthContext } from 'context/auth-context';
import React, { ComponentType, FC } from 'react';
import { Route,     Redirect, RouteProps } from 'react-router-dom';
 

 

 // @ts-ignore
const renderMergedProps = (component : ComponentType<any> , ...rest) => {
    const theProps = Object.assign({}, ...rest);
    return React.createElement(component, theProps);
  };


  interface PrivateRouteProps extends RouteProps {
    component: ComponentType<React.ReactNode>;
  }

export const PrivateRoute :FC<PrivateRouteProps> = ({ component  , ...rest }) => {
     
  const { uid , role   } =  useAuthContext();
    
   
    return (
      <Route
        {...rest}
        render={(props) => uid &&  role  ?  (  renderMergedProps(component, props, rest) )  :  <Redirect to={{ pathname: Routes.Login, state: { from: props.location } }} />
        }
      />
    );
  };


  export const PublicRoute :FC<PrivateRouteProps>  = ({ component, ...rest }) => {
    const { authorized } =  useAuthContext();
  
    return (
      <Route
        {...rest}
        render={(props) =>
          authorized ? (
            <Redirect to={{ pathname: Routes.Dashboard, state: { from: props.location } }} />
          ) : (
            renderMergedProps(component, props, rest)
          )
        }
      />
    );
  };
  