import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import DisabledButton from '~/components/Core/DisabledButton'
import { SimplePagination } from '~/components/Pagination/SimplePagination'
import { useHandleUploadBulk } from '~/handlers/useHandleUploadBulk'
import { useAllCollections } from '~/hooks/useAllCollections'
import { usePagination } from '~/hooks/usePagination'
import { userClient } from '~/pages/api/userClient.api'
import { NftEntity } from '~/types/entity/nft.entity'
import { maxDisplayedUploadedImages } from '~/utils/constants'
import UploadZipForm from './UploadZipForm'

export interface ImageItem {
  name: string
  src: any
  file?: File
  metadata: NftEntity
  uploadStatus: boolean
}

const UploadNftsForm = () => {
  const { data: collections, isLoading } = useAllCollections()

  const [collectionId, setCollectionId] = useState<string>()
  const [uploadedImages, setUploadedImages] = useState<ImageItem[]>([]);
  const [displayedImages, setDisplayedImages] = useState<ImageItem[]>([]);
  const [uploadBtnLabel, setUploadBtnLabel] = useState("");

  const pagination = usePagination(maxDisplayedUploadedImages);
  const { pageSetter, totalSetter, changePage } = pagination;
  const { page, limit, total } = pagination;

  const handleUploadBulkNft = useHandleUploadBulk()

  const bulkUpload = async () => {
    const bulkData: any[] = []
    const toastId = toast.loading('Create nft in progress...')

    uploadedImages.forEach((imageItem) => {
      if (!imageItem.uploadStatus) {
        bulkData.push({
          name: imageItem.name,
          description: imageItem.metadata.description,
          network: 'POLYGON_MUMBAI',
          collectionId: collectionId,
          metadata: {
            external_url: imageItem.metadata.external_url,
            youtube_url: '',
            animation_url: '',
          },
          royality: 1,
          attributes: imageItem.metadata.attributes,
          image: imageItem.file
        })
      }
    })

    handleUploadBulkNft.mutate({
      data: bulkData
    }, {
      onSuccess(resp) {
        console.log(resp)
      },
      onError(err) {
        console.log(err)
      }
    })

  }

  const getExistingNfts = async (id: string) => {
    const { data: resp } = await userClient(process.env.NEXT_PUBLIC_API!).get(`/collections/${id}/nfts`)
    const nfts = resp.data.map((nft: NftEntity) => ({
      name: nft.name,
      src: nft.imageUrl,
      metadata: nft,
      uploadStatus: nft.status === "ACTIVE"
    }))
    setUploadedImages(nfts);
    pageHandler(1, nfts);
  }

  const selectCollectionId = (e: any) => {
    // on collection change, fetch list of batch nfts based on collection
    setCollectionId(e.target.value)
    getExistingNfts(e.target.value)
  }

  const imagesHandler = (files: ImageItem[]) => {
    const firstPage = 1
    const allImages = [...uploadedImages, ...files]
    setUploadBtnLabel(`${allImages.length} images`)
    setUploadedImages(allImages)
    setDisplayedImages(allImages.slice(0, firstPage * maxDisplayedUploadedImages))
    pageSetter(firstPage)
    totalSetter(allImages.length)
  }

  const pageHandler = (newPage: number, nfts: ImageItem[] = uploadedImages) => {
    const end = newPage * maxDisplayedUploadedImages;
    const start = end - maxDisplayedUploadedImages;
    const toDisplayedImages = nfts.slice(start, end)
    setDisplayedImages(toDisplayedImages)
    pageSetter(newPage)
    changePage(newPage);
  }

  useEffect(() => {
    if (collections) {
      setCollectionId(collections[0].id)
      getExistingNfts(collections[0].id);
    }
  }, [collections])

  useEffect(() => {
    if (!uploadedImages.length) {
      setUploadBtnLabel("Attach zip file")
    }
  }, [uploadedImages])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Upload Nfts</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all nfts for bulk uploading</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex gap-5">
          {!uploadedImages.length ? <DisabledButton buttonLabel="Upload NFT Collection" /> : <button
            type="button" onClick={bulkUpload}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Upload NFT Collection
          </button>}
          <UploadZipForm label={uploadBtnLabel} imagesHandler={imagesHandler} />
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
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Upload Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white h-[500px] overflow-hidden">
            {displayedImages.map((image, _id) => (
              <tr key={_id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  <img alt={`nft image ${_id}`} src={image.src} width={50} height={50} />
                </td>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {image.name}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {`${image.metadata.description}`}
                  <br />
                  {`Attributes: ${image.metadata.attributes!.map((trait: any) => trait.value).join(", ")}`}
                </td>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {image.uploadStatus ? "Uploaded" : "Not yet"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayedImages.length > 0 && <SimplePagination
          page={page}
          count={page * maxDisplayedUploadedImages}
          limit={limit}
          total={total}
          pageSelect={pageHandler}
        />}
      </div>
    </div>
  )
}

export default UploadNftsForm
