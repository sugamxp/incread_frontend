import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";

import StatsComponent from "./components/stats/stats-component";
import TagArticlesComponent from "./components/tag-articles/tag-articles-component";
import LoginComponent from "./components/onboarding/login-component";
import UserNameComponent from "./components/onboarding/username-component";
import PrioritizeListComponent from "./components/prioritize-list/prioritize-list-component";
import ReadingCompleteComponent from "./components/reading-complete/reading-complete-component";
import { CookiesProvider, withCookies } from "react-cookie";
import { Provider } from "react-redux";
import store from "./redux/store";
import TaggingCompleteComponent from "./components/tagging-complete/tagging-complete-component";
class App extends Component {
  componentDidMount() {
    const { history } = this.props;

    history.listen((newLocation, action) => {
      if (action === "PUSH") {
        if (
          newLocation.pathname !== this.currentPathname ||
          newLocation.search !== this.currentSearch
        ) {
          // Save new location
          this.currentPathname = newLocation.pathname;
          this.currentSearch = newLocation.search;

          // Clone location object and push it to history
          history.push({
            pathname: newLocation.pathname,
            search: newLocation.search
          });
        }
      } else {
        // Send user back if they try to navigate back
        history.go(1);
      }
    });
  }

  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        this.props.cookies.get("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  render() {
    return (
      <Provider store={store}>
        <CookiesProvider>
          <Switch>
            <Route exact path="/" component={LoginComponent} />
            <Route exact path="/stats" component={StatsComponent} />
            <Route exact path="/username" component={UserNameComponent} />
            <Route
              exact
              path="/tag-articles"
              component={TagArticlesComponent}
            />
            <Route
              exact
              path="/prioritize-list"
              component={PrioritizeListComponent}
            />

            <Route
              exact
              path="/tagging-complete"
              component={TaggingCompleteComponent}
            />

            <Route
              exact
              path="/reading-complete"
              component={ReadingCompleteComponent}
            />
          </Switch>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default compose(withCookies, withRouter)(App);
