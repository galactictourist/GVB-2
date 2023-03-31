export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const shortify = (address: string | undefined) => {
  return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
};

export const getEtherscan = (address: string | undefined) => {
  return `https://mumbai.polygonscan.com/address/${address}`
}