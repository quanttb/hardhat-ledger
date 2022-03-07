const hre = require('hardhat');
const ethers = hre.ethers;
const web3 = require('web3');
const { LedgerSigner } = require('@ethersproject/hardware-wallets');
const Eth = require('@ledgerhq/hw-app-eth').default;
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;

const config = require('../env.json');

const main = async () => {
  const hdPath = `m/44'/60'/0'/0/${config.ACCOUNT_INDEX}`;

  if (!(await showDeploymentInfo(hdPath))) return;

  const ledger = new LedgerSigner(ethers.provider, 'hid', hdPath);

  const initialSupply = web3.utils.toWei('1000000');

  const Example = await (
    await ethers.getContractFactory('Example')
  ).connect(ledger);
  // const example = await Example.deploy(initialSupply);
  const example = await upgrades.deployProxy(Example, [initialSupply]);
  // const example = await Example.attach('0x');
  console.log(`Example: ${example.address}`);

  await example.burn(initialSupply);
};

const showDeploymentInfo = async (hdPath) => {
  let address;

  console.log(`Please connect your Ledger and open Ethereum app...`);

  try {
    address = await getAccountAddress(hdPath);
  } catch (error) {
    console.log(error.message);
    return;
  }

  const network = await ethers.provider.getNetwork();
  const chainId = network.chainId;
  const balance = web3.utils.fromWei(
    (await ethers.provider.getBalance(address)).toString()
  );
  const txCount = await ethers.provider.getTransactionCount(address);

  console.log('Deployment Info:');
  console.log(`\tChainId: ${chainId}`);
  console.log(`\tAddress: ${address}`);
  console.log(`\tBalance: ${balance} ${config.CURRENCY_SYMBOL}`);
  console.log(`\tTxCount: ${txCount}`);

  console.log(`Please enable Blind Signing in Settings...`);

  return true;
};

const getAccountAddress = async (hdPath) => {
  return (
    await Promise.all([
      TransportNodeHid.open().then(async (transport) => {
        const eth = new Eth(transport);

        const address = (
          await Promise.all([
            eth.getAddress(hdPath).then((o) => {
              return o.address;
            }),
          ])
        )[0];

        await transport.close();

        return address;
      }),
    ])
  )[0];
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
