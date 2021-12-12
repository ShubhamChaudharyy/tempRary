import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Navigate } from 'react-router'
import Signup from './Components/Auth/Signup.js';
import Profile from './Components/Profile';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Auth/Login'
import PrivateRoute from './Components/PrivateRoute'
import AuthProvider, { AuthContext } from './Components/Auth/AuthContext';
import ML from './Components/ML'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route path='/' component={Dashboard} exact/>
        <Route path='/dashboard' component={Dashboard} exact/>
        <Route path='/signup' component={Signup} exact/>
        <Route path='/login' component={Login} exact/>
      </Switch>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
