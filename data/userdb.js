const { TooManyRequests } = require('http-errors');
const {Connection, Request } = require('tedious');

const config = {
    authentication: {
        options: {
            userName: 'webappdbuser',
            password: 'pasmskjdsnds!i(98892jsdkasd'

        },
        type: 'default'
    },
    server: 'jlsfdb.database.windows.net',
    options: {
        database: 'webappdb',
        encrypt: true,
        trustServerCertificate: false,
        rowCollectionOnDone: true,
        rowCollectionOnRequestCompletion: true,
        validateBulkLoadParameters: false
    }
};

//just becasue tedious doen't include promises.

const getConnection = async () => {
    return new Promise((resolve, reject) => {
       const connection = new Connection(config);
       connection.on('connect', (err) => {
           if(err) {
               reject(err);
           } else {
               resolve(connection);
           }
       });
    });
}

const executeQuery = async (sql) => {
    return new Promise(async (resolve, reject) => {
        try{
            const connection = await getConnection();
            const request = new Request(sql,(err,rowCount, rows) => {
                console.log('.... al Query....');
                console.log(sql);
                if(err) {
                    reject(err);
                } else {
                    console.log(rowCount);
                    console.log('el resultado es:');
                    console.log(rows);
                    resolve({rowCount: rowCount, rows: rows});
                }
            });
            connection.execSql(request);
        } catch(err) {
            reject(err);
        }
    });
}


module.exports.createUsers = async () => {
  const sql = `
  INSERT INTO USERS (name,email) VALUES ('David','david@gmail.com')
  INSERT INTO USERS (name,email) VALUES ('evan','evan@gmail.com')
  INSERT INTO USERS (name,email) VALUES ('Maria','lamary@gmail.com')
  `;
  return await executeQuery(sql);
};

module.exports.queryUsers = async () => {
   const sql = `SELECT * FROM USERS`;
   return await executeQuery(sql);
};