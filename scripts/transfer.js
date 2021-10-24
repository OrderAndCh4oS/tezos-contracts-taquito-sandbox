import {InMemorySigner} from '@taquito/signer';

import {alice, bob, ONE_MILLION} from '../constants.js';
import tezos from '../utilities/tezos.js';
import estimateTransfer from '../utilities/estimate-transfer.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq')
});

const transfer = async(toAddress, xtzAmount) => {
    const op = await tezos.contract.transfer(
        {to: toAddress, amount: xtzAmount});
    await op.confirmation(1);

    return op.hash;
};

const getBalance = async(name, address) => (await tezos.tz.getBalance(
    address)) / ONE_MILLION;

try {
    const to = bob.address, amount = 5;
    const estimate = await estimateTransfer(to, amount);
    console.log(estimate);
    const hash = await transfer(to, amount);
    const aliceBalance = await getBalance('Alice', alice.address);
    const bobBalance = await getBalance('Bob', bob.address);
    console.log('Hash:', hash);
    console.log('Alice:', aliceBalance);
    console.log('Bob:', bobBalance);
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
