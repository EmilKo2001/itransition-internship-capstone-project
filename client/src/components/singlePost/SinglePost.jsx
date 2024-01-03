import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./singlePost.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {
  //geting the path of the url 
  const location = useLocation();
  //getting the id from the url
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({})
  const uploadPic = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  //constants for update
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [update, setUpdate] = useState(false)

  //fetching the post
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${path}`)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [path])

  //deleting the post
  const handleDel = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        // delete api must pass data as a data object
        data: { username: user.username },
      })
      window.location.replace("/")
    } catch (err) {
      console.log(err)
    }
  }

  //updating the post
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdate(false)
    } catch (err) { }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {
          post.photo && (
            <img
              className="singlePostImg"
              src={uploadPic + post.photo}
              alt=""
            />
          )
        }
        {
          update ? (<input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)}
          />) : (

            <h1 className="singlePostTitle">
              {title}
              {/* if user is true then it looks for username */}
              {post.username == user?.username && (
                <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit" onClick={() => setUpdate(true)}></i>
                  <i className="singlePostIcon far fa-trash-alt" onClick={handleDel}></i>
                </div>
              )}
            </h1>
          )
        }
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {update ? (<textarea
          className="singlePostDescInput"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />) : (
          <p className="singlePostDesc">
            {desc}
          </p>
        )}
        {
          update && (
            <button className="singlePostButton" onClick={handleUpdate}>Update</button>
          )
        }
      </div >
    </div >
  );
}
