import userModel from '../dao/models/user.model.js'

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
            const users = await userModel.find().lean()
            // const users = await userModel.find({ first_name: 'Celia' }).explain('executionStats')
            return users
        } catch (err) {
            return err.message
        }
        
    }

    async getUsersPaginated(page, limit) {
        try {
            // Podemos usar el método paginate gracias a que hemos agregado el módulo mongoose-paginate-v2.
            // También podríamos hacerlo manualmente, pero este módulo es muy cómodo y nos devuelve todos
            // los datos necesarios en la respuesta para armar el paginado en el frontend.
            // Por supuesto, los valores de offset y limit, pueden llegar como parámetros.
            return await userModel.paginate(
                { gender: 'Female' },
                { offset: (page * 50) - 50, limit: limit, lean: true }
            )
        } catch (err) {
            return err.message
        }
    }
}

export default UserManager