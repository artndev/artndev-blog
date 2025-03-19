import pool from './pool.js';


// CREATE TABLE Likes (
//     ArticleId INT NOT NULL,
//     UserId INT NOT NULL,
//     PRIMARY KEY(ArticleId, UserId),
//     CONSTRAINT ArticleIdFK FOREIGN KEY(ArticleId) REFERENCES Articles(Id),
// 	   CONSTRAINT UserIdFK FOREIGN KEY(UserId) REFERENCES Users(Id)
// );

export async function LikeArticle(req, res) {
    try {
        const { id } = JSON.parse(req.cookies.user_data)

        // run db query
        await pool.query(
            'INSERT INTO `Likes` (ArticleId, UserId) VALUES (?, ?);',
            [req.query.article_id, id]
        )

        res.status(200).json({
            message: "You have successfully liked this article"
        })
    } catch(err) {
        console.log(err)

        res.status(500).json({ ...err })
    }
}

export async function DislikeArticle(req, res) {
    try {
        const { id } = JSON.parse(req.cookies.user_data)

        // run db query
        const [rows] = await pool.query(
            'DELETE FROM `Likes` WHERE ArticleId = ? AND UserId = ?;',
            [req.query.article_id, id]
        )
        
        // check for dislike
        if (!rows.affectedRows)
            throw {
                message: "You have already disliked this article"
            }

        res.status(200).json({
            message: "You have successfully disliked this article"
        })
    } catch(err) {
        console.log(err)

        res.status(500).json({ ...err })
    }
}

export async function GetLikes(req, res) {
    try {
        // run db query
        const [rows] = await pool.query(
            'SELECT COUNT(*) AS likes FROM (SELECT * FROM `Likes` WHERE ArticleId = ?) AS alias;',
            req.query.article_id
        )
        
        res.status(200).json({
            message: "You have successfully got likes of this article",
            ...rows[0]
        })
    } catch(err) {
        console.log(err)

        res.status(500).json({ ...err })
    }
}