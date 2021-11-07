import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

type PrivateRouteProps = {
    token: String | null,
    path: String
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ token, children, ...rest }) => {

    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;