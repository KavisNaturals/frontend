import toast from 'react-hot-toast'
import React from 'react'

export function toastConfirm(message: string): Promise<boolean> {
  return new Promise(resolve => {
    toast.custom(
      t => (
        <div
          className={`bg-white shadow-lg rounded-xl px-6 py-4 border border-gray-200 flex flex-col gap-3 min-w-[260px] ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
        >
          <p className="text-gray-800 font-medium text-sm">{message}</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id)
                resolve(false)
              }}
              className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id)
                resolve(true)
              }}
              className="px-4 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: 'top-center' }
    )
  })
}
