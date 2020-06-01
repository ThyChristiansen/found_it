const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


////Send POST request to get house's name
router.get('/:userId', rejectUnauthenticated, (req, res) => {
    let userId = req.params.userId
    // console.log('user id', userId)
    queryString = `SELECT * FROM "house" WHERE user_id = $1;`;
    pool.query(queryString, [userId])
        .then(result => {
            // console.log('Get this info from database', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR in GET_HOUSE_NAME', error)
            res.sendStatus(500);
        })
});

//Send POST request to create house's name
router.post('/', (req, res) => {
    let userId = req.body.userId
    let houseName = req.body.houseName
    console.log('------>in POST houseName', userId,houseName );

    queryString = `INSERT INTO house (user_id,house_name) VALUES ($1,$2);`;
    pool.query(queryString, [userId,houseName])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('ERROR in CREATE_HOUSE_NAME', error)
            res.sendStatus(500);
        })
    // res.sendStatus(200);
});


module.exports = router;