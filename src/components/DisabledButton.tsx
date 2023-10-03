interface Props {
  buttonLabel: string
}

const DisabledButton = ({ buttonLabel }: Props) => {
  return (
    <button
      type="button" disabled
      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 opacity-50 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
    >
      {buttonLabel}
    </button>
  )
}

export default DisabledButton
