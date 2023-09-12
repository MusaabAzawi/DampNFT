//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract DAMP is ReentrancyGuard{
    event TradeStatusChange(uint256 ad,bytes32 status);

    address payable public owner;
    uint256 immutable listingFee;
    uint256 itemCounter;

    enum Status{LISTED, SOLD, CANCELLED}
    
    struct Item{
        uint256 itemId;
        IERC721 nftContractAddress;
        uint256 tokenId;
        address payable seller;
        uint256 price;
        Status status; // LISTED, SOLD, CANCELLED
    }

    mapping(uint => Item) public items;

    constructor()payable  {
        itemCounter = 0;
        owner = payable(msg.sender);
        listingFee = 0.01 ether;
    }

    function listNft(address nftContractAddress,uint256 tokenId, uint256 _price)public payable{
        //payable(owner).transfer(listingFee);
        require(_price > 0, "Price must greater than 0");
        items[itemCounter] = Item({
            itemId: itemCounter,
            nftContractAddress: IERC721(nftContractAddress),
            tokenId: tokenId,
            seller: payable(msg.sender),
            price: _price,
            status: Status.LISTED});
        IERC721(nftContractAddress).transferFrom(msg.sender, address(this), tokenId);
        itemCounter += 1;
        
        emit TradeStatusChange(itemCounter - 1, "Open");


    }

    function getListeditem(uint256 itemId)public view returns(uint256){
        return items[itemId].tokenId;
    }

    function executeNft(address nftContractAddress,uint256 itemId) public payable nonReentrant {
        Item storage item = items[itemId];
        require(msg.sender != item.seller,"Seller cannot buy their NFT");
      //  require(item.status == Status.LISTED, "Item is not open for trade");
        require(msg.value >=item.price);
        
        items[itemId].status = Status.SOLD;
        IERC721(nftContractAddress).transferFrom(address(this), msg.sender, item.tokenId);
        item.seller.transfer(item.price);
    }


    function cancelTrade(uint256 tokenId) public {
        Item memory item = items[tokenId];
        require( msg.sender == item.seller,"Trade can be cancelled only by poster.");
        
        require(item.status == Status.LISTED, "Trade is not Open.");
        IERC721(items[tokenId].nftContractAddress).transferFrom(address(this), item.seller, item.tokenId);
        items[tokenId].status = Status.CANCELLED;
        emit TradeStatusChange(tokenId, "Cancelled");
        }



}