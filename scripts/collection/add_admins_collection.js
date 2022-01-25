import {InMemorySigner} from '@taquito/signer';
import getEstimate from '../../utilities/get-estimate.js';
import tezos from '../../utilities/tezos.js';

tezos.setProvider({
    signer: new InMemorySigner(
        'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq'
    )
});

const contract = await tezos.contract.at('KT1T9dj8KwdJ9GXVW2XcYhwKQqNoDkkgnfJA');
const addAdminsEstimate = getEstimate(contract, 'add_admins');

const addAdmins = async(admins) => {
    const op = await contract.methods.add_admins(admins).send();
    await op.confirmation(1);
    return op.hash;
};

const getStorage = () => contract.storage();

try {
    const admins = ['tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6'];
    const estimate = await addAdminsEstimate(admins);
    console.log(estimate);
    const hash = await addAdmins(admins);
    console.log(hash);
    console.log(await getStorage());
} catch(e) {
    console.log(`Error: ${e} ${JSON.stringify(e, null, 2)}`);
}
