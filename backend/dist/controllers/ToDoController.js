import { prisma } from "../../lib/prisma";
export const getTasks = async (req, res) => {
    try {
        const { boardId } = req.params;
        const status = typeof req.query.status === 'string' ? req.query.status : undefined;
        const priority = typeof req.query.priority === 'string' ? req.query.priority : undefined;
        const tasks = await prisma.tasks.findMany({
            where: {
                boardId: Number(boardId),
                ...(status && { status }),
                ...(priority && { priority })
            }
        });
        if (tasks.length === 0) {
            return res.status(200).json({ 'message': 'no task found' });
        }
        return res.status(200).json(tasks);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ 'message': 'Internal server error' });
    }
};
export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const { boardId } = req.params;
        const task = await prisma.tasks.create({
            data: {
                title: title,
                //status: status,
                //priority: priority,
                description: description,
                dueDate: dueDate,
                boardId: Number(boardId)
            }
        });
        return res.status(201).json({ 'message': 'Task Created' });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ 'message': 'Internal server Error' });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskDelete = await prisma.tasks.delete({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json({ 'message': 'Deleted' });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ 'message': 'Internal server error' });
    }
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status, priority, description, dueDate } = req.body;
        const taskUpdate = await prisma.tasks.update({
            where: {
                id: Number(id)
            },
            data: {
                ...(title && { title }),
                ...(status && { status }),
                ...(priority && { priority }),
                ...(description && { description }),
                ...(dueDate && { dueDate }),
            }
        });
        return res.status(200).json({ 'message': 'Updated' });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ 'message': 'Internal server error' });
    }
};
