'use client'

import Plus from '@/public/icons/plus.svg?react'
import { useState } from 'react'

export function NotesList() {
  const [newNote, setNewNote] = useState(null)

  return (
    <div className="border-r w-1/5 p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-semibold uppercase">Notes</h1>
        <Plus width={32} height={32} className='rounded-full cursor-pointer p-1 hover:bg-neutral-200'
          onClick={() => setNewNote({ title: '' })} />
      </div>
      {newNote && <div className='rounded-lg bg-white p-2'>
      </div>}
    </div>
  )
}

