import { lazy, Suspense } from "react";
import { Redirect, BrowserRouter as Router, Switch } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import { PrivateRoute, PublicRoute } from "Routes";
import { Routes } from "constants/routes";
import { AuthContextProvider } from "context/auth-context";
import { ErrorContextProvider } from "context/error-context";
import { LoadingSpinner } from "components/LoadingSpinner";

const login = lazy(() => import("components/page/auth"));
const dashboard = lazy(() => import("components/page/dashboard"));
const devOps = lazy(() => import('components/page/devops'));
const ConfigurationsLayouts = lazy(() => import('components/page/configuration/ConfigurationsLayouts'));
const usersLayout = lazy(() => import('components/page/users'));
const operations = lazy(() => import('components/page/operations/OperationsLayout'));
const chat = lazy(() => import('components/page/chat'))
const ComponentMail = lazy(() => import('components/page/auth/Email'))
const ComponentEmail_Verified = lazy(() => import('components/page/auth/Email_Verified'));
const Suspended = lazy(() => import('components/page/auth/Suspended'))
const Access_Restricted = lazy(() => import('components/page/auth/Access_Restricted'))
const Maintenance = lazy(() => import('components/page/auth/Maintenance'));
const InternalServerError  = lazy(() => import('components/InternalServerError'));
function App() {
  return (
    <Router>
      <Suspense
        fallback={<LoadingSpinner />}
      >
        <AuthContextProvider>
          <ErrorContextProvider>
            <MainLayout>
              <Switch>
                <PublicRoute exact path={Routes.Login} component={login} />
                <PrivateRoute path={Routes.Dashboard} component={dashboard} />
                <PrivateRoute path={Routes.Users} component={usersLayout} />
                <PrivateRoute path={Routes.Configuration} component={ConfigurationsLayouts} />
                <PrivateRoute path={Routes.Operations} component={operations} />
                <PrivateRoute path={Routes.Devops} component={devOps} />
                <PrivateRoute path={Routes.chat} component={chat} />
                <PublicRoute path={'/email/verify'} component={ComponentMail} />
                <PublicRoute path={Routes.Emailverification} component={ComponentEmail_Verified} />
                <PublicRoute path={'/suspended'} component={Suspended} />
                <PublicRoute path={'/access_restricted'} component={Access_Restricted} />
                <PublicRoute path={'/maintenance'} component={Maintenance} />
                 <PublicRoute path={ Routes.InternalServerError }   component={ InternalServerError  }  />
                <Redirect to={Routes.Dashboard} />
              </Switch>
            </MainLayout>
          </ErrorContextProvider>


        </AuthContextProvider>


      </Suspense>
    </Router>
  );
}

export default App;
