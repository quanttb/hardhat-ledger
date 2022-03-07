const chai = require('chai');
const { solidity } = require('ethereum-waffle');
const { constants } = require('@openzeppelin/test-helpers');

chai.use(solidity);
const expect = chai.expect;

// https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
describe('Example', () => {
  let Example;
  let example;
  let owner, user;

  const INITIAL_SUPPLY = ethers.BigNumber.from(100);
  const ZERO = ethers.BigNumber.from(0);

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    Example = await ethers.getContractFactory('Example');
    // example = await Example.deploy(INITIAL_SUPPLY);
    example = await upgrades.deployProxy(Example, [INITIAL_SUPPLY]);
    await example.deployed();
  });

  it('works', async () => {
    expect(await example.balanceOf(user.address)).to.equal(ZERO);

    await expect(example.transfer(user.address, INITIAL_SUPPLY))
      .to.emit(example, 'Transfer')
      .withArgs(owner.address, user.address, INITIAL_SUPPLY);

    expect(await example.balanceOf(user.address)).to.equal(INITIAL_SUPPLY);

    await expect(example.connect(user).burn(INITIAL_SUPPLY))
      .to.emit(example, 'Transfer')
      .withArgs(user.address, constants.ZERO_ADDRESS, INITIAL_SUPPLY);

    expect(await example.balanceOf(user.address)).to.equal(ZERO);

    await expect(example.connect(user).burn(INITIAL_SUPPLY)).to.be.revertedWith(
      'ERC20: burn amount exceeds balance'
    );
  });
});
