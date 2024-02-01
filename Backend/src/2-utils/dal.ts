import mysql from "mysql";
import appConfig from "./AppConfig";

const connection = mysql.createConnection(process.env.JAWSDB_URL || 'mysql://hw8npp2i1qk2z0c4:zh1bvw7a8ea4xsy6@r6ze0q02l4me77k3.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/g9au42qvgfwdhwr0' );


// const connection = mysql.createPool({
//     host: appConfig.host,
//     user: appConfig.username,
//     password : appConfig.password,
//     database : appConfig.database,
// });

function execute(sql: string, values?: any[] ): Promise<any>{
    return new Promise(( resolve, reject ) => {
        connection.query(sql, values, ( err, result ) => {
            if( err ){
                reject(err);
                return;
            }
            resolve(result);
        })
    });
}

export default {
    execute
}
