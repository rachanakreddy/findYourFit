import express from 'express';
import cors from 'cors';
import winston from 'winston';
import morgan from 'morgan';

const app = express();
const APIkey = "4c9f20fd262c5edcc8ed5e4b757adf15adc2377594f88ad3e135c097e283be01";

app.use(express.json());
app.use(morgan('dev'));
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

logger.info('Search Process pid = ' + process.pid);

app.post('/search', async (req, res) =>{
    logger.info('Search request pid = ' + process.pid);
    const userQuery = req.body.query;
    let query = userQuery.split(' ').join('+');
    const url = "https://serpapi.com/search.json?q=" + query + "&engine=google_images&ijn=0r&api_key=" + APIkey;
    const response = await fetch(url, {method: "GET"});
    const data = await response.json();
    const imageSrc = data.images_results[0].thumbnail;
    let resObj = {url: imageSrc};

    if(response.ok){logger.info('Search request was successful with user query: ' + userQuery + " with pid = " + process.pid);}
    else{logger.info('Search request failed with user query: ' + userQuery + " with pid = " + process.pid);}
    res.send(resObj);
});

app.listen(5173, () => {
    console.log("Search service running on port 5173 <3")
});