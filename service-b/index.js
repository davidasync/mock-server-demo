const express = require('express')
const bluebird = require('bluebird');
const app = express();
const fs = require('fs');
 
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

app.post('/accom/user/profile', (req, res) => bluebird.resolve()
  .then(async () => {
    console.log('[INFO] Path=/accom/user/profile')
    const result = JSON.parse(fs.readFileSync(`${__dirname}/response-payload.json`, 'utf8'))
    
    return res.status(200).send(result);
  })
)

app.listen(61101, () => {
  console.log(`Listen at port 61101`)
})
