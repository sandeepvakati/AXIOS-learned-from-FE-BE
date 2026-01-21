const express=require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');
const app=express();
const port=3000;
app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let allPosts = []

//GET post
app.get('/post',async (req,res)=>{
    if(allPosts.length > 0){
        return res.json(allPosts);
    }
    let response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    allPosts=response.data;
    res.json(allPosts)
})

//Delete post

app.delete('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    allPosts = allPosts.filter(post => post.id !== postId);
    res.json(allPosts);
});

app.post('/newPost',(req,res)=>{
    console.log("Creating New Post: ",req.body);
    const newPost = {
        userId : req.body.userId,
        id: allPosts.length + 1,
        title: req.body.title,
        body: req.body.body
    };
    allPosts.push(newPost);
    res.status(201).json(newPost);
})

app.put('/post/:id',(req,res) => {
    const postId = parseInt(req.params.id);
    const{ title,body } = req.body
    let post = allPosts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).json({ error: 'Post not found'});
    }

    post.title = title;
    post.body = body;
    res.json(post);
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);    
})