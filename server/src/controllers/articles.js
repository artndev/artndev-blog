import mysql from 'mysql2/promise';


// CREATE TABLE Articles (
//     Id INT AUTO_INCREMENT,
//     Title VARCHAR(255) NOT NULL,
//     Text TEXT NOT NULL,
//     Date DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(Id)
// );

export async function GetAllArticles() {
    const con = await mysql.createConnection({
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DBNAME,
        password: process.env.MYSQL_PASSWORD
    })

    return await con
        .query(
            'SELECT * FROM `Articles`'
        )
        .then(([rows]) => {
            return {
                ans: true,
                msg: rows
            }
        })
        .catch((err) => {
            console.log(err)
            
            return {
                ans: null,
                msg: err
            }
        })
        .finally(async () => {
            await con.end()
        })
}

export async function GetArticle(id) {
    return await connection
        .query(
            'SELECT * FROM `Articles` WHERE Id = ?',
            id
        )
        .then(([rows]) => {
            return {
                ans: true,
                msg: rows
            }
        })
        .catch((err) => {
            console.log(err)
            
            return {
                ans: null,
                msg: err
            }
        });
}

export async function CreateArticle(title, text) {
    return await connection
        .query(
            "INSERT INTO `Articles` SET ?",
            {
                Title: title,
                Text: text
            }
        )
        .then(([rows]) => {
            return {
                ans: true,
                msg: rows
            }
        })
        .catch((err) => {
            console.log(err)
            
            return {
                ans: null,
                msg: err
            }
        });
}

export async function EditArticle(title, text, id) {
    return await connection
        .query(
            "UPDATE `Articles` SET ? WHERE Id = ?",
            [
                { 
                    Title: title,
                    Text: text
                },
                id
            ]
        )
        .then(([rows]) => {
            if (rows.affectedRows === 0)
                throw "Theres no article with this id"

            return {
                ans: true,
                msg: rows
            }
        })
        .catch((err) => {
            console.log(err)
            
            return {
                ans: null,
                msg: err
            }
        });
}

export async function DeleteAllArticles() {
    return await connection
        .query(
            "TRUNCATE TABLE `Articles`",
        )
        .then(([rows]) => {
            return {
                ans: true,
                msg: rows
            }
        })
        .catch((err) => {
            console.log(err)
            
            return {
                ans: null,
                msg: err
            }
        });
}

export async function DeleteArticle(id) {
    return await connection
        .query(
            "DELETE FROM `Articles` WHERE Id = ?",
            id
        )
        .then(([rows]) => {
            if (rows.affectedRows === 0)
                throw "Theres no article with this id"

            return {
                ans: true,
                msg: rows
            }
        })
        .catch((err) => {
            console.log(err)
            
            return {
                ans: null,
                msg: err
            }
        });
}