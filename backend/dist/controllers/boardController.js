import { prisma } from "../../lib/prisma";
export const getBoards = async (req, res) => {
    try {
        const boards = await prisma.boards.findMany();
        return res.json(boards);
    }
    catch (e) {
        console.error(e);
    }
};
export const postBoards = async (req, res) => {
    try {
        const { title } = req.body;
        const newBoard = await prisma.boards.create({
            data: {
                title: title
            }
        });
        return res.status(200).json({ 'message': 'OK' });
    }
    catch (e) {
        console.error(e);
    }
};
