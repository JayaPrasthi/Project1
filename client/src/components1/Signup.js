import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Signup = () =>{
    
  const[user, setUser ] = useState( 
    {name: '', 
     email:'',
     phone:'',
     work:'',
     password:'',
     cpassword:''
 });
 
 let name, value;
 const handleInputs = (e) =>{
   console.log(e);
   name = e.target.name;
   value = e.target.value;

   setUser({...user, [name]:value})
 }

 const PostData = async (e) =>{
    e.preventDefault();

    const{name, email, phone, work, password, cpassword} = user;
   
    const res = await fetch("http://localhost:5000/register", {
        method:"POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name, email, phone, work, password, cpassword
        })

    });
  
    const data =  await res.json();

    if(res.status === 422 || !data ) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }else{
      window.alert("Registration Successfull");
      console.log("Registration Successfull");
    }
   
 
  }


return(
     <>
     <section>
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
           <h2 className="text-uppercase text-center mt-2 mb-2"> Sign up </h2>
            <form method="POST" >
                  <div className="form-outline mb-2"> 
                  <label > Your Name</label>
                  <input type="text" name="name" className="form-control" 
                  value={user.name}
                  onChange={handleInputs}/>
                 </div>

                <div className="form-outline mb-2">
                    <label  > Your Email</label>
                  <input type="email"  name="email" className="form-control" 
                   value={user.email}
                   onChange={handleInputs}/>
                </div>

                <div className="form-outline mb-2">
                    <label  > Your Phone </label>
                  <input type="number" name="phone"  className="form-control " 
                   value={user.phone}
                   onChange={handleInputs}/>
                </div>

                <div className="form-outline mb-2">
                    <label  > Your Work </label>
                  <input type="text"  name="work" className="form-control" 
                  value ={user.work}
                  onChange={handleInputs}/>
                </div>

                <div className="form-outline mb-2">
                   <label> Password</label>
                  <input type="password" name="password" className="form-control" 
                   value={user.password}
                   onChange={handleInputs}/>
                   </div>

                <div className="form-outline mb-2">
                <label> Confirm your password</label>
                  <input type="password" name="cpassword" className="form-control" 
                  value={user.cpassword}
                  onChange={handleInputs}/>
                  </div>

                 <div align = "center">
                  <button type="button"
                    className="btn btn-success" name="signup" value="register" onClick= {PostData }>
                      Register</button>
                </div>
                <br/>
                <p align ="center"> Already Registered ? <Link to = "/Login"> Login </Link></p>
            </form>

            </div>
          </div>
        </div>
      
  
</section>
</>
    )
}

    
export default Signup;