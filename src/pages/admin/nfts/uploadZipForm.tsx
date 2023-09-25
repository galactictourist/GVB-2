import zip from 'jszip';
import { ImageItem } from ".";

interface Props {
  label: string,
  imagesHandler: Function
}

export default function UploadZipForm({ label, imagesHandler }: Props) {
  const uploadZipHandler = async (e: any) => {
    const file = e.target.files[0];
    const isZip = file.name.match(/\.(zip)$/i);
    let unparsedFiles = e.target.files;

    if (isZip) {
      const rawContents = await zip.loadAsync(file);
      const contentKeys = Object.keys(rawContents.files).filter(key =>
        !key.match(/^__MACOSX\//) && key.match(/\.(jpg|jpeg|png)$/i)
      );
      unparsedFiles = await Promise.all(contentKeys.map(async (key) => {
        const content = await rawContents.file(key)!.async('blob');
        const [, fileType] = key.match(/\.(jpg|jpeg|png)$/)!;
        return new File([content], key, { type: `image/${fileType}` });
      }));
    }

    const files = _parseImages(unparsedFiles);
    imagesHandler(files);
  }

  const _parseImages = (imageFiles: File[]) => {
    const keysArr = Object.keys(imageFiles);
    const files = keysArr.reduce((arr: ImageItem[], key: any) => {
      const file = imageFiles[key];
      const isExtension = file.name.match(/\.(jpg|jpeg|png)$/i);

      if (isExtension) {
        const imageItem = {
          name: file.name,
          src: URL.createObjectURL(file)
        };

        return [...arr, imageItem]
      }

      return arr;
    }, [])

    return files;
  }

  return (
    <div className="flex">
      <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
        <input type="file" onChange={uploadZipHandler}
          id="fileInput"
          accept=".zip,.jpg,.jpeg,.png"
          multiple
          className="hidden"
        />
        <span id="buttonLabel">{label}</span>
      </label>
    </div>
  )
}
