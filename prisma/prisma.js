import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const User = prisma.appUsers
export const Tools = prisma.tools
export const ToolUsers = prisma.toolUsers
export const ToDoTasks = prisma.todo
