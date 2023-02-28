import React from "react";
var data1 = "";
async function loginUser(credentials) {
    return fetch('http://127.0.0.1:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        },
        body: 'grant_type=&username=admin&password=admin&scope=basic&client_id=&client_secret='
      })
        .then(response => response.json())
        .then(data => {
          // Handle the JSON data returned by the API
          data1 = data;
        })
        .catch(error => {
          // Handle any errors that occur during the request
          console.error(error);
        });
    }

class SignIn extends React.Component {
    state = {
        username:"",
        password:"",
        scope:"basic"
    };
    add = async (e) =>{
        e.preventDefault();
        if(this.state.username==="" || this.state.password===""){
            alert("All fields must be filed");
            return;
        }
        const token = await loginUser(this.state)
        this.props.addTokenHandler(token);
        this.setState({ username:"",password:""});
    }
    render(){
        return (
            <div className="ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={this.add}>
                
                <div className="field">
                <label>Name</label>
                <input type="text" name="username" placeholder="Name" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} />
                </div>
                <div className="field">
                <label>password</label>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} />
                </div>
                <button className="ui button blue">Add</button>
            </form>
            </div>
        );
    };
}

export default SignIn;