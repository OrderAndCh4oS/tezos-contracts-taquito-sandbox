import {InMemorySigner} from '@taquito/signer';
import estimateContract from '../utilities/estimate-contract.js';
import tezos from '../utilities/tezos.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq')
});

const contract = await tezos.contract.at('KT1GdYsJeKuqdsw8jwVcXZBYpiMT1uDv1F1e');
const summariseEstimate = estimateContract(contract);

const summarise = async(x) => {
    const op = await contract.methods.default(x).send();
    await op.confirmation(1);
    return op.hash;
};

const getStorage = () => contract.storage();

try {
    const x = 10;
    const estimate = await summariseEstimate(x);
    console.log(estimate);
    const hash = await summarise(x);
    console.log(hash);
    console.log(await getStorage());
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
