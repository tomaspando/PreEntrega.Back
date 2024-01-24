import UserService from "../services/users.dao.js"

const service = new UserService


export class UserManager {
    constructor() {
    }

    /* createUser = async () => {
        try {
            const {first_name, last_name, email, password} = req.body 

            //Verificamos si el usuario ya existe

            const existingUser = await userModel.findOne({email})

            if(existingUser){
                return res.status(400).json({error: "El usuario ya existe"})
            }

            //Crear nuevo usuario

            const newUser = new userModel({first_name, last_name, email, password})

            await newUser.save()

            res.status(201).json({message: "Usuario creado exitosamente"})
        } catch (error) {
            console.error("Error al crear usuario", error)

            res.status(500).json({error:"Error interno del servidor"})
        }
    } */

    async getUsers() {
        try {
            const process = await service.getUsers()
            return process
        } catch (err) {
            return err.message
        }
        
    }

    async getUsersPaginated(page, limit) {
        try {
            return await service.getUsersPaginated(page,limit)
        } catch (err) {
            return err.message
        }
    }
}

export default UserManager