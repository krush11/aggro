'use server'

import { ToDoTasks } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

export async function resolveTask(taskID) {
  await ToDoTasks.update({ where: { id: taskID }, data: { completedOn: new Date() } })
  revalidatePath('/todo')
  return
}