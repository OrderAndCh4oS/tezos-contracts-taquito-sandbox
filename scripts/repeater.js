import {InMemorySigner} from '@taquito/signer';
import getEstimate from '../utilities/get-estimate.js';
import tezos from '../utilities/tezos.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq')
});

const contract = await tezos.contract.at('KT1RFkCrdoSjZkXkBDA7PfRq4EHeBJ4Kg66g');
const repeaterEstimate = getEstimate(contract);

const repeater = async(str) => {
    const op = await contract.methods.default(str).send();
    await op.confirmation(1);
    return op.hash;
};

const getStorage = () => contract.storage();

try {
    const unit = -10;
    const estimate = await repeaterEstimate(unit);
    console.log(estimate);
    const hash = await repeater(unit);
    console.log(hash);
    console.log(await getStorage());
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
