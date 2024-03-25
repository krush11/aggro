'use client'

import PlusCircleFill from '@/public/icons/plusCircleFill.svg'
import CheckCircle from '@/public/icons/checkCircle.svg'
import CheckCircleFill from '@/public/icons/checkCircleFill.svg'
import Check2 from '@/public/icons/check2.svg'
import X from '@/public/icons/x.svg'
import Trash from '@/public/icons/trash.svg'
import Pencil from '@/public/icons/pencil.svg'
import { deleteTask, reinitiateTask, resolveTask, updateTask } from "./actions";
import { toast } from "react-toastify";
import { useState } from 'react'

export function PendingTaskCard({ task }) {
  const [isEditStateOn, setIsEditStateOn] = useState(false)

  return (
    <li key={task.id} className={`${!isEditStateOn && 'cursor-pointer'} bg-white p-4 my-2 rounded-md flex flex-row justify-between items-center select-none`}>
      <div className='group flex flex-row items-center w-full'
        onClick={async () => {
          if (!isEditStateOn) {
            resolveTask(task.id)
            toast.success('Task marked as completed!')
          }
        }} >
        {isEditStateOn ?
          <input type='text' id='updated-task' defaultValue={task.task} className='w-full outline-none' /> :
          <div className='flex flex-row items-center'>
            <CheckCircle className={`mr-4 w-6 h-6 fill-green-500 block group-hover:hidden`} />
            <CheckCircleFill className={`mr-4 w-6 h-6 fill-green-500 hidden group-hover:block`} />
            <div className='flex flex-col'>
              <span className='text-xs'>{new Date(task.createdOn).toDateString()}</span>
              <div>{task.task}</div>
            </div>
          </div>
        }
      </div>
      {!isEditStateOn ?
        <Pencil onClick={() => { setIsEditStateOn(true) }} className='w-6 h-6 fill-neutral-500' /> :
        <div className='flex flex-row'>
          <Check2 className='w-6 h-6 cursor-pointer fill-green-500' onClick={() => {
            updateTask(task.id, document.getElementById('updated-task').value)
            setIsEditStateOn(false)
            toast.success('Task updated!')
          }} />
          <X className='w-6 h-6 cursor-pointer fill-red-500' onClick={() => { setIsEditStateOn(false) }} />
        </div>}
    </li>
  )
}

export function CompletedTaskCard({ task }) {
  return (
    <li key={task.id} className="cursor-pointer bg-white p-4 my-2 rounded-md flex flex-row justify-between items-center select-none">
      <div className='group flex flex-row items-center' onClick={async () => { reinitiateTask(task.id); toast.success('Task reinitiated!'); }} >
        <CheckCircle className={`mr-4 w-6 h-6 fill-green-500 hidden group-hover:block`} />
        <CheckCircleFill className={`mr-4 w-6 h-6 fill-green-500 block group-hover:hidden`} />
        <div className='flex flex-col'>
              <span className='text-xs'>{new Date(task.completedOn).toDateString()}</span>
          <div>{task.task}</div>
        </div>
      </div>
      <Trash onClick={async () => {
        deleteTask(task.id)
        toast.success('Task deleted permanently!')
      }} className='w-6 h-6 fill-red-500' />
    </li>
  )
}

export function TaskCreator() {
  return (
    <>
      <label htmlFor="task" className="font-medium uppercase text-sm">Create new task</label>
      <div className="relative mt-1">
        <input type="text" id="task" name="task" className="py-3 px-4 w-full rounded-lg transition-all" placeholder="Write down some task" />
        <button type="submit" onSubmit={() => { document.getElementById('task').innerHTML = '' }} className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3 outline-none">
          <PlusCircleFill className='w-6 h-6' />
        </button>
      </div>
    </>
  )
}