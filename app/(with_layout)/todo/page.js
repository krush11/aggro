import { ToDoTasks } from "@/prisma/prisma"
import { getUser } from "@/utils/getUser"
import { revalidatePath } from "next/cache"
import { CompletedTaskCard, PendingTaskCard, TaskCreator } from "./client"

export const revalidate = 60 * 60

async function getUserTasks() {
  const user = await getUser()
  const tasks = (await ToDoTasks.findMany({ where: { userID: user.id } })).sort((a, b) => b.createdOn - a.createdOn)

  return [user, tasks]
}

export default async function Page() {
  const [user, tasks] = await getUserTasks()
  const pendingTasks = tasks.filter((task) => !task.completedOn).sort((a, b) => b.createdOn - a.createdOn)
  const completedTasks = tasks.filter((task) => task.completedOn).sort((a, b) => b.completedOn - a.completedOn)

  async function addTask(formData) {
    'use server'
    const taskDesc = formData.get('task')

    await ToDoTasks.create({ data: { task: taskDesc, userID: user.id } })
    revalidatePath('/todo')
  }

  return (
    <div className="max-h-screen p-4 flex flex-col">
      <form action={addTask} >
        <TaskCreator />
      </form>

      <div className="mt-4 flex-1">
        <h2 className="font-medium uppercase text-sm">Pending tasks</h2>
        <ul className="mt-2">
          {pendingTasks.map((task) => <PendingTaskCard task={task} key={task.id} />)}
        </ul>
      </div>

      <div className="mt-4 flex-1">
        <h2 className="font-medium uppercase text-sm">Completed tasks</h2>
        <ul className="mt-2">
          {completedTasks.map((task) => <CompletedTaskCard task={task} key={task.id} />)}
        </ul>
      </div>
    </div>
  )
}