import zip from 'jszip';

interface Props {
  label: string,
  imagesHandler: Function
}

export default function UploadZipForm({ label, imagesHandler }: Props) {
  const uploadZipHandler = async (e: any) => {
    const rawContents = await zip.loadAsync(e.target.files[0]);
    const fileKeys = Object.keys(rawContents.files)
      .filter(key => key.match(/\d\.(jpg|jpeg|png|mp4)$/i) && !key.match(/MACOSX/i))
      .sort(_sort);

    let rawFiles: File[] = [];

    const metadataKeys = Object.keys(rawContents.files)
      .filter(key => key.match(/\d\.json$/i) && !key.match(/MACOSX/i))
      .sort(_sort);

    const files = await Promise.all(fileKeys.map(async (key, i) => {
      // convert raw image data to image file
      const fileContent = await rawContents.file(key)!.async('blob');
      const [, fileType] = key.match(/\.(jpg|jpeg|png|mp4)$/)!;
      const fileFormat = fileType === "mp4" ? `video/${fileType}` : `image/${fileType}`;
      const file = new File([fileContent], key, { type: fileFormat });
      rawFiles.push(file)

      // retreive data from json file
      const metadataContent = await rawContents.file(metadataKeys[i])!.async("string");
      const metadata = JSON.parse(metadataContent);

      return {
        name: metadata.name,
        src: URL.createObjectURL(file),
        file,
        type: fileType === "mp4" ? "VIDEO" : "IMAGE",
        uploadStatus: false,
        metadata
      }
    }));

    imagesHandler(e.target.files[0].name, rawFiles, files);
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
