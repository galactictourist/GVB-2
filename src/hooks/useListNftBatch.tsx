import { TransactionResponse } from '@ethersproject/abstract-provider'
import { Contract, Signer } from 'ethers'
import { useState } from "react"
import { toast } from 'react-hot-toast'
import { useAccount, useSignTypedData, useSigner } from 'wagmi'
import { nftAbi } from '~/abi/erc721'
import { givabitApi } from '~/services/givabit/api'
import { CHAIN_ID } from '~/utils/constants'

export const useListNftBatch = () => {
  const { address } = useAccount()
  const [isListOpen, setListOpen] = useState<boolean>(false)

  const { data: signedData, signTypedData } = useSignTypedData()
  const { data: signer } = useSigner({
    chainId: CHAIN_ID,
  })
  const [serverSignature, setServerSignature] = useState()
  const [saleData, setSaleData] = useState()

  const listNftBatch = async (data: any) => {
    if (!address) {
      toast.error('You need to connect wallet')
      return
    }

    if (data.charityShare < 10 || data.charityShare > 100) {
      toast.error('Charity share should be more than 10%, less than 100%')
      return
    }

    const toastId = toast.loading('Processing nft batch...')
    setListOpen(false)

    let signResp
    try {
      signResp = await givabitApi.signNftBatch({
        ...data,
        network: "POLYGON_MUMBAI",
        currency: "NATIVE_CURRENCY",
        charityShare: data.charityShare * 100,
        expiryInMinutes: 30 * 24 * 60,
        quantity: 1,
        countryCode: 'US',
      })

      setServerSignature(signResp.data.serverSignature)
      setSaleData(signResp.data.saleData)
    } catch (ex: any) {
      console.log(ex)
      toast.error(ex.response.data.message ?? 'Get error while prepare listing.', {
        id: toastId,
      })
      return
    }

    // Make sign
    const typedData = JSON.parse(signResp.data.signingData)

    const nftContract = new Contract(typedData.message.nftContract, nftAbi, signer as Signer)

    try {
      const approvedAll = await nftContract.isApprovedForAll(
        address,
        typedData.domain.verifyingContract
      )
      console.log('approvedAll', approvedAll)
      if (!approvedAll) {
        const txResponse = (await nftContract.setApprovalForAll(
          typedData.domain.verifyingContract,
          true,
          {
            from: address,
          }
        )) as TransactionResponse
        const txReceipt = await txResponse.wait()
        console.log('approved successful', txReceipt)
      }
    } catch (ex: any) {
      console.log(ex)
      toast.error(ex.message ?? 'Get error while approve', {
        id: toastId,
      })
      return
    }

    try {
      await signTypedData({
        domain: typedData.domain,
        types: typedData.types,
        value: typedData.message,
      })

      toast.remove(toastId)
    } catch (ex: any) {
      console.log(ex)
      toast.error(ex.message ?? 'Get error while sign data', {
        id: toastId,
      })
      return
    }

  };

  return {
    listNftBatch,
    isListOpen,
    signedData,
    address,
    signer,
    serverSignature,
    saleData,
    setListOpen
  }
}
