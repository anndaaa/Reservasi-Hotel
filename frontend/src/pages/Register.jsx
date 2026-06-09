import { useState } from "react";
import api from "../services/api";

function Register(){

const [form,setForm] =
useState({
fullname:"",
email:"",
password:""
});

const handleChange=(e)=>{

setForm({
...form,
[e.target.name]:
e.target.value
});

};

const submit=async(e)=>{

e.preventDefault();

try{

await api.post(
"/auth/register",
{
...form,
role:"guest"
}
);

alert("Register berhasil");

window.location="/";

}catch{

alert("Register gagal");

}

};

return(

<div className="container">

<div className="row justify-content-center mt-5">

<div className="col-md-5">

<div className="card shadow">

<div className="card-body">

<h2 className="text-center">
Register
</h2>

<form onSubmit={submit}>

<input
className="form-control mb-3"
name="fullname"
placeholder="Nama Lengkap"
onChange={handleChange}
/>

<input
className="form-control mb-3"
name="email"
placeholder="Email"
onChange={handleChange}
/>

<input
className="form-control mb-3"
name="password"
type="password"
placeholder="Password"
onChange={handleChange}
/>

<button
className="btn btn-success w-100"
>

Daftar

</button>

</form>

</div>

</div>

</div>

</div>

</div>

);

}

export default Register;