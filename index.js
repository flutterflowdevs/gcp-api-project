const express = require("express");
const axios = require('axios');
const users = require("./MOCK_DATA.json");



const app = express();
const PORT = process.env.PORT || 8084;

//Routes
app.get("/users",(req,res)=> {
    return res.json(users);
});

app.get("/open_ai",(req,res)=>{

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'Cookie': '__cf_bm=MQ8uJtnmj2bCMcVC4OHNIX9A0EZd0sw7doz4npnljrA-1703148772-1-AVFqn7PVSURSt1AdMs/8l+R94xWoRFWJjL1rKJDp3PxbnnzaFkvjwLe8UVdUrCF3ybQGmkLqCHSJIEZCF9kDj5o=; _cfuvid=yQlrYbAWzi4tBSW9LSuOW8rF7j03xyuskj0lLC2PRcM-1703148772251-0-604800000'
      };
      
      const data = {
        model: 'davinci-002',
        prompt: 'best nocode ai tools',
        temperature: 0.5,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ['You:']
      };
      
      axios.post('https://api.openai.com/v1/completions', data, { headers })
        .then(response => {
          //console.log('Response:', response.data);
          return res.json(response.data);
        })
        .catch(error => {
          console.error('Error:', error.response.data);
          return res.json({"status":"Error while calling Open AI"});
        });
});

app.get("/prompt/:msg",(req,res)=>{

  const message=req.params.msg;
  console.log(`Received Message ${message}`);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'Cookie': '__cf_bm=MQ8uJtnmj2bCMcVC4OHNIX9A0EZd0sw7doz4npnljrA-1703148772-1-AVFqn7PVSURSt1AdMs/8l+R94xWoRFWJjL1rKJDp3PxbnnzaFkvjwLe8UVdUrCF3ybQGmkLqCHSJIEZCF9kDj5o=; _cfuvid=yQlrYbAWzi4tBSW9LSuOW8rF7j03xyuskj0lLC2PRcM-1703148772251-0-604800000'
      };
      
      const data = {
        model: 'davinci-002',
        prompt: message,
        temperature: 0.5,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ['You:']
      };
      
      axios.post('https://api.openai.com/v1/completions', data, { headers })
        .then(response => {
          //console.log('Response:', response.data);
          return res.json(response.data);
        })
        .catch(error => {
          console.error('Error:', error.response.data);
          return res.json({"status":"Error while calling Open AI"});
        });
});

app.listen(PORT,() => console.log(`Server is started at ${PORT}`));
