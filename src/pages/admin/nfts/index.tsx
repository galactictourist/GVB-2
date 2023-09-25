import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import AdminContainer from '~/components/Admin/AdminContainer'
import { useHandleUploadBulk } from '~/handlers/useHandleUploadBulk'
import { useHandleUploadImage } from '~/handlers/useHandleUploadImage'
import { useAllCollections } from '~/hooks/useAllCollections'
import UploadZipForm from './uploadZipForm'
// import NftBuildJson from '~/nfts/json/_metadata.json'

export interface ImageItem {
  name: string
  src: any
}

const Nfts: NextPage = () => {
  const { data: collections, isLoading } = useAllCollections()
  const [collectionId, setCollectionId] = useState<string>()
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploadBtnLabel, setUploadBtnLabel] = useState("Upload zip or images");


  const handleUploadBulkNft = useHandleUploadBulk()

  const handleUploadImage = useHandleUploadImage()

  const BulkUpload = async () => {
    //   const bulkData: any[] = []
    //   const toastId = toast.loading('Create nft in progress...')

    //   NftBuildJson.slice(0, 1).forEach((nft) => {
    //     const nftImage = new File([require(`~/nfts/images/${nft.image.split('/')[3]}`)], `${nft.image.split('/')[3]}`, { type: 'image/png' })

    //     bulkData.push({
    //       name: nft.name,
    //       description: nft.description,
    //       network: 'POLYGON_MUMBAI',
    //       collectionId: collectionId,
    //       metadata: {
    //         external_url: nft.external_url,
    //         youtube_url: '',
    //         animation_url: '',
    //       },
    //       royality: 1,
    //       attributes: nft.attributes,
    //       image: new File([require(`~/nfts/images/${nft.image.split('/')[3]}`)], `${nft.image.split('/')[3]}`, { type: 'image/png' })
    //     })
    //   })

    //   handleUploadBulkNft.mutate({
    //     data: bulkData
    //   }, {
    //     onSuccess(resp) {
    //       console.log(resp)
    //     },
    //     onError(err) {
    //       console.log(err)
    //     }
    //   })

  }

  const selectCollectionId = (e: any) => {
    setCollectionId(e.target.value)
  }

  const imagesHandler = (files: ImageItem[]) => {
    setUploadBtnLabel(`${files.length} files`)
    setImages(files);
  }

  useEffect(() => {
    collections && setCollectionId(collections[0].id)
  }, [collections])

  useEffect(() => {
    if (!images.length) {
      setUploadBtnLabel("Upload zip or folder")
    }
  }, [images])

  return (
    <>
      <Head>
        <title>GivaBit | Admin | Nfts </title>
        <meta name="description" content="Show NFTs" />
      </Head>
      <AdminContainer>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Nfts</h1>
              <p className="mt-2 text-sm text-gray-700">A list of all nfts for bulk uploading</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <UploadZipForm label={uploadBtnLabel} imagesHandler={imagesHandler} />
              {/* <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                onClick={BulkUpload}
              >
                Upload Nfts
              </button> */}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-md font-semibold">Collections</p>
            <select className="n4gForm h-10 capitalize" onChange={selectCollectionId}>
              {collections &&
                collections.map((collection) => (
                  <option label={collection.name} key={collection.id} value={collection.id} />
                ))}
            </select>
          </div>
          <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table className="h-[500px] min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white h-[500px] overflow-hidden">
                {images.map((image, _id) => (
                  <tr key={_id}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      <img alt={`nft image ${_id}`} src={image.src} width={50} height={50} />
                    </td>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      {image.name}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {image.name}
                    </td>
                  </tr>
                ))}
                {/* {NftBuildJson &&
                  NftBuildJson.slice(0, 10).map((nft, _id) => (
                    <tr key={_id}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                        <Image alt={`nft image ${_id}`} src={`/images/${nft.image.split('/')[3]}`} width={50} height={50} />
                      </td>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                        {nft.name}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Description</dt>
                          <dd className="mt-1 truncate text-gray-700">
                            {nft.description}
                          </dd>
                          <dt className="sr-only sm:hidden">Status</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {nft.name}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {nft.description}
                      </td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </AdminContainer >
    </>
  )
}

export default Nfts
