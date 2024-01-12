import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUpload from './ImageUpload';
import Card from './Card';



const Blog = () => {
    // const [title, setTitle] = useState('Your Blog Title');
    const [content, setContent] = useState('');

    const [blogName, setBlogName] = useState("BLOG NAME");
    const [title, settitle] = useState("TITLE HEADING");

    const handleBlogName = () => {

    }
    const handleTitle = () => {

    }


    return (
        <>
            <div className="container" >

                <div className="container">
                    <input className="form-control form-control-lg" type="text" name="heading" id="heading" value={blogName} onChange={handleBlogName} />
                </div>

                <div className="container my-5">
                    <div className="row">
                        <div className="col-9 p-3">
                            <div className="container">
                                <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                    <div className="container mx-auto">
                                        <input className='form-control form-control-lg' type="text" name="title" id="title" value={title} onChange={handleTitle} />
                                    </div>
                                </div>
                                <div className="container">
                                    <ImageUpload />
                                </div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ad voluptate velit iste, ea officia reiciendis sunt. Nulla eaque cum laborum, harum quam sed. Ducimus vel accusamus assumenda laborum, suscipit dolorum a, et impedit saepe sunt corrupti earum. Ut, quaerat. Similique culpa corporis nisi dolorem dolor explicabo magni vitae atque, dolore veritatis eius asperiores aspernatur fugiat eum ipsum vero itaque.
                                <span>Title description, Dec 7, 2017</span>
                            </div>
                            <br />
                            <br />
                            <div className="container">
                                <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                    <div className="container mx-auto">
                                        <input className='form-control form-control-lg' type="text" name="title" id="title" value={title} onChange={handleTitle} />
                                    </div>
                                </div>
                                <div className="container">
                                    <ImageUpload />
                                </div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ad voluptate velit iste, ea officia reiciendis sunt. Nulla eaque cum laborum, harum quam sed. Ducimus vel accusamus assumenda laborum, suscipit dolorum a, et impedit saepe sunt corrupti earum. Ut, quaerat. Similique culpa corporis nisi dolorem dolor explicabo magni vitae atque, dolore veritatis eius asperiores aspernatur fugiat eum ipsum vero itaque.
                                <span>Title description, Dec 7, 2017</span>
                            </div>

                        </div>
                        <div className="col-3  p-3">
                            <div className="container">
                                <h4>About Me</h4>
                            </div>
                            <div className="container">
                                <ImageUpload />
                            </div>

                            <div className="container p-3">
                                <h4>Popular Post</h4>
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}


export default Blog
