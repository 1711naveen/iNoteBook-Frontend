import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const Blog = () => {
    // const [title, setTitle] = useState('Your Blog Title');
    const [content, setContent] = useState('');
    
    const [blogName, setBlogName] = useState("BLOG NAME");
    const [title, settitle] = useState("TITLE HEADING");

    const handleBlogName = () => {

    }
    const handleTitle = () => {

    }

    // const handleTitleChange = (e) => {
    //     setTitle(e.target.value);
    // };

    // const handleContentChange = (value) => {
    //     setContent(value);
    // };

    return (
        <>
            <div className="container">

                <div className="container">
                    <input className="form-control form-control-lg" type="text" name="heading" id="heading" value={blogName} onChange={handleBlogName} />
                </div>

                <div className="container">
                    <div class="row">
                        <div class="col-8 border border-dark border-3">
                            <input type="text" name="title" id="title" value={title} onChange={handleTitle}/>
                            {/* <span>Title description, Dec 7, 2017</span> */}
                        </div>
                        <div class="col-4 border border-dark border-2">col-4</div>
                    </div>
                </div>




                <div className="">
                    {/* <input
                        type="text"
                        placeholder="Blog Title"
                        value={title}
                        onChange={handleTitleChange}
                    />

                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Write your blog content here..."
                    /> */}
                </div>
            </div>

        </>
    )
}


export default Blog
