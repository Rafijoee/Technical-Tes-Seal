const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Task {
    static async getAll() {
        return prisma.task.findMany();
    }
    static async getByUser(userId){
        const task =  prisma.task.findMany({
            where: {
                userId: userId
            },
            select : {
                task : true
            }
        });

        console.log( task );
        return task;
    }
    static async create (data){
        try {
            const { name, description, status } = data;
            return  await prisma.task.create({
                data: {
                    name,
                    description,
                    status,
                }
            });
        }catch (err){
            console.log(err);
        }
    }
    static async getById(id){
        const task = await prisma.task.findFirst({
            where: {
                id: id
            }, select: {
                id : true,
                name : true,
                description : true,
                status : true,
                tasks : true
            }
        });        
        return task;

    }
    static async update (id, data){
        try {
            const { name, description, status } = data;
            return await prisma.task.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    description,
                    status,
                }
            });
        }catch (err){
            console.log(err);
        }
    }
    static async delete (id){
        try {
            return await prisma.task.delete({
                where: {
                    id: id
                }
            });
        }catch (err){
            console.log(err);
        }
    }
}

module.exports = Task;