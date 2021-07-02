import React, { useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props){

    const[name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const redirect=props.location.search?
    props.location.search.split('=')[1]
    :'/';
    const userRegister=useSelector((state)=>state.userRegister);   
    const {userInfo,loading,error}=userRegister;
    
    const dispatch = useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!==confirmPassword)
        {
            alert("passwords do not match")
        }
        else{
            dispatch(register(name,email,password));
        }
       
    }
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
        
    }, [props.history, userInfo,redirect])

    return(
        <div>
            <form className="form" onSubmit={submitHandler} >
            <div>
                <h1>
                    Create account
                </h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger" >{error}</MessageBox>}
            <div>
                <label htmlFor="name" >Name</label>
                <input type="name" id="name" placeholder="Enter name" required
                onChange={e=>setName(e.target.value)} >
                </input>
            </div>
            <div>
                <label htmlFor="email" >Email Address</label>
                <input type="email" id="email" placeholder="Enter email" required
                onChange={e=>setEmail(e.target.value)} >
                </input>
            </div>
            <div>
                <label htmlFor="password" >Password</label>
                <input type="password" id="password" placeholder="Enter password" required
                onChange={e=>setPassword(e.target.value)} >
                </input>
            </div>
            <div>
                <label htmlFor="confirmPassword" >Password</label>
                <input type="password" id="confirmPassword" placeholder="Enter confirm password" required
                onChange={e=>setConfirmPassword(e.target.value)} >
                </input>
            </div>
            <div>
                <label/>
                <button className="primary" type="submit">
                    Register
                </button>

            </div>
            <div>
                <label/>
            <div>
            Already HAve an account
            <Link to={`/signin?redirect=${redirect}`} >Sign In</Link>
            </div>
            </div>
            </form>
        </div>
    )
}