import {InMemorySigner} from '@taquito/signer';
import estimateContract from '../utilities/estimate-contract.js';
import tezos from '../utilities/tezos.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq')
});

const contract = await tezos.contract.at('KT1FEwBk3XCpSEDHj5re1VnFyPr9oGpfr5Dy');
const adderEstimate = estimateContract(contract);

const adder = async(a, b) => {
    const op = await contract.methods.default(a, b).send();
    await op.confirmation(1);
    return op.hash;
};

const getStorage = () => contract.storage();

try {
    const a = 100, b = 200;
    const estimate = await adderEstimate(a, b);
    console.log(estimate);
    const hash = await adder(a, b);
    console.log(hash);
    console.log(await getStorage());
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
