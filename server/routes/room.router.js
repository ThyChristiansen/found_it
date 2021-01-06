const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



//Send GET request to get room list
router.get('/:userId', rejectUnauthenticated, (req, res) => {
    let userId = req.user.id;
    // console.log('user id', userId)
    queryString = `SELECT * FROM "rooms" WHERE user_id = $1;`;
    pool.query(queryString, [userId])
        .then(result => {
            // console.log('Get this info from database', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR in GET_ROOM', error)
            res.sendStatus(500);
        })
});

//Send POST request to create room list
router.post('/', (req, res) => {
    let userId = req.user.id;
    // console.log('------>in POST router', userId);

    queryString = `INSERT INTO rooms (user_id, room_name) VALUES ($1,'Storage'),
     ($1,'Basement'),
     ($1,'Garage'),
     ($1,'Livingroom'),
     ($1,'Bedroom'),
     ($1,'Kitchen'); `;
    pool.query(queryString, [userId])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('ERROR in CREATE_ROOM_LIST', error)
            res.sendStatus(500);
        })
    // res.sendStatus(200);
});


module.exports = router;