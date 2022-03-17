const express = require("express"),
  app = express(),
  fs = require("fs"),
  axios = require("axios");
  
  port = process.env.PORT || 3030;


let createFileLoop = "",
  deleteFileLoop = "",
  processStarted = false;

app.get("/", (req, res) => {
  res.send("hello world!!!");
});

app.get("/api/start", (req, res) => {
  if (!processStarted) {
    res.status(200).send("file creation started");
    startProcess();
  } else {
    res.status(404).send("process already started");
  }
});

app.get("/api/stop", (req, res) => {
  stopProcess();
  res.status(200).send("file creation stopped");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}..... `);
});

//req.query req.params

// store current actions
// reset when data has been sent

const startProcess = () => {
  processStarted = true;
  console.log("processing has started...");
  createFile();
  deleteFiles(`${process.cwd()}/files/`);
  createFileLoop = setInterval(createFile, 3000); // change this to 30 seconds
  deleteFileLoop = setInterval(() => {
    deleteFiles(`${process.cwd()}/files/`);
  }, 3000); // change this to 5mins
};

const stopProcess = () => {
  clearInterval(createFileLoop);
  clearInterval(deleteFileLoop);
  console.log("processing has stopped...");
  processStarted = false;
};

const createDir = (dirPath) => {
  fs.mkdirSync(dirPath);
  console.log(`Directory ${dirPath} created`);
};
// create files SEND API CALL
const createFile = () => {
  const path = getTodaysDatePath(),
   folder = path.split('/')


  if (!fs.existsSync(path)) {
    createDir(path);
    sendToTask3('create', folder[folder.length - 1] );
    console.log("Directory created: ", path);
  }

  // create file name, if exists recall function
  const fileName = wordGenerator() + ".txt",
    filePath = path + "/" + fileName;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
    sendToTask3("create", folder[folder.length - 1], [fileName]);
    console.log(`File ${fileName} was succesfully saved!`);
  } else {
    console.log(`${fileName} already exists! Creating another...`);
    createFile();
  }
};

const deleteFiles = function (dir) {
  const files = fs.readdirSync(dir);
  //const filelist = filelist || [];
  files.forEach((file) => {
    let path = dir + file;
    if (fs.statSync(path).isDirectory()) {
      // console.log(fs.readdirSync(path).length);

      // remove old directories SEND API CALL
      // remove all files in the directory before removing the older folder emptied
      if (path !== getTodaysDatePath()) {
        deleteFiles(path + "/");
      }
      // remove empty directories SEND API CALL
      if (fs.readdirSync(path).length === 0) {
        fs.rmdirSync(path, { recursive: true });
        console.log("folder deleted: ", path);
      } else {
        // recursive to loop folder
        deleteFiles(path + "/");
      }
    } else {
      // delete files older than 2mins SEND API CALL
      const fileStats = fs.statSync(path),
        now = new Date().getTime(),
        endTime = new Date(fileStats.ctime).getTime() + 6000; // change this to 2mins
      if (now > endTime) {
        fs.unlinkSync(path);
        console.log("file deleted: " + path);
      }
    }
  });
};

// =============================================================================================
// random name Generator
// const randomWords = [
//   "fill",
//   "tangible"]

const getTodaysDatePath = () => {
  const today = new Date(),
    todayDatePath = `${process.cwd()}/files/${today.getDate()}-${
      today.getMonth() + 1
    }-${today.getFullYear()}`;

  return todayDatePath;
};

const randomWords = [
  "fill",
  "tangible",
  "route",
  "awesome",
  "impress",
  "capable",
  "scene",
  "grandmother",
  "enjoy",
  "event",
  "property",
  "credit",
  "numerous",
  "frighten",
  "scandalous",
  "public",
  "hallowed",
  "responsible",
  "fact",
  "pipe",
  "materialistic",
  "incandescent",
  "chunky",
  "trees",
  "knotty",
  "loud",
  "pack",
  "warn",
  "brake",
  "instrument",
  "disgusting",
  "melted",
  "tick",
  "blue-eyed",
  "stew",
  "feeling",
  "discreet",
  "acceptable",
  "offend",
  "shape",
  "polite",
  "beginner",
  "greasy",
  "stay",
  "sun",
  "change",
  "unusual",
  "lush",
  "doctor",
  "donkey",
  "cooing",
  "beam",
  "mighty",
  "truculent",
  "physical",
  "mellow",
  "remind",
  "lean",
  "glistening",
  "excellent",
  "womanly",
  "fixed",
  "ship",
  "squash",
  "reject",
  "eyes",
  "return",
  "girls",
  "young",
  "x-ray",
  "exclusive",
  "comparison",
  "berry",
  "alike",
  "wistful",
  "nest",
  "maid",
  "thing",
  "secret",
  "difficult",
  "tin",
  "heady",
  "hour",
  "vast",
  "shiny",
  "handle",
  "tame",
  "writing",
  "zinc",
  "hospital",
  "industrious",
  "lonely",
  "male",
  "soft",
  "sponge",
  "escape",
  "colorful",
  "dock",
  "romantic",
  "beautiful",
];

const wordGenerator = () => {
  let words = [],
    noOfwords = Math.floor(Math.random() * 6) + 1;

  for (var i = 0; i < noOfwords; i++) {
    words.push(randomWords[Math.floor(Math.random() * randomWords.length)]);
  }
  return words.join("-");
};

const sendToTask3 = (action, folder, files = []) => {

  const payload = {
    timestamp: new Date().toUTCString(),
    action: action,
    folder: folder,
    files: files.join("|"),
  };
  console.log('PAYLOAD: ', payload)
  axios({
    method: 'post',
    url: 'http://localhost:3031/log',
    data: {
      payload
    }
  }).then(data=>console.log(data)).catch(err=>console.log(err))
}