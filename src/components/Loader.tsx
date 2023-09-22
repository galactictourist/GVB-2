import { RiLoader3Fill } from 'react-icons/ri'

export const Loader = () => {
  return (
    <div className="mt-6 flex h-24 items-center justify-center">
      <RiLoader3Fill className="text-primary-500 h-12 w-12 animate-spin" />
    </div>
  )
}
