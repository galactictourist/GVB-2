import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useChildCauses } from '~/hooks/useChildCauses'
import { TopicEntity } from '~/types/entity/topic.entity'
import { classNames } from '~/utils'

export function TopicList({ onChange }: { onChange: (val: string) => void }) {
  const [query, setQuery] = useState('')
  const [selectedTopic, selectedTopicSetter] = useState<TopicEntity>()

  const { data: causes } = useChildCauses()

  useEffect(() => {
    if (selectedTopic) {
      onChange(selectedTopic.id)
    }
  }, [selectedTopic])

  return (
    <Combobox as="div" value={selectedTopic} onChange={selectedTopicSetter}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">Topic</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="text-capitalize w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(topic?: TopicEntity) => topic?.name || ''}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {causes && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {causes.map((cause) => (
              <div key={cause.id}>
                <p className="px-4 py-2 font-semibold">{cause.name}</p>

                {cause.children.map(
                  (topic) =>
                    topic.name.toLowerCase().includes(query) && (
                      <Combobox.Option
                        key={topic.id}
                        value={topic}
                        className={({ active }) =>
                          classNames(
                            'relative cursor-default select-none py-2 pl-8 pr-4 capitalize',
                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <span
                              className={classNames(
                                'block truncate',
                                selected ? 'font-semibold' : ''
                              )}
                            >
                              {topic.name}
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
                    )
                )}
              </div>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
