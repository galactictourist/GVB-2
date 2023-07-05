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
    return '#000000'
  } else if (cause == 'Health') {
    return '#CC3835'
  } else if (cause == 'Animal Welfare') {
    return '#F2D265'
  } else if (cause == 'Human Services') {
    return '#D7DEDB'
  } else if (cause == 'Art & Culture') {
    return '#24A1BA'
  } else if (cause == 'Environment') {
    return '#107942'
  }

  return '#FFFFFF'
}

export const getCauseTextColor = (cause: string) => {
  if (cause == 'Human Services' || cause == 'Animal Welfare') {
    return '#000000'
  }

  return '#FFFFFF'
}