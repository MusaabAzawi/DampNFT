
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyNfts from './MyNfts';
import Home from './Home';



export function App(props) {

  return (


    <BrowserRouter>

      <div className="App">

        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="">NFT Mint Dapp</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Home">Home</Nav.Link>
              <Nav.Link as={Link} to="/MyNfts">My NFT's</Nav.Link>

            </Nav>
            <Button variant="outline-light">Connect Wallet</Button>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/MyNfts" element={<MyNfts />} />

        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
