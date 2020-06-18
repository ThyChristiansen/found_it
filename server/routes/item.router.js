const express = require('express');
const pool = require('../modules/pool');
// const FormData = require('form-data');
const router = express.Router();

const multer = require('multer');
const multerDest = process.env.multer_dest || '../uploads';
const upload = multer({ dest: multerDest });
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const { uploadPost, generateSignedUrls } = require('../modules/imageHandler');



router.get('/:id', rejectUnauthenticated, (req, res) => {
    let boxId = req.params.id
    let userId = req.user.id;
    console.log('-------------->from get item, boxId:', boxId);
    let queryText = `SELECT * FROM items WHERE box_id = $1 AND user_id = $2 ORDER BY id DESC`;
    pool.query(queryText, [boxId, userId])
        .then((result) => {
            // console.log('get this row from database:', generateSignedUrls(res, result.rows))
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('Error in GET items:', error);
        })
})


router.post('/:roomId/:id', (req, res) => {

    let item = req.body.itemData.item;
    let boxId = req.params.id;
    let roomId = req.params.roomId;
    let userId = req.user.id;

    console.log('send this item to database', req.body.itemData.item);
    const queryText = 'INSERT INTO "items" (item,box_id,room_id,user_id) VALUES ($1,$2,$3,$4) RETURNING id';
    pool.query(queryText, [item, boxId, roomId, userId])
        .then(() => {
        console.log("item from server",req.body.itemData.item)
        res.sendStatus(201)
        }) // send status Created if send the POST request successfully
        .catch(() => res.sendStatus(500)); // / send status Error if do not send the POST request successfully
    // res.sendStatus(201);
});

router.post('/:roomId/:id', upload.single('file'), (req, res) => {
    uploadPost(req, res);
});


router.delete('/:id', (req, res) => {
    let itemId = req.params.id;// We are using a request parameter (req.params) to identify
    // the specific picture. We expect this will be an id from the database.
    console.log('Delete request for this id: ', itemId);
    let sqlText = `DELETE FROM items WHERE id = $1`;
    pool.query(sqlText, [itemId])
        .then(result => {
            console.log('DELETE this item by id:', itemId)
            res.sendStatus(200);
        }).catch(err => {
            console.log('Error in DELETE route', err);
            res.sendStatus(500);
        })
})

router.put('/:id', (req, res) => {
    let itemId = req.params.id;
    let item = req.body.item;
    console.log('---->Update request for this id: ', item, itemId);
    let sqlText = `UPDATE items SET item = $1 WHERE id = $2`;
    pool.query(sqlText, [item, itemId])
        .then(result => {
            console.log('UPDATE this item by id:', itemId)
            res.sendStatus(200);
        }).catch(err => {
            console.log('Error in UPDATE route', err);
            res.sendStatus(500);
        })
})

// function initUppy() {
//     uppyOptions = {
//         providerOptions: {
//             google: {
//                 key: "your google client id/key",
//                 secret: "your google client secret"
//             },
//             dropbox: {
//                 key: "your Dropbox client id/key",
//                 secret: "your Dropbox client secret"
//             },
//             s3: {
//                 key: AKIAZ4PB4KPGPIBVA5OY,
//                 secret: eBVC1d9MFzUyHo8LL6W0cR9l1jYB1RkbFm4sePXK,
//                 bucket: "Your S3 bucket url",//e.g. mybucket123
//                 region: "Your S3 region "// e.g. ap-south-1 they skipped this one in their official doc. Don't forget to pass this.
//             }
//         },
//         server: {
//             host: "http://localhost:5000",//your host. could be yoursite.com
//             protocol: "http"//your protocol. http or https.
//         },
//         filePath: "./downloads",//filepath to store users' temporary files, before uploading them.
//         secret: "some-secret",//could be any string.
//         debug: false//set true to recieve uppy logs.
//     };

//     app.use(uppy.app(uppyOptions));//instantiate uppy server.
//     uppy.socket(app.listen(PORT), uppyOptions);//move your app.listen here.
// }
// initUppy();//run uppy instantiation function



module.exports = router;