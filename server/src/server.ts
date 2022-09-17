import express from "express";

const app = express();

app.get('/ads', (request, response)=>{
    return response.json([
        {id: 1, name: 'algum'},
        {id: 2, name: 'algum'},
        {id: 3, name: 'algum'},
        {id: 3, name: 'algum'},
        {id: 3, name: 'algum'}
    ])
})

app.listen(3000 );