import { ToDoTasks } from "@/prisma/prisma"
import { getUser } from "@/utils/getUser"
import { revalidatePath } from "next/cache"
import { TaskCard, TaskCreator } from "./client"

export const revalidate = 60 * 60

async function getUserTasks() {
  const user = await getUser()
  const tasks = await ToDoTasks.findMany({ where: { userID: user.id, completedOn: null } })

  return [user, tasks]
}

export default async function Page() {
  const [user, tasks] = await getUserTasks()

  async function addTask(formData) {
    'use server'
    const taskDesc = formData.get('task')

    await ToDoTasks.create({ data: { task: taskDesc, userID: user.id } })
    revalidatePath('/todo')
  }

  return (
    <div className="max-h-screen flex flex-col">
      <form action={addTask} className="mb-4">
        <TaskCreator />
      </form>

      <div className="my-6 flex-1">
        <h2 className="font-medium">Pending tasks</h2>
        <ul className="mt-2">
          {tasks.map((task) => <TaskCard task={task} key={task.id} />)}
        </ul>
      </div>
    </div>
  )
}