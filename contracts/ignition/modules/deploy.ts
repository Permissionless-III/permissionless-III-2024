// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('RegistryModule', (m) => {
  // const typesLibrary = m.library('Types')
  const signatureVerifierLibrary = m.library('SignatureVerifier')

  const registry = m.contract('Registry', [], {
    libraries: {
      SignatureVerifier: signatureVerifierLibrary,
    },
  })

  const election = m.contract('Election', [], {
    libraries: {
      SignatureVerifier: signatureVerifierLibrary,
    },
  })

  return { registry, election, signatureVerifierLibrary }
})
