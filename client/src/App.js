import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router} from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import PageNotFound from "./pages/notyeat/notYeat";
function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/register"> {user ? <Home/> :<Register/> } </Route>
        <Route exact path="/login"> {user ? <Home/> :<Login/> } </Route>
        <Route exact path="/write"> {user ? <Write/> :<Register/> } </Route>
        <Route exact path="/settings"> {user ? <Settings/> :<Register/> } </Route>
        <Route path="/contact"> 
          <PageNotFound/>
        </Route>
        <Route path="/post/:postId"> 
          <Single/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
