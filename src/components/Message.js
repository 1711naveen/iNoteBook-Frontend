import React from 'react'
import { useNavigate } from 'react-router-dom';

const Message = (props) => {
    const navigate = useNavigate();
    return (
        <>
            {
                !localStorage.getItem('authToken') ? navigate('/login') :
                    <div className="container">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Enter Recepient Email address:</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Wriet your message Here:</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <button type="button" className="btn btn-primary">Send</button>
                        </div>
                    </div>
            }

        </>

    )
}

export default Message
