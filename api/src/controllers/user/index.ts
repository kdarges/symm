import { Request, Response } from "express";
import { prisma } from "../../database";
import { user, Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'


// get all users
const getUsers = async (req: Request, res: Response): Promise<void> => {

    try {
        const users = await prisma.user.findMany()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({ "error": "In get users "+error, "response": null })
    }

}


const register = async (req: Request, res: Response): Promise<void> => {

    try {
        const user = await prisma.user.findFirst({
            where: { mail: req.body.mail }
        })
        console.log('user: ', user);
        
        // check if email exists
        if (user) {
            res.status(302).send({ "error": "Email already exist"})
            return;
        }
        // hash the password
        req.body.password = await bcrypt.hash(req.body.password, 12)

        try {
            console.log('password: ', req.body.password)

            // prisma create new user
            const user: Prisma.userCreateInput = await prisma.user.create(
                { data: req.body }
            );

            res.status(201).send({ "error": null, "response": user.mail })
        } catch (error) {
            res.status(500).send({ "error": "In create user "+error, "response": null })
        }
    } catch (error) {
        res.status(500).send({ "error": "In user "+error, "response": null })
    }

}


const login = async (req: Request, res: Response): Promise<void> => {

    // get user by mail
    const user = await prisma.user.findFirst({
        where: { mail: req.body.mail }
    })
    console.log('user: ', user);
    
    // check if email exists
    if (!user) {
        res.status(404).send({ "error": "Email not found", "token": null })
        return;
    }

    // check password
    const valid: boolean = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
        res.status(404).send({ "error": "Incorrect password", "token": null })
        return;
    }

    // set new token
    const token = jwt.sign({
        userId: user.id,
        userMail: user.mail
    }, process.env.JWT_SECRET,
    {
        expiresIn: '5m'
    });
    res.status(200).send({ "error": null, "token": token })

}


const deleteUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const deletedUser: user = await prisma.user.delete({
            where: { id: parseInt(req.params.id) }
        })

        res.status(200).send({ "error": null, "response": deletedUser.id })
    } catch (error) {
        res.status(500).send({ "error": error, "response": null })
    }
}


export { getUsers, login, register, deleteUser }