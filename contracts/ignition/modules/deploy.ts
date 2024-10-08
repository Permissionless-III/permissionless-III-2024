// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('RegistryModule', (m) => {
  const signatureVerifierLibrary = m.library('SignatureVerifier')

  const trustedSigner = m.getAccount(0)

  const registry = m.contract('Registry', [trustedSigner], {
    libraries: {
      SignatureVerifier: signatureVerifierLibrary,
    },
  })

  const electionFactory = m.contract('ElectionFactory', [registry, trustedSigner], {
    libraries: {
      SignatureVerifier: signatureVerifierLibrary,
    },
  })

  return { registry, electionFactory, signatureVerifierLibrary }
})
