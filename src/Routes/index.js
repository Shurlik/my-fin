import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CountDetailed from "../components/CountDetailed";
import Counts from "../components/Counts";

export default function Router() {
    return (
        <>
            <Switch>
                <Redirect exact from='/' to='/counts' />
                <Route exact path="/counts" component={Counts} />
                <Route exact path="/counts/:name" component={CountDetailed} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    );
}
