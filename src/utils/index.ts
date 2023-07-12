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

export const getCauseBgColor = (cause: string) => {
  if (cause == 'Education') {
    return 'bg-n4gBlack'
  } else if (cause == 'Health') {
    return 'bg-n4gRed'
  } else if (cause == 'Animal Welfare') {
    return 'bg-n4gOrange'
  } else if (cause == 'Human Services') {
    return 'bg-n4gGray'
  } else if (cause == 'Art & Culture') {
    return 'bg-n4gMediumTeal'
  } else if (cause == 'Environment') {
    return 'bg-n4gGreen'
  }

  return '#FFFFFF'
}

export const getCauseTextColor = (cause: string) => {
  if (cause == 'Human Services' || cause == 'Animal Welfare') {
    return '#000000'
  }

  return '#FFFFFF'
}