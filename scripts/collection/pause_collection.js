import {InMemorySigner} from '@taquito/signer';
import getEstimate from '../../utilities/get-estimate.js';
import tezos from '../../utilities/tezos.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq'
    )
});

const contract = await tezos.contract.at('KT1T9dj8KwdJ9GXVW2XcYhwKQqNoDkkgnfJA');
const pauseCollectionEstimate = getEstimate(contract, 'pause_collection');

const pauseCollection = async(collectionId) => {
    const op = await contract.methods.pause_collection(collectionId).send();
    await op.confirmation(1);
    return op.hash;
};

const getStorage = () => contract.storage();

try {
    const collectionId = 2;
    const estimate = await pauseCollectionEstimate(collectionId);
    console.log(estimate);
    const hash = await pauseCollection(collectionId);
    console.log(hash);
    console.log(await getStorage());
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
