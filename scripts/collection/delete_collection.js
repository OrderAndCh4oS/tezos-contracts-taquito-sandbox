import {InMemorySigner} from '@taquito/signer';
import getEstimate from '../../utilities/get-estimate.js';
import tezos from '../../utilities/tezos.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq'
    )
});

const contract = await tezos.contract.at('KT1T9dj8KwdJ9GXVW2XcYhwKQqNoDkkgnfJA');
const deleteCollectionEstimate = getEstimate(contract, 'delete_collection');

const deleteCollection = async(collectionId) => {
    const op = await contract.methods.delete_collection(collectionId).send();
    await op.confirmation(1);
    return op.hash;
};

const getStorage = () => contract.storage();

try {
    const collectionId = 1;
    const estimate = await deleteCollectionEstimate(collectionId);
    console.log(estimate);
    const hash = await deleteCollection(collectionId);
    console.log(hash);
    console.log(await getStorage());
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
