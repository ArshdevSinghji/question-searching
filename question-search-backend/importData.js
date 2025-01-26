const mongoose = require('mongoose');
const fs = require('fs');

const Anagram=require('./models/anagram');
const ContentOnly=require('./models/content_only');
const MCQ=require('./models/mcq');
const ReadAlong=require('./models/read_along');

require('./config/database')();

const clearData=async()=>{
    try{
        await Anagram.deleteMany({});
        await ContentOnly.deleteMany({});
        await MCQ.deleteMany({});
        await ReadAlong.deleteMany({});
        console.log('Data cleared successfully');
        process.exit(0);
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
      const jsonData = fs.readFileSync("./speakx_questions.json", "utf-8");
      const questions = JSON.parse(jsonData);
  
      for (const item of questions) {
        delete item._id;

        if (item.siblingId && item.siblingId.$oid) {
          item.siblingId = new mongoose.Types.ObjectId(item.siblingId.$oid);
        }
  
        switch (item.type) {
          case "ANAGRAM":
            await Anagram.create(item);
            break;
          case "READ_ALONG":
            await ReadAlong.create(item);
            break;
          case "CONTENT_ONLY":
            await ContentOnly.create(item);
            break;
          case "MCQ":
            await MCQ.create(item);
            break;
          default:
            console.log(`Invalid question type: ${item.type}`);
            break;
        }
      }
      console.log("Data imported successfully");
      process.exit();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };

importData();
// clearData();