/**
 * passport.local siempre requiere 2 cosas: username y password
 * 
 * podemos usar el parámetro usernameField para cambiar el nombre del campo que
 * manejaremos como usuario (email en nuestro caso)
 * 
 * passport utiliza un callback done():
 *  - parámetro 1: el error (null indica que no hay error)
 *  - parámetro 2: el objeto con datos de usuario que se devuelve en la respuesta
 *      - done(null, user) -> user tendrá los datos de usuario
 *      - done(null, false) -> no hay error pero los datos de usuario no se devuelven
 * 
 * passport.use() nos permite configurar distintas estrategias
 */

import passport from 'passport'
import LocalStrategy from 'passport-local'
import GithubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import userModel from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'
import config from '../config.js'

const initPassport = () => {
    // Función utilizada por la estrategia registerAuth
    const verifyRegistration = async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, gender } = req.body

            if (!first_name || !last_name || !email || !gender) {
                return done('Se requiere first_name, last_name, email y gender en el body', false)
            }

            const user = await userModel.findOne({ email: username })

            // El usuario ya existe, llamamos a done() para terminar el proceso de
            // passport, con null (no hay error) y false (sin devolver datos de usuario)
            if (user) return done(null, false)
            
            const newUser = {
                first_name,
                last_name,
                email,
                gender,
                password: createHash(password)
            }

            const process = await userModel.create(newUser)

            return done(null, process)
        } catch (err) {
            return done(`Error passport local: ${err.message}`)
        }
    }

    // Función utilizada por la estrategia restoreAuth
    const verifyRestoration = async (req, username, password, done) => {
        try {
            if (username.length === 0 || password.length === 0) {
                return done('Se requiere email y pass en el body', false)
            }

            const user = await userModel.findOne({ email: username })

            // El usuario no existe, no podemos restaurar nada.
            // Llamamos a done() para terminar el proceso de
            // passport, con null (no hay error) y false (sin devolver datos de usuario)
            if (!user) return done(null, false)

            const process = await userModel.findOneAndUpdate({ email: username }, { password: createHash(password) })

            return done(null, process)
        } catch (err) {
            return done(`Error passport local: ${err.message}`)
        }
    }

    const verifyGithub = async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email })

            console.log(profile)

            if (!user) {
                const name_parts = profile._json.name.split(' ')
                const newUser = {
                    first_name: name_parts[0],
                    last_name: name_parts[1],
                    email: profile._json.email,
                    gender: 'NA',
                    password: ' '
                }
    
                const process = await userModel.create(newUser)
    
                return done(null, process)
            } else {
                done(null, user)
            }
        } catch (err) {
            return done(`Error passport Github: ${err.message}`)
        }
    }

    /**
     * Si passport pudo extraer correctamente el token, devuelve el payload 
     * (datos útiles contenidos en él), sino devuelve el error correspondiente
     */
    const verifyJwt = async (payload, done) => {
        try {
            return done (null, payload);
        } catch (err) {
            return done(err);
        }
    }

    /**
     * Passport no opera con las cookies de forma directa, por lo cual creamos
     * una función auxiliar que extrae y retorna la cookie del token si está disponible
     */
    const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) token = req.cookies['codertoken'];
        return token;
    }
    
    
    // Estrategia local de autenticación para registro
    passport.use('registerAuth', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pass'
    }, verifyRegistration))

    // Estrategia local de autenticación para restauración de clave
    passport.use('restoreAuth', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pass'
    }, verifyRestoration))

    // Estrategia para autenticación externa con Github
    passport.use('githubAuth', new GithubStrategy({
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GITHUB_CALLBACK_URL
    }, verifyGithub))

    // Estrategia para autenticación con JWT
    passport.use('jwtAuth', new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'Coder55605_Key_Jwt'
    }, verifyJwt))


    // Métodos "helpers" de passport para manejo de datos de sesión
    // Son de uso interno de passport, normalmente no tendremos necesidad de tocarlos.
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
        
    passport.deserializeUser(async (id, done) => {
        try {
            done(null, await userModel.findById(id))
        } catch (err) {
            done(err.message)
        }
    })
}

export default initPassport