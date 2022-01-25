import {InMemorySigner} from '@taquito/signer';
import getEstimate from '../utilities/get-estimate.js';
import tezos from '../utilities/tezos.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq')
});

const contract = await tezos.contract.at('KT1AKKRLRG23oTfNCaGxY4r6BMUXfEpKeHjP');
const crowdfundingEstimate = getEstimate(contract);

const crowdfunding = async(entry) => {
    const op = await contract.methods.default(...entry).send();
    await op.confirmation(1);
    return op.hash;
};

const getStorage = () => contract.storage();

try {
    const entry = ['tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6', 'Bob'];
    const estimate = await crowdfundingEstimate(...entry);
    console.log(estimate);
    const hash = await crowdfunding(entry);
    console.log(hash);
    const storage = await getStorage();
    console.log(await storage.certified.get('tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6'));
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
