import React from 'react';
import swal from 'sweetalert';
import {Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import Login from './components/auth/Login';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import List from './components/stocks/List';

function App() {
  function handleLogout(){
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem('authToken')
        setTimeout(() => {
          window.location.reload()
          window.location.href = "/"
        }, 500);
      }
    })
  }
  return (
    <BrowserRouter>
       <div className="container-fluid">
        {
          localStorage.getItem('authToken') ?
          (
            <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="/stocks">Stock Listing</Navbar.Brand>
              <Nav.Item className="ml-auto">
                <Link to="#" onClick={handleLogout} className="ml-2">Logout</Link>
              </Nav.Item>
            </Navbar>
          ) 
          : 
          (
            <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="/">Stock Listing</Navbar.Brand>
              <Nav.Item className="ml-auto">
              </Nav.Item>
            </Navbar>
          )
        }

      <Switch>
        <Route path="/" exact={true} component={Login}/>
        <PrivateRoute path="/stocks" exact={true} component={List} />
      </Switch>

      </div>
    </BrowserRouter>
  )
}

export default App;
