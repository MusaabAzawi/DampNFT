const { expect } = require("chai");
const {ethers} = require("hardhat");


describe("This is the main testing scope", function(){
    let signer,signerAddress
    let tokenId = 1;
    const tokenURI1 = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
    it("should mint an NFT contract ", async function (){
        const DampNFT = await ethers.getContractFactory("DampNFT");
        const NFT = await DampNFT.deploy()
        await NFT.deployed()
        signer = ethers.provider.getSigner(0);
        signerAddress = await ethers.provider.listAccounts();
        console.log("The deployed NFT contract is", NFT.address);
        
    });
  
})