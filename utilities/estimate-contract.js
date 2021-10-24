import tezos from './tezos.js';

const estimateContract = (contract) => async(...args) => {
    const op = await contract.methods.default(...args).toTransferParams({});
    return await tezos.estimate.transfer(op);
};

export default estimateContract;
