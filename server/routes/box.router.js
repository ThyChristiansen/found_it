const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



//Send GET request to server-side to get box list
router.get('/:roomId', rejectUnauthenticated, (req, res) => {
    let roomId = req.params.roomId
    let userId = req.user.id;
    // console.log('----------> use this room id to get data:',roomId)
    queryString = `SELECT boxes.id, room_name,room_id, box_name, qr_code,status FROM boxes 
    JOIN rooms ON rooms.id = boxes.room_id WHERE room_id = $1 AND user_id = $2 ;`;
    pool.query(queryString, [roomId, userId])
        .then(result => {
            // console.log('Get this info from database', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR in GET BOX', error)
            res.sendStatus(500);
        })
});

//Send GET request to server-side to get box's detail
router.get('/:roomId/:id',rejectUnauthenticated, (req, res) => {
    let boxId = req.params.id;
    let roomId = req.params.roomId;
    let userId = req.user.id;
    console.log(' user id:',userId);

    let queryText = `SELECT boxes.id, room_name,room_id, box_name, qr_code, status FROM boxes 
    JOIN rooms ON rooms.id = boxes.room_id WHERE boxes.id = $1 AND room_id= $2 AND rooms.user_id = $3`;
    pool.query(queryText, [boxId, roomId, userId])
        .then((result) => {
            // console.log('get this row from database:',result.rows )
            res.send(result.rows)
        }).catch((error) => {
            console.log('ERROR in get detail:',error);
        })
})


 //POST route to add boxes
router.post('/:id', (req, res) => {
    // let qr_code = req.body.qr_code;
    let roomId = req.params.id;
    const queryText =  'INSERT INTO "boxes" (room_id,box_name, qr_code) VALUES ($1,(SELECT MAX(box_name)+1 FROM boxes WHERE room_id = $1), (SELECT MAX(qr_code)+1 FROM boxes WHERE room_id = $1));'
    pool.query(queryText,[roomId])
      .then(() => res.sendStatus(201)) // send status Created if send the POST request successfully
      .catch(() => res.sendStatus(500)); // / send status Error if do not send the POST request successfully

    // res.sendStatus(201);
});

router.delete('/:id', (req, res) => {
    // let boxId = req.params.boxId;
    let boxId = req.params.id;
    // We are using a request parameter (req.params) to identify
    // the specific box. We expect this will be an id from the database.
    // let roomId = req.params.roomId
    console.log('Delete request for this id: ', boxId);
    let sqlText = `DELETE FROM boxes WHERE id = $1`;
    pool.query(sqlText, [boxId])
        .then(result => {
            console.log('in DELETE router')
            res.sendStatus(200);
        }).catch(err => {
            console.log('Error in DELETE route', err);
            res.sendStatus(500);
        })
    // res.sendStatus(200);
})

 //POST route to add first box in the room
 router.post('/firstboxInRoom/:id', (req, res) => {
    // let qr_code = req.body.qr_code;
    let roomId = req.params.id;
    const queryText = 'INSERT INTO "boxes" (room_id,box_name, qr_code) VALUES ($1,1,1) RETURNING id';
    pool.query(queryText, [roomId])
        .then(() => res.sendStatus(201)) // send status Created if send the POST request successfully
        .catch(() => res.sendStatus(500)); // / send status Error if do not send the POST request successfully
    // res.sendStatus(201);
});

 //PUT route to update box status
router.put('/:id', (req, res) => {
    let boxId = req.params.id;
    console.log('Update request for this id: ',boxId);
    let sqlText = `UPDATE boxes SET status = TRUE WHERE id = $1`;
    pool.query(sqlText, [boxId])
        .then(result => {
            console.log('UPDATE this box by id:', boxId)
            res.sendStatus(200);
        }).catch(err => {
            console.log('Error in UPDATE route', err);
            res.sendStatus(500);
        })
})

module.exports = router;