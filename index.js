'use strict';

const KmeansCluster = require('./kmeans-clustering.js'),
    express = require('express'),
    multer = require('multer'),
    upload = multer({storage: multer.memoryStorage()}),
    app = express();

// create the server with 
// the port 8080. Set timeout for 
// 10 minutes
let server = app.listen( 8080 );
server.setTimeout( 10 * 60 * 1000 );

// READY WEBHOOK
app.get('/readyz', (req, res) => {
	res.status(200).send('OK');
});

// PROCESS WEBHOOK
app.post('/process', chunkUpload, async (req, res)=>{
	try {
 		let buffer = req.file.buffer.toString();
		let output = KmeansCluster.getOutput( buffer, null );
 		return res.status(200).send( output );
	} catch (error) {
		return res.status(500).send(error);
	}
});
