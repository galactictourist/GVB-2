import zip from 'jszip';

interface Props {
  label: string,
  imagesHandler: Function
}

export default function UploadZipForm({ label, imagesHandler }: Props) {
  const uploadZipHandler = async (e: any) => {
    const rawContents = await zip.loadAsync(e.target.files[0]);
    const imageKeys = Object.keys(rawContents.files)
      .filter(key => key.match(/\d\.(jpg|jpeg|png)$/i))
      .sort(_sort);
    const metadataKeys = Object.keys(rawContents.files)
      .filter(key => key.match(/\d\.json$/i))
      .sort(_sort);

    const files = await Promise.all(imageKeys.map(async (key, i) => {
      // convert raw image data to image file
      const imageContent = await rawContents.file(key)!.async('blob');
      const [, imageFileType] = key.match(/\.(jpg|jpeg|png)$/)!;
      const image = new File([imageContent], key, { type: `image/${imageFileType}` });

      // retreive data from json file
      const metadataContent = await rawContents.file(metadataKeys[i])!.async("string");
      const metadata = JSON.parse(metadataContent);

      return {
        name: metadata.name,
        src: URL.createObjectURL(image),
        file: image,
        uploadStatus: false,
        metadata
      }
    }));

    imagesHandler(files);
  }

  const _sort = (a: string, b: string) => {
    return +(a.match(/\d+/)!) - +(b.match(/\d+/)!);
  }

  return (
    <div className="flex">
      <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
        <input type="file" onChange={uploadZipHandler}
          id="fileInput"
          accept=".zip"
          className="hidden"
        />
        <span id="buttonLabel">{label}</span>
      </label>
    </div>
  )
}
