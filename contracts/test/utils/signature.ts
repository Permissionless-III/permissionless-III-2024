import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import hre from 'hardhat'

export const createSignature = async (data: string[], signer: HardhatEthersSigner) => {
  const message = data.join(':')

  const messageHash = hre.ethers.solidityPackedKeccak256(['string'], [message])
  const prefixedMessageHash = hre.ethers.hashMessage(messageHash)
  const signature = await signer.signMessage(prefixedMessageHash)

  return signature
}
