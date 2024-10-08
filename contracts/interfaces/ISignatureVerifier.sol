// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.20;

interface ISignatureVerifier {
    function parameters() external view returns (uint);
}
