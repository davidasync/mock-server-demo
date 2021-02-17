const express = require('express')
const bluebird = require('bluebird');
const Bluebird = require('bluebird');
const app = express();
const fs = require('fs');

const request = Bluebird.promisifyAll(require('superagent')).agent();

app.get('/', (req, res) => bluebird.resolve()
  .then(async () => {
    await bluebird.delay(2 * 1000)
    
    return res.send('Hello World')
  })
)

app.get('/500', (req, res) => bluebird.resolve()
  .then(async () => {
    
    return res.status(500).send('error 500')
  })
)

app.get('/400', (req, res) => bluebird.resolve()
  .then(async () => {
    
    return res.status(400).send('error 400')
  })
)

app.get('/timeout', (req, res) => bluebird.resolve()
  .then(async () => {
    await bluebird.delay(60 * 1000)
    
    return res.status(500).send('error 500')
  })
)

app.post('/getHotelReviews', (req, res) => bluebird.resolve()
  .then(async () => {
    console.log('[INFO] Path=/getHotelReviews')
    const result = JSON.parse(fs.readFileSync(`${__dirname}/request-payload.json`, 'utf8'))

    const response = await request
    .post('http://mountebank:51101/accom/user/profile')
    .send(result);

    return res.status(200).send(response.text);
  })
)
 
app.listen(29203, () => {
  console.log(`Listen at port 29203`)
})
