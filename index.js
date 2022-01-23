const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const upload = require('express-fileupload');
const mongoose = require('mongoose');
const infos = require('./info');
const fs = require('fs');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(upload());

var id_info = 1;

app.post('/add', async (req, res)=>{

    if(req.files){
        const { location, city, rooms, price, facilities } = req.body;
        const folderName = './uploads/user-'+id_info++;

        try {
            if(!fs.existsSync(folderName)){
                fs.mkdirSync(folderName);
            }
        } catch(err) {
            console.log(err);
        }

        const file1 = req.files.img1;
        const file2 = req.files.img2;

        const img1 = folderName+'/'+'img1';
        const img2 = folderName+'/'+'img2';

        file1.mv(img1);
        file2.mv(img2);

        try{
            const user = await infos.create({ location, city, rooms, price, facilities, img1, img2 });
        } catch(err){
            console.log(err)
        }

    }

    res.redirect('/');

});


mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
    })
    .then((result) => {
        app.listen(port, ()=>{
            console.log(`server running at ${port}`);
        });
        console.log("database connected");
    })
    .catch((err) => console.log(err));



