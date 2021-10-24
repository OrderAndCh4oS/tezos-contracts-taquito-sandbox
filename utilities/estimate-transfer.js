import tezos from './tezos.js';

const estimateTransfer = (to, amount) => tezos.estimate.transfer({to, amount});

export default estimateTransfer;
