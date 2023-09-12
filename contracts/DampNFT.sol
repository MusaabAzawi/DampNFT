//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract DampNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable owner;


    mapping(address => uint[])public NFTOwner;

    constructor() ERC721("DampNFT","DN"){
      owner = payable(msg.sender);
    }

    function getBalance() public view returns(uint256 balance){
      return address(owner).balance;
    }

     
    function mintNFT(address recipient,string memory tokenURI) public returns(uint){
         _tokenIds.increment();
         uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        NFTOwner[msg.sender].push(newItemId);
        return newItemId;
    }

}
