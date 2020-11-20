const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



//Send the GET request to get the result after searching
router.get('/:searchValue',rejectUnauthenticated, (req, res) => {
    let userId = req.user.id;
    console.log('userid is:', userId)
    let searchValue = req.params.searchValue;
    console.log('------send this value to server to search', searchValue);
    let queryText = `SELECT boxes.id, room_name, box_name, boxes.room_id FROM rooms 
    JOIN boxes ON rooms.id = boxes.room_id
    JOIN items ON boxes.id = items.box_id
    WHERE item ILIKE '%${searchValue}%' AND items.user_id = $1;`;
    pool.query(queryText,[userId])
        .then((result) => {
            console.log('get this row from table items:',result.rows )
            res.send(result.rows)
        }).catch((error) => {
            console.log('Error in GET items:',error);
        })
    // res.sendStatus(200);
});



module.exports = router;