import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { ResponseList } from "./pages/ResponseList";
import { ResponseUpsert } from "./pages/ResponseUpsert";
import { AppNav } from "./pages/AppNav";
import { useSelector } from "react-redux";

function App() {
  const history = useHistory();
  const state = useSelector((state) => state);
  return (
    <>
      <AppNav />
      <Route exact path="/" component={ResponseList} />
      <Route exact path="/response-upsert" component={ResponseUpsert} />
      <Route exact path="/response-list" component={ResponseList} />
    </>
  );
}

export default App;