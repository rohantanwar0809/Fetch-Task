import {Switch,Route,Redirect} from 'react-router-dom';
import PageOne from './pages/PageOne/PageOne';
import PageTwo from './pages/PageTwo/PageTwo';
import {Container} from 'react-bootstrap';
import styles from './App.module.scss'
function App() {
  return (
    <Container className={`${styles.container} m-lg-4`}>
      <Switch>
          <Route path="/page-two" exact>
            <PageTwo />
          </Route>
          <Route path="/" exact>
            <PageOne/>
          </Route>
          <Redirect to="/"/>
        </Switch>
    </Container>
  );
}

export default App;
