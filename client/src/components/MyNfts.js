import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


function MyNfts() {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    // Fetch NFT data from the API
    const fetchNFTs = async () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYTJkZjFhOS00NDEyLTQyMDctOTRjNy0yYzlkNDg2NTc0OGMiLCJlbWFpbCI6Im11c2FhYmF6YXdpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwZjcyYWFhNTQ2ZmZmMTQ1ZjE4MCIsInNjb3BlZEtleVNlY3JldCI6IjlmZWRlOTEyYjNhZmQyMWFmZTQxNjdjM2MyYWNjMTY2Y2YwMGU0NjEzMmM5M2VhYmY3NDZiMjUxOTM0YmJiNzkiLCJpYXQiOjE2OTM5MjE2MDl9.N6zdV6QMeuUkKdVlXg5-yHB2ybkWSF1ZHhecSM5IGws'
            }
          };

      try {
        const response = await fetch('https://api.pinata.cloud/data/pinList', options);
        const data = await response.json();
        setNFTs(data.rows); // Assuming the images are in the 'rows' property of the response
        console.log(data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNFTs();
  }, []);

  return (

    <Container fluid>
    <Row>
    {nfts.map((nft, index) => (
    <Col key={index} xs={6} md={4}>

    <Image src={`https://ipfs.io/ipfs/${nft.ipfs_pin_hash}`} thumbnail />
 
  </Col>
    ))}
    </Row>
    </Container>
 
  );
}

export default MyNfts;
