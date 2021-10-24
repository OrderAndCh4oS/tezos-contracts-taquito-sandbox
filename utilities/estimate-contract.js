import tezos from './tezos';

const estimateContract = (contract) => async(a, b) => {
    const op = await contract.methods.default(a, b).toTransferParams({});
    return await tezos.estimate.transfer(op);
};

export default estimateContract;
