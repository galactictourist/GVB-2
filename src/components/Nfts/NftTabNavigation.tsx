interface Props {
  activeTab: number
  setActiveTab: (i: number) => void
}

const NftTabNavigation = ({ activeTab, setActiveTab }: Props) => {
  const nav = ["Upload NFTs", "List NFTs"];
  const activeStyle = "text-blue-600  border-blue-600 dark:text-blue-500 dark:border-blue-500 active";
  const unactiveStyle = "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

  return (
    <div className="mb-10 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {nav.map((n, i) => (
          <li key={i} className="mr-2">
            <a href="#" onClick={() => setActiveTab(i)}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${i === activeTab ? activeStyle : unactiveStyle}`}
            >{n}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NftTabNavigation
