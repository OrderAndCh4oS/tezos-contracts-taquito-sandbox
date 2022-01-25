import {InMemorySigner} from '@taquito/signer';
import getEstimate from '../../utilities/get-estimate.js';
import tezos from '../../utilities/tezos.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq')
});

const contract = await tezos.contract.at('KT1T9dj8KwdJ9GXVW2XcYhwKQqNoDkkgnfJA');
const updateCollectionEstimate = getEstimate(contract, 'update_collection');

const updateContract = async(collectionId, ipfsUri) => {
    const op = await contract.methods.update_collection(collectionId, ipfsUri).send();
    await op.confirmation(1);
    return op.hash;
};

const getStorage = () => contract.storage();

try {
    const collectionId = 2;
    const ipfsUri = 'https://ipfs.io/ipfs/Qmc3CqfmgqRyY2h6eczjU7FuojykWr42ykRFetYLTMyxxx';
    const estimate = await updateCollectionEstimate(collectionId, ipfsUri);
    console.log(estimate);
    const hash = await updateContract(collectionId, ipfsUri);
    console.log(hash);
    console.log(await getStorage());
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
