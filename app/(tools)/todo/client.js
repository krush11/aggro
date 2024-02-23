'use client'

import PlusCircleFill from '@/public/icons/plusCircleFill.svg'
import CheckCircle from '@/public/icons/checkCircle.svg'
import CheckCircleFill from '@/public/icons/checkCircleFill.svg'
import { resolveTask } from "./actions";
import { toast } from "react-toastify";

export function TaskCard({ task }) {
  return (
    <li key={task.id} className="group cursor-pointer bg-white p-4 my-2 rounded-md flex flex-row select-none"
      onClick={async () => {
        resolveTask(task.id)
        toast.success('Task marked as completed!')
      }} >
      <CheckCircle className="mr-4 w-6 h-6 fill-green-500 block group-hover:hidden" />
      <CheckCircleFill className="mr-4 w-6 h-6 fill-green-500 hidden group-hover:block" />
      <div>{task.task}</div>
    </li>
  )
}

export function TaskCreator() {
  return (
    <>
      <label htmlFor="task" className="font-medium">Create new task</label>
      <div className="relative mt-1">
        <input type="text" id="task" name="task" className="py-3 px-4 w-full rounded-lg transition-all" placeholder="Write down some task" />
        <button type="submit" onSubmit={() => {document.getElementById('task').innerHTML = ''}} className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3 outline-none">
          <PlusCircleFill className='w-6 h-6' />
        </button>
      </div>
    </>
  )
}