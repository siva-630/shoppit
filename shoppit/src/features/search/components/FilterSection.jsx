import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

// Reusable collapsible checkbox filter section.
const FilterSection = ({
  title,
  expanded,
  onToggle,
  options,
  optionCountMap,
  selectedValues,
  onToggleValue,
  emptyMessage,
}) => {
  return (
    <div className='border-b border-gray-200 pb-3'>
      <button
        type='button'
        onClick={onToggle}
        className='flex w-full items-center justify-between py-1 text-left text-base font-semibold uppercase tracking-wide text-gray-800'
      >
        <span>{title}</span>
        {expanded ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
      </button>

      {expanded && (
        <div className='mt-2 max-h-44 space-y-2 overflow-auto pr-1'>
          {options.length > 0 ? (
            options.map((option) => (
              <label key={option} className='flex items-center gap-2 text-sm text-gray-700'>
                <input
                  type='checkbox'
                  checked={selectedValues.includes(option)}
                  onChange={() => onToggleValue(option)}
                  className='h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500'
                />
                <span>
                  {option}
                  {optionCountMap && typeof optionCountMap[option] === 'number' ? ` (${optionCountMap[option]})` : ''}
                </span>
              </label>
            ))
          ) : (
            <p className='text-sm text-gray-500'>{emptyMessage}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FilterSection
