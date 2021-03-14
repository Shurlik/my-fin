import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CountDetailed from "../components/CountDetailed";
import Counts from "../components/Counts";

export default function Router() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Counts} />
                <Route exact path="/:name" component={CountDetailed} />
                <Redirect exact from="*" to="/" />
            </Switch>
        </>
    );
}
