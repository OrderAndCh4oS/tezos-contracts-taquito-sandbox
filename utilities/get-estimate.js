import tezos from './tezos.js';

const getEstimate = (contract, f = 'default') => async(...args) => {
    const op = await contract.methods[f](...args).toTransferParams({});
    return await tezos.estimate.transfer(op);
};

export default getEstimate;
