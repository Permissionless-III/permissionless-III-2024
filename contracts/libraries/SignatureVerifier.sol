// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library SignatureVerifier {
    function getMessageHash(string memory message) public pure returns (bytes32) {
        // Hash the message to match the message signed in the frontend
        return keccak256(abi.encodePacked(message));
    }

    function getEthSignedMessageHash(bytes32 _messageHash) public pure returns (bytes32) {
        /*
         The message is prefixed with "\x19Ethereum Signed Message:\n32" to prevent
         signature replay attacks on arbitrary data.
        */
        return keccak256(abi.encodePacked('\x19Ethereum Signed Message:\n32', _messageHash));
    }

    function verify(
        string memory _message,
        bytes memory _signature,
        address _expectedSigner
    ) public pure returns (bool) {
        bytes32 messageHash = getMessageHash(_message);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recoverSigner(ethSignedMessageHash, _signature) == _expectedSigner;
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        // ecrecover is the low-level function that recovers the signer's address from the signature
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, 'Invalid signature length');

        assembly {
            // First 32 bytes stores the length of the signature
            // Add 32 to the memory location of sig to get the r value
            r := mload(add(sig, 32))
            // The next 32 bytes store the s value
            s := mload(add(sig, 64))
            // The final byte (after the first 64 bytes) is the v value
            v := byte(0, mload(add(sig, 96)))
        }
    }

    function formatMessage(string[2] memory strings) public pure returns (string memory) {
        bytes memory result;

        for (uint i = 0; i < strings.length; i++) {
            result = abi.encodePacked(result, strings[i]);
            // Add delimiter between strings, but not at the end
            if (i < strings.length - 1) {
                result = abi.encodePacked(result, ':');
            }
        }

        return string(result);
    }
}
