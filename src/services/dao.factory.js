/**
 * Este factory "fabrica" la conexión a datos importando el DAO que corresponda
 * según el valor de config.PERSISTENCE
 */

import config from '../config.js';
import MongoSingleton from './mongo.singleton.js';
import CartService from './carts.dao.js';

let factoryCartService = {};

switch (config.PERSISTENCE) {
    case 'mysql':
        // Aquí vemos un ejemplo importando simplemente el DAO de Mysql
        // Dentro de los métodos del DAO se recuperará la instancia
        const MysqlCartService = await import('../services/carts.mysql.dao.js');
        factoryCartService = MysqlCartService.default;
        break;

    case 'mongo':
        // Aquí vemos otro ejemplo utilizando patrón Singleton para instanciar
        // la conexión a Mongo DB
        const { default: MongoSingleton } = await import('./mongo.singleton.js');
        await MongoSingleton.getInstance();
        
        const MongoCartService = await import('../services/carts.dao.js');
        factoryCartService = MongoCartService.default;
        break;
        
    default:
        throw new Error(`Persistencia ${config.PERSISTENCE} no soportada`);
}

export default factoryCartService;