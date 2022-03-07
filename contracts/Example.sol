// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";

contract Example is ERC20BurnableUpgradeable {
    function initialize(uint256 initialSupply) public initializer {
        __ERC20_init("Example", "EX");
        _mint(msg.sender, initialSupply);
    }
}