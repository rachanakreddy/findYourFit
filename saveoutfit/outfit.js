import express from 'express';
import cors from 'cors';
import winston from 'winston';
import morgan from 'morgan';

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

logger.info('Outfit Process pid = ' + process.pid);

app.post('/add', async (req, res) =>{
    logger.info('Outfit add request pid =' + process.pid);
    const currFit = req.body;
    const response = await fetch('http://localhost:4000/add', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(currFit)
    });
    if(response.ok){logger.info('Outfit add request successful. Outfit: ' + currFit.name + 'pid =' + process.pid);}
    else{logger.info('Outfit add request failed. Outfit: ' + currFit.name + 'pid =' + process.pid);}
});

app.get('/read', async(req, res) => {
    logger.info('Outfits read request pid =' + process.pid);
    const response = await fetch('http://localhost:4000/read');
    const data = await response.json();
    if(response.ok){logger.info('Outfit read request successful. pid =' + process.pid);}
    else{logger.info('Outfit read request failed. pid =' + process.pid);}
    res.send(data);
});

app.listen(3003, () => {
    console.log("Local outfit service running on port 3003 <3")
});