const strToHex = str => new TextEncoder().encode(str).reduce(
    (hex, c) => (hex + c.toString(16).padStart(2, '0')),
    ''
);

export default strToHex;
