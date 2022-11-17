const express = require('express'); 
var cookieParser = require('cookie-parser');
var path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const admin = require('firebase-admin');
const serviceAccount = require("./oktaralogisticapp-firebase-adminsdk-1tr2e-307867f04a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://oktaralogisticapp-default-rtdb.firebaseio.com/'
});

var db = admin.database();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
});

app.get('/getPackages', (req, res) => {
    db.ref('Packages').once('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      res.status(200).json({ data });
    })
    .catch( err => {
        res.status(500).json({ err: err });
    });
})

app.post('/setPackages', (req, res) => {
  db.ref('Packages').once('value', (snapshot) => {
    var data = snapshot.val();
    data!=null ? data.push(req.body):data=[req.body];
    db.ref('Packages').set(data, (snapshot) => {
      res.status(200).json({ "ok":true });
    });
  })
});

app.put('/updatePackage', (req, res) => {
  const { list, status } = req.body;
  db.ref('Packages').once('value', (snapshot) => {
    var data = snapshot.val();
    data.forEach(package => {
      if (list.includes(package.location.id)){
        package.status=status;
      }
    });
    db.ref('Packages').set(data, (snapshot) => {
      res.status(200).json({ "data":data });
    });
  })
});

app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});