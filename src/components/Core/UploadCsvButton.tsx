import { parse } from 'csv-parse';

interface Props {
  csvHandler: (data: []) => void
}

export default function UploadCsvButton({ csvHandler }: Props) {
  const uploadCsvHandler = async (e: any) => {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0]);

    reader.onload = () => {
      const resultArr = reader.result!.toString().split("\n");
      resultArr[0] = resultArr[0].toLowerCase();
      const result = resultArr.join("\n");

      parse(result, { columns: true }, (err, record) => {
        csvHandler(record)
      });
    }
  }

  return (
    <div className="flex">
      <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
        <input type="file" onChange={uploadCsvHandler}
          id="fileInput"
          accept=".csv"
          className="hidden"
        />
        <span id="buttonLabel">Upload CSV</span>
      </label>
    </div>
  )
}
