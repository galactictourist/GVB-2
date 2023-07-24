import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMyCauses } from '~/hooks/useMyCauses';
import { CollectionEntity } from '~/types/entity/collection.entity';
import { getCauseBgColor, getCauseTextColor } from '~/utils';

const MyCausesTab = () => {
  const [causes, setCauses] = useState<CollectionEntity[]>();
  const { data: resp, isLoading } = useMyCauses();

  useEffect(() => {
    if (resp) {
      console.log(resp)
      setCauses(resp)
    }
  }, [resp])


  return <div className="relative pt-4 pb-8 flex">
    {causes &&
      causes.map((cause) => (
        <Link key={cause.id} href={`/cause/${cause.topic.parentId}`}>
          <div
            className={`mx-3 flex cursor-pointer items-center rounded-3xl py-3 px-6 text-white transition duration-700 hover:opacity-50 ${getCauseBgColor(cause.cause)}`}
            style={{
              color: getCauseTextColor(cause.cause),
              width: '150px'
            }}
            onClick={() => close()}
          >
            <p className="w-full text-center font-medium">{cause.cause}</p>
          </div>
        </Link>
      ))}

  </div>
}

export default MyCausesTab
