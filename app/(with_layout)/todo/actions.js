'use server'

import { ToDoTasks } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

export async function resolveTask(taskID) {
  await ToDoTasks.update({ where: { id: taskID }, data: { completedOn: new Date() } })
  revalidatePath('/todo')
  return
}

export async function updateTask(taskID, updatedTask) {
  await ToDoTasks.update({ where: { id: taskID }, data: { task: updatedTask } })
  revalidatePath('/todo')
  return
}

export async function reinitiateTask(taskID) {
  await ToDoTasks.update({ where: { id: taskID }, data: { completedOn: null } })
  revalidatePath('/todo')
  return
}

export async function deleteTask(taskID) {
  await ToDoTasks.delete({ where: { id: taskID } })
  revalidatePath('/todo')
  return
}

export async function addTask(formData) {
  'use server'
  const taskDesc = formData.get('task')

  await ToDoTasks.create({ data: { task: taskDesc, userID: user.id } })
  revalidatePath('/todo', 'page')
}
