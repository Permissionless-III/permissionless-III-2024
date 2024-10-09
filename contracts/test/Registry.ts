import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

import { createSignature } from './utils/signature'

describe('Registry', function () {
  const DID = '1234566789'

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployRegistryFixture() {
    // const SignatureVerifier = await hre.ethers.getContractFactory('SignatureVerifier')
    // const signatureVerifier = await SignatureVerifier.deploy()
    // await signatureVerifier.waitForDeployment()

    // const addy = await signatureVerifier.getAddress()

    // Contracts are deployed using the first signer/account by default
    const [owner, trustedSigner, otherAccount] = await hre.ethers.getSigners()

    const Registry = await hre.ethers.getContractFactory('Registry')
    const registry = await Registry.deploy(trustedSigner)

    return { registry, owner, trustedSigner, otherAccount }
  }

  describe('Deployment', function () {
    it('Should set the right trusted signer', async function () {
      const { registry, trustedSigner } = await loadFixture(deployRegistryFixture)

      expect(await registry.trustedSigner()).to.equal(trustedSigner)
    })

    it('Should fail if the trusted signer is invalid', async function () {
      const Registry = await hre.ethers.getContractFactory('Registry')
      await expect(Registry.deploy('')).to.be.revertedWith('invalid trusted signer')
    })
  })

  describe('Registration', function () {
    describe('Validations', function () {
      // it('Should revert with the right error if not called from the trusted signer', async function () {
      //   const { registry, otherAccount } = await loadFixture(deployRegistryFixture)

      //   // const signature = await createSignature([DID], otherAccount)

      //   await expect(registry.connect(otherAccount).register(DID, signature)).to.be.revertedWith('invalid signature')
      // })

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { registry } = await loadFixture(deployRegistryFixture)

        // const signature = await createSignature([DID], trustedSigner)

        await expect(registry.register(DID)).not.to.be.reverted
        await expect(registry.register('1234134')).not.to.be.reverted

        const x = await registry.totalRegistered();
        console.log(x)
      })
    })

    describe('Events', function () {
      it('Should emit an event on registrations', async function () {
        const { registry } = await loadFixture(deployRegistryFixture)

        // const signature = await createSignature([DID], trustedSigner)

        await expect(registry.register(DID)).to.emit(registry, 'VoterRegistration').withArgs(DID)
      })
    })
  })
})
