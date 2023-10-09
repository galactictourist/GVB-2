
interface Props {
  dataCallback: () => string
}

export default function GenerateCsvButton({ dataCallback }: Props) {
  const generateCsv = (): string => {
    const content = dataCallback();
    const blob = new Blob([content], { type: "text/plain" });

    return URL.createObjectURL(blob);
  }

  return (
    <div className="flex">
      <a className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        href={generateCsv()} download="nfts_list.csv">Generate List CSV Template</a>
    </div>
  )
}
