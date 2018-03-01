const express = require('express');
const app = express();
const compression = require('compression');
const morgan = require('morgan');
const router = require('./router');

const myCompression = compression();
app.use(myCompression)

app.use(morgan('tiny'));
app.use(express.json());

app.use(express.urlencoded());
const publicRoot = __dirname +'/public';
console.log(publicRoot);
app.use('/static',express.static(publicRoot));


// a mettre en dernier
app.use(router);



app.listen(80, (err) =>{
    if (err){
        console.log(err && err.stack || err)
        process.exit(255)
    }else{
        console.log('done');
    }

})

app.use((req,res,next) => {
    next()
})








