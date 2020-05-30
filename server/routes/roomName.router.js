const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



//GET boxes route
router.get('/:roomId', (req, res) => {
    let roomId = req.params.roomId;
    console.log(' room id:',roomId);
    let queryText = `SELECT room_name FROM rooms 
    WHERE id = $1 ;`;
    pool.query(queryText, [roomId])
        .then((result) => {
            console.log('----> get this name from database:',result.rows)
            res.send(result.rows)
        }).catch((error) => {
            console.log('ERROR in get detail:',error);
        })
})

module.exports = router;