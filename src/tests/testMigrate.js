require('../models')

const sequelize = require("../utils/connection");
//require('../models/Actor')importacion container para solucionar el error 500 al correr el test, esto se hace para que el test reconozca el modelo

const testMigrate = async()=>{

    try{
        await sequelize.sync({ force:true })
        console.log('DB reset ✅');
        process.exit()
    }catch(error){
        console.error(error);
    }
}


testMigrate()