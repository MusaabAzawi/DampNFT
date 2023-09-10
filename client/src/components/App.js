
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav} from 'react-bootstrap';
import { BrowserRouter, Route,Routes, Link } from 'react-router-dom';
import MyNfts from './MyNfts';
import Home from './Home';



function App() {

  return (

	
	<BrowserRouter>
	
    <div className="App">

    <Navbar bg="dark" variant="dark">
       <Container>
       <Navbar.Brand href="./Home">NFT Mint Dapp</Navbar.Brand>
       <Nav className="me-auto">
         <Nav.Link as={Link} to="/Home">Home</Nav.Link>
		 <Nav.Link as={Link} to="/MyNfts">My NFT's</Nav.Link>

       </Nav>
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
