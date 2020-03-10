import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Semantic UI
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

import './App.css';

// Components
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

// utils
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/login" component={Login} />
          {/* <Route exact path="/posts/:postId" component={SinglePost} /> */}
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
