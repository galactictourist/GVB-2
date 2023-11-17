import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useMemo, useState } from 'react'
import { useCharities } from '~/hooks/useCharities'
import { CharityEntity } from '~/types/entity/charities.entity'
import { classNames } from '~/utils'

export function CharityList({ causeId = "", onChange }: { causeId?: string, onChange: (val: string) => void }) {
  const [query, setQuery] = useState('')
  const [selectedCharity, selectedCharitySetter] = useState<CharityEntity>()
  const { data } = useCharities()

  const charities = data?.filter(charity => {
    const charityTopic = charity.charityTopics[0];
    if (charityTopic?.topicId) {
      return causeId === charityTopic.topicId;
    }
    return false;
  });

  const filteredCharities = useMemo(() => {
    if (charities) {
      return query === ''
        ? charities
        : charities.filter((charity) => {
          return charity.name.toLowerCase().includes(query.toLowerCase())
        })
    }

    return []
  }, [query, charities])

  useEffect(() => {
    if (selectedCharity) {
      onChange(selectedCharity.id)
    }
  }, [selectedCharity])

  return (
    <Combobox as="div" value={selectedCharity} onChange={selectedCharitySetter}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">Charity</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(charity?: CharityEntity) => charity?.name || ''}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredCharities.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCharities.map((charity) => (
              <Combobox.Option
                key={charity.id}
                value={charity}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected ? 'font-semibold' : '')}>
                      {charity.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
