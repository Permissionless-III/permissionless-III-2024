import { time, loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('ElectionFactory', function () {
  async function deployFixture() {
    const [owner, trustedSigner, otherAccount] = await hre.ethers.getSigners()

    const Registry = await hre.ethers.getContractFactory('Registry')
    const registry = await Registry.deploy(trustedSigner)

    const ElectionFactory = await hre.ethers.getContractFactory('ElectionFactory')
    const factory = await ElectionFactory.deploy(registry, trustedSigner)

    return { factory, registry, owner, trustedSigner, otherAccount }
  }

  describe('Deployment', function () {
    it('Should set the right registry', async function () {
      const { factory, registry, trustedSigner } = await loadFixture(deployFixture)

      expect(await factory.getElection(2)).to.equal(registry)
      expect(await factory.registry()).to.equal(registry)
    })

    it('Should set the right trusted signer', async function () {
      const { factory, trustedSigner } = await loadFixture(deployFixture)

      expect(await factory.trustedSigner()).to.equal(trustedSigner)
    })

    it('Should fail if the trusted signer is invalid', async function () {
      const ElectionFactory = await hre.ethers.getContractFactory('ElectionFactory')
      await expect(ElectionFactory.deploy('', '')).to.be.revertedWith('invalid trusted signer')
    })
  })

  describe('Registration', function () {
    describe('Validations', function () {
      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { factory } = await loadFixture(deployFixture)

        // const signature = await createSignature([DID], trustedSigner)

        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
        const now = await time.latest()
        const deadline = now + ONE_YEAR_IN_SECS

        await expect(factory.createElection('google.com', 'My Election', 'Just testing', now, deadline)).not.to.be
          .reverted
      })
    })

    // describe('Events', function () {
    //   it('Should emit an event on created elections', async function () {
    //     const { factory } = await loadFixture(deployFixture)

    //     // const signature = await createSignature([DID], trustedSigner)

    //     await expect(factory.createElection(DID)).to.emit(factory, 'ElectionCreated').withArgs(DID)
    //   })
    // })
  })
})
