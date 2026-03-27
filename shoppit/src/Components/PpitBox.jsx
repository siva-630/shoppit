import React, { useState } from 'react'
import {
  X,
  Sparkles,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  Mic,
  SendHorizontal,
} from 'lucide-react'

const PpitBox = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return

    // Placeholder send action for now
    console.log('PPit message:', trimmedMessage)
    setMessage('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm transform bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label='PPit chat box'
      >
        <div className='flex h-full flex-col'>
          <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
            <div className='flex items-center gap-2'>
              <Sparkles className='h-5 w-5 text-orange-500' />
              <h2 className='text-base font-semibold text-gray-800'>Ask PPit</h2>
            </div>
            <button
              onClick={onClose}
              className='rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900'
              aria-label='Close PPit chat box'
            >
              <X className='h-5 w-5' />
            </button>
          </div>

          <div className='flex flex-1 flex-col items-center justify-center px-6 text-center'>
            <p className='text-sm text-gray-500'>
              Hi 👋 I am PPit. Ask me anything about products, offers, and shopping help.
            </p>
          </div>

          <div className='border-t border-gray-200 p-4'>
            <div className='rounded-xl border border-blue-500/80 bg-white p-3 shadow-sm'>
              <textarea
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Shift+Enter to insert a line break.'
                className='w-full resize-none text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none'
              />

              <div className='mt-2 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <button
                    className='rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900'
                    aria-label='Add attachment'
                  >
                    <Plus className='h-4 w-4' />
                  </button>

                  <button
                    className='flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50'
                    aria-label='Tools'
                  >
                    <SlidersHorizontal className='h-3.5 w-3.5' />
                    Tools
                  </button>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    className='flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100'
                    aria-label='Model speed'
                  >
                    Fast
                    <ChevronDown className='h-3.5 w-3.5' />
                  </button>

                  <button
                    className='rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900'
                    aria-label='Voice input'
                  >
                    <Mic className='h-4 w-4' />
                  </button>

                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className='rounded-full bg-gray-900 p-2 text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300'
                    aria-label='Send message'
                  >
                    <SendHorizontal className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default PpitBox;
