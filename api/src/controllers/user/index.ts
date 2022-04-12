import { Request, Response } from "express";
import { prisma } from "../../database";
import { User, Prisma } from "@prisma/client";


// get all users
const getUsers = async (req: Request, res: Response): Promise<void> => {

    try {
        const users = await prisma.user.findMany()
        res.status(200).send(users)
    } catch (error) {
        throw error
    }

}


// get user by id
const getUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) }
        })
        res.status(200).send(user)
    } catch (error) {
        throw error
    }

}


const addUser = async (req: Request, res: Response): Promise<void> => {

    try {
        let user: Prisma.UserCreateInput = req.body;

        const newUser: User = await prisma.user.create(
            { data: user }
        )

        res.status(201).send(newUser)
    } catch (error) {
        throw error
    }
}


const updateUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const updatedUser: User = await prisma.user.update({
            where: { id: parseInt(req.params.id ) },
            data: req.body
        })

        res.status(200).send(updatedUser)
    } catch (error) {
        throw error
    }

}


const deleteUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const deletedUser: User = await prisma.user.delete({
            where: { id: parseInt(req.params.id) }
        })

        res.status(200).send(deletedUser)
    } catch (error) {
        throw error
    }
}


export { getUsers, getUser, addUser, updateUser, deleteUser }