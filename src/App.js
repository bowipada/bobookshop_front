import React from 'react';
import './App.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';
import { routes } from "./router";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./redux/store";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lime
  }
});

function RouterView(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            {routes.map((route, i) => (
              <RouterView key={i} {...route} />
            ))}
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
