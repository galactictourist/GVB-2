export function formatWalletAddress(address: string) {
  return address
    ? `${address.slice(0, 5)}...${address.slice(address.length - 4, address.length)}`
    : address
}
