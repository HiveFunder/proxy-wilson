const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const proxy = require('http-proxy-middleware');
const axios = require('axios');
const newrelic = require('newrelic');

const port = 3000;
const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/api/:projectId', express.static(path.resolve(__dirname, '../public')));

// app.get('/api/:projectId', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../public/index.html'));
// });

app.use('/api/:projectId/updates',
  proxy({
    target: 'http://13.57.28.73/',
    changeOrigin: true
  })
);

// app.get('/api/:projectId/updates', 
//   proxy({
//     target: 'http://localhost:8080'
//   })
// )

app.listen(port, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Proxy listening at PORT: ${port}`);
});


// app.get('/listings/:id/reviews', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://18.191.158.244/listings/${id}/reviews`);
// });


// app.get(`/listings/:id/reviews`, (req, res) => {
// 	axios.get(`http://18.191.158.244/listings/${req.params.id}/reviews`)
// 		.then(resp => res.status(200).send(resp.data))
// 		.catch(err => res.status(500).end(err.message));
// })