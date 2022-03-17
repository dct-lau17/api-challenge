const dataRoute = (app, fs) => {
  const dataPath = './data/data.json';

  // get /logs - send data to webpage
  app.get('/logs', (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    if (fs.existsSync(dataPath)) {
      const logs = fs.readFileSync(dataPath);
      const data = JSON.parse(logs);
      
      res.status(200).send(data);

      // delete file after data is sent;  
      fs.unlinkSync(dataPath);
      console.log('json file deleted');
    } else {
      res.status(404).send('Error: No data found');
    }
  });

  // post /log - create, write or append logs into data.json file
  app.post('/log', (req, res) => {
    const reqBody = req.body.payload || ''; 
    let data = [];

    if (fs.existsSync(dataPath)) {
      data = JSON.parse(fs.readFileSync(dataPath));
    } 

    data.push({
      'timeStamp': reqBody.timestamp || '',
      'action': reqBody.action || '',
      'file': reqBody.files || '',
      'folder': reqBody.folder || ''
    });

    console.log(data);

    fs.writeFileSync(process.cwd() + '/data/data.json', JSON.stringify(data, null, 2));
    res.status(200).send('Logs added successfully');
    console.log('Logs added successfully');

  });
};

module.exports = dataRoute;