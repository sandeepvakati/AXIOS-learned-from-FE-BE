import React from "react";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../Utils/AxiosInstance";
function Home(){
    const [data,setData] = useState([]);
    async function fetchData(){
    let response = await axiosInstance.get("/post");
    setData(response.data);   
    }

    async function deleteData(id)
    {
        let response = await axiosInstance.delete(`/post/${id}`)
        setData(response.data);   
    }

    async function updateData(id) 
    {
        let response = await axiosInstance.put(`/post/${id}`,{
            title:'Updated Title',
            body:'Updated Body'
        });
        console.log(response.data);
        setData(data.map(post => post.id === id ? { ...post,title:'Updated Title',body:'Updated Body'}:post));

    }

    async function NewPost()
    {
        let response = await axiosInstance.post('/newPost',{
            title:'axios title',
            body:'axios body',
            id:"101",
            userId: "34"
        })
        console.log(response.data);
        setData([...data,{
            title:'axios title',
            body:'axios body',
            id:"101",
            userId: "34"
        }]);
        
        
    }
    return(
        <>
        <h1>Home Page</h1>
        <p>Welcome to the Home Page!</p>
        <div style={{backgroundColor:"black",color:"white"}}>
            title = "axios demo title"
            body="axios demo body"
            id="101"
        </div>
        <button onClick={fetchData}>Fetch Data</button>
        <button onClick={NewPost}>Create New Post</button>
        {
            data.map((post)=>{
                return (
                    <div key={post.id} style={{border:"1px solid black", margin:"10px", padding:"10px",width:"300px"}}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <p>{post.id}</p>
                        <button style={{ background:'red',color:'white'}} onClick={()=>{deleteData(post.id)}}>Delete</button>
                        <button style={{ background:'blue',color:'white'}} onClick={()=>{updateData(post.id)}}>Update</button>
                    </div>
                );


            })
        }
        </>
    );
}
export default Home;