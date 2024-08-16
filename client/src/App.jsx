
// import Register from "./components/Register"
// import Login from "./components/Login";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { HomeScreen } from "./screens/HomeScreen";
// import Hero from "./components/Hero";

function App() {


  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App
