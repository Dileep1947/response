import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/ResponseReducer";

export const AppNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clearFeedUref = () => {
    dispatch(updateRenderAction({}));
    history.push("/response-upsert");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">DEVELOPER COMMUNITY APP</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse respId="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/response-list">
            Response List
          </Nav.Link>
          <Nav.Link onClick={clearFeedUref}>Response Upsert</Nav.Link>
          {/* <Nav.Link onClick={signOut}>SIGN OUT</Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};