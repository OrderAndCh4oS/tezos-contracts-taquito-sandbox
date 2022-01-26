import tezos from '../../utilities/tezos.js';
import hexToStr from '../../utilities/hex-to-str.js';

const contract = await tezos.contract.at('KT1T9dj8KwdJ9GXVW2XcYhwKQqNoDkkgnfJA')
const storage = await contract.storage()
const entry = await storage.collections.get({
    0: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb', //address
    1: '2', //nat
});
console.log('IPFS URI Raw', entry.ipfs_uri);
console.log('IPFS URI', hexToStr(entry.ipfs_uri));
console.log('Is Paused', entry.paused);
