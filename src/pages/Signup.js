import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col} from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import{useSignupUserMutation} from "../services/appApi"
import bot from '../assets/bot.jpeg'
import './signup.css'
import { useState } from 'react';
function Signup() {
  const navigate = useNavigate();
    const[name,setname]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const[image,setimage]=useState(null);
    const[uploadingImg,setuploadingImg]=useState(false);
    const[imagePreview,setimagePreview]=useState(null);
    const[signupUser,{isLoading, error}]=useSignupUserMutation();
    function validateImg(e){
const file=e.target.files[0];

if(file.size >= 1048576){
    return alert('Max File Size Is 1 mb')
}else{
    setimage(file);
    setimagePreview(URL.createObjectURL(file));
}
    }
    async function handleSignup(e){
        e.preventDefault();
        if(!image)
        return alert('Please upload yout profile picture')
        const url=await uploadImage(image);
        console.log(url);
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
          if (data) {
              console.log(data);
              navigate("/chat");
          }
      });
    }
    async function uploadImage(){
        const data=new FormData();
        data.append('file',image);
        data.append('upload_preset','vepmnppj');
        try{
            setuploadingImg(true);
            let res=await fetch('https://api.cloudinary.com/v1_1/dquuxq2ck/image/upload',{
                method:'post',
                body:data
            })
            const urlData=await res.json();
            setuploadingImg(false);
            return urlData.url;
        }catch(error){
            setuploadingImg(false);
            console.log(error)
        }
    }
  return (
    <Container>
        <Row>
            <Col md={6} className="d-flex align-items-center justify-content-center flex-direction-column">
        <Form style={{width:'80%',maxWidth:500}} onSubmit={handleSignup}>
            <h1 className='text-center'>Create Account</h1>
            <div className='signup-prifile-pic__container'>
                <img src={imagePreview || bot} className='signup-profile-pic'/>
                <label htmlFor="image-upload" className='image-upload-label'>
                    <i className='fas fa-plus-circle add-picture-icon'/>
                </label>
<input type="file" id="image-upload" hidden accept='image/png, image/jpeg' onChange={validateImg}/>
            </div>
            {error && (<p className='alert alert-danger'>{error.data}</p>)}
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Your Name" value={name} onChange={(e)=>(setname(e.target.value))}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>(setemail(e.target.value))}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>(setpassword(e.target.value))}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        {uploadingImg || isLoading ? "Signing you up..." : "Signup"}
      </Button>
      <div className='py-4'>
        <p className='text-center'>
            Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </Form>
    </Col>
    <Col md={6} className="signup_bg"></Col>
    </Row>
    </Container>
  )
}

export default Signup