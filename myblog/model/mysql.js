var mysql = require('mysql');
var config = require('../config/default.js');
// control层有 controller城市南昌
// 艾溪湖 pool连接池 用的数据并不是所有的森林
// model数据库 森林
// mysql 数据库驱动
var pool = mysql.createPool({
    // 运维住机房
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})

// query所有查询堵通过这个方法
let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if(err) {
                resolve(err)
            } else {
                // 数据库驱动的API
                // rows结果集
                connection.query(sql, values, (err, rows) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })    
}

let findDataByName = function(name) {
    // return new Promise((resolve, reject) => {
        // 拼装业务sql 查询结果
        let _sql = `
            SELECT * FROM users
                where name="$(name)"
        `
        // 去查询
        // 统一的query执行
        return query(_sql);
    // })
}
// 添加注册用户
let insertData = function(value) {
    let _sql = `INSERT into users(name, pass) values(?,?);`
    return query(_sql, value)
}

module.exports = {
    findDataByName,
    insertData
}