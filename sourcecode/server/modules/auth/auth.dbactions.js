const db = require("../../models");
const authDbAction = {
    async authenticateUser(email,password){
        var data = await db.sequelize.query(`CALL bs_user_get('${email}','${password}')`);
        console.log(data[0].user_type_id);
        return data[0]
    }
}

module.exports = authDbAction;