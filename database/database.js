import { mongoose,  Schema } from 'mongoose';
import express from 'express';
import cors from 'cors';
import winston from 'winston';
import morgan from 'morgan';

const uri = "mongodb+srv://rachanakreddy:LeqADcTUM6ryNVuR@cluster0.ghbxcrf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = new Schema({top: String, bottoms: String, shoes: String, acc: Array, name: String});
const Outfits = mongoose.model('Outfit', schema);
await Outfits.createCollection();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'app.log'})
    ]
});

logger.info('Database Process pid = ' + process.pid);

app.post('/add', (req, res) => {
    logger.info('Database add request pid =' + process.pid);
    const currFit = req.body;
    let currTop = currFit.top;
    let currBottoms = currFit.bottoms;
    let currShoes = currFit.shoes;
    let currAcc = currFit.acc;
    let currName = currFit.name;
    const fit = new Outfits({top: currTop, bottoms: currBottoms, shoes: currShoes, acc: currAcc, name: currName}); 
    logger.info('Database add request successful. Outfit: ' + currFit.name + 'pid =' + process.pid);
    fit.save();
});

app.get('/read', async (req, res) => {
    logger.info('Database read request pid =' + process.pid);
    const response = await Outfits.find().exec();
    if(response.ok){logger.info('Database read request successful. pid =' + process.pid);}
    else{logger.info('Database read request failed. pid =' + process.pid);}
    res.send(response);
});

app.listen(4000, () =>{
    console.log("Database service is running on Port 4000");
});