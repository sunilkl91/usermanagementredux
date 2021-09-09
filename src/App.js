import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import HomePage from './components/HomePage';
import { PrivateRoute } from './components/PrivateRoute';
 import { Provider } from 'react-redux';
 import { useStore } from './redux/store';

function App({ Component, pageProps }) {
  const store = useStore(pageProps)
  return (
     <Provider store={store}>
    <div className="container">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          {<Route path="/login" component={Login} />}
          <Route path="/register" component={Registration} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
     </Provider>
  );
}

export default App;
