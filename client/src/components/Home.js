import React from "react";
import { useState } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Form,InputGroup} from 'react-bootstrap';
const ethers = require("ethers")

function Home() {
  const [file, setFile] = useState()
  const [WalletAddress, setWalletAddress] = useState("");
  const [myipfsHash, setIPFSHASH] = useState('');
  const [hash, setHash] = useState('');

  const Abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "NFTOwner",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "tokenURI",
          "type": "string"
        }
      ],
      "name": "mintNFT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const ContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  console.log(ContractAddress)


  const handleFile=async (fileToHandle) =>{



    console.log('starting')

    // initialize the form data
    const formData = new FormData()

    // append the file form data to
    formData.append("file", fileToHandle)

    // call the keys from .env

    const API_KEY = process.env.REACT_APP_API_KEY
    const API_SECRET = process.env.REACT_APP_API_SECRET

    // the endpoint needed to upload the file
    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios.post(
      url,
      formData,
      {
          maxContentLength: "Infinity",
          headers: {
              "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
              'pinata_api_key': API_KEY,
              'pinata_secret_api_key': API_SECRET

          }
      }
  )

  console.log(response);

  // get the hash
  setIPFSHASH(response.data.IpfsHash);
  console.log(response.data.IpfsHash);




  }

  async function requestAccount(){
    console.log("requesting Account..");

    if(window.ethereum){
      console.log('Metamask detected');
      try{
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0])
      }catch(error){
        console.log("Error connection")
      }

    }else{
      alert('Metamask not detected ')
    }
  }

  async function connectWallet(){
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
	  await provider.send("eth_requestAccounts",[]);
	  const balance = await provider.getBalance("ethers.eth")
	  ethers.utils.formatEther(balance);
      const NftContract = new ethers.Contract(ContractAddress, Abi, provider.getSigner());


      var mintNFT = NftContract.balanceOf("0x88d53194B065ddfF96020a202dE44314E57f160d");

          mintNFT.then(function(transaction){
            console.log(transaction.toString());
          });

    }
  }

  async function Mint(props){
	console.log("im here");
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const NftContract = new ethers.Contract(ContractAddress, Abi, provider.getSigner());
	const recipient = WalletAddress
	const tokenURI = myipfsHash;
	const transaction = await NftContract.mintNFT(recipient,tokenURI);
	const txReceipt = await transaction.wait();
	console.log(txReceipt);

  }

    return( 
    <div>
    <button
     onClick={requestAccount}
     > Connect Wallet </button>
     <h3>Wallet Address: {WalletAddress}</h3>
      
	 
      <br />

	  <InputGroup className="mb-3">
	  <Form.Control
		placeholder="Recipient's username"
		aria-label="Recipient's username"
		aria-describedby="basic-addon2"
		onChange={(event) =>setWalletAddress(event.target.value)}
		value={WalletAddress}
	  />

	<Form.Control
	placeholder="Hash key"
	aria-label="Recipient's username"
	aria-describedby="basic-addon2"
	onChange={(event) =>setIPFSHASH(event.target.value)}
	value={myipfsHash}
	/>
	  <Button onClick={()=>Mint()} variant="outline-secondary" id="button-addon2">
		Mint
	  </Button>
	</InputGroup>

	

      <input style={{display: 'block',width : '50%',marginRight: 'auto', marginLeft:'auto' , border:'2px solid blue', padding: '5px', textAlign: 'center'}} type="file" onChange={(event)=>setFile(event.target.files[0])}/>
      <button style={{display:'block',marginRight:'auto',marginLeft:'auto', padding:'10px'}}  onClick={()=>handleFile(file)}>Pin</button>


    {

      //  render the hash
      myipfsHash.length > 0 && <image height='200' src={`https://gateway.pinata.cloud/ipfs/${myipfsHash}`} alt='not loading' thumbnail="true"/>
    }
    </div>
    )
}

export default Home;
