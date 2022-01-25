import {InMemorySigner} from '@taquito/signer';
import getEstimate from '../utilities/get-estimate.js';
import tezos from '../utilities/tezos.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq')
});

const contract = await tezos.contract.at(
    'KT1DcdsykChxZGtGqSZCBnBei4GBaVz897Qq');
const certificationEstimate = getEstimate(contract);

const certification = async(entry) => {
    const op = await contract.methods.default(...entry).send();
    await op.confirmation(1);
    return op.hash;
};

const getStorage = () => contract.storage();

try {
    const entryOne = ['tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6', 'Bob'];
    const entryTwo = ['tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb', 'Alice'];
    const entries = [entryOne, entryTwo];
    for(const entry of entries) {
        const estimate = await certificationEstimate(...entry);
        console.log(estimate);
        const hash = await certification(entry);
        console.log(hash);
    }
    const storage = await getStorage();
    console.log(await storage.certified.get('tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6'));
    console.log(await storage.certified.get('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb'));
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
