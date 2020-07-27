import React, { Component} from 'react';
import './App.css';
import './greetingData.json'

class App extends Component{

  constructor(props){
    super(props)
    this.state={
      btnFlag:false
    }
    this.state={
      cnclbtnFlag:false
    }
    this.state={
      editFlag:false
    }
    this.state={
      data:[],
      id:0,
      firstname:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeContent=this.changeContent.bind(this);
    console.log(this.state)
  }

  addGreeting=e=>{
    this.setState({
      btnFlag:true
    })
  }

  cancelButton=e=>{
    this.setState({
      cnclbtnFlag:true
    })
  }

  editButton=e=>{
    this.setState({
      editFlag:true
    })
  }


handleChange({target}) {
this.setState({ [target.name]: target.value });
}

handleSubmit(e) {
  e.preventDefault();
  if (this.state.firstname.length === 0) {
  return;
}
  const newGreetingData = {
  firstname: "hello "+this.state.firstname,
  id: this.state.data.length+1
  };

  console.log(newGreetingData)
  this.setState(state => ({
  data: state.data.concat(newGreetingData),
  firstname: ''
}));
}

deleteData(dataID){
  const {data}=this.state;
  this.setState({
    data:data.filter(data=>data.id!==dataID)
  })    
}

changeContent= (id,event) => {
  if (this.state.firstname.length === 0) {
    return;
  }
  const index = this.state.data.findIndex((data)=> {
      return (data.id === id);
  })

  const user = Object.assign({}, this.state.data[index]);
  user.firstname = event.target.value;

  const data = Object.assign([], this.state.data);
  data[index] = user;

  this.setState({data:data});
}
  render(){
    const addbtnFlag=this.state.btnFlag
    if(addbtnFlag){
      document.getElementById('adduser').style.display='block';
      this.setState({
        btnFlag:false
      })
    }

    const cancelButtonFlag=this.state.cnclbtnFlag
    if(cancelButtonFlag){
      document.getElementById('adduser').style.display='none';
      this.setState({
        cnclbtnFlag:false
      })
    }

    const editButtonFlags=this.state.editFlag
    if(editButtonFlags){
      document.getElementById('editbox').style.display='block';
      this.setState({
        editFlag:false
      })
    }

    return (
      <div className="App">
        <header className="App-header">
          <div id="container">
          <section id="login-container">
            <button onClick={this.addGreeting}>ADD GREETING</button> 
          </section>
            <div id="adduser" class="modal">
              <form class="modal-content">
                <div class="container1">
                      <input type="text" placeholder="Enter Firstname" name="firstname" value={this.state.firstname} onChange={this.handleChange} required></input> nbsp
                      <button type="submit" onClick={this.handleSubmit}>SAVE</button> nbsp<button type="button" onClick={this.cancelButton}>CANCEL</button> 
                </div>
              </form> 
            </div>
            <form class="table_Container animate">
            <table>
              <tr>
                <th>ID</th>
                <th>Content</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {
              this.state.data.map((data =>{
                return <tr key={data.id}>
                <div id="editbox" class="modal">
                  <form class="modal-content animate">
                    <div class="container2">
                      <input type="text" placeholder="Edit Content" name="updateContent" onChange={this.handleChange} required></input>
                      <button type="submit" onClick={()=>this.changeContent(data.id)}>UPDATE</button>
                    </div>
                  </form>
                </div>
                  <td>
                    {data.id}
                  </td>
				  <td>{data.id}</td>
                  <td>{data.firstname}</td>
                  <td><button type="button" onClick={this.editButton}>Edit</button></td>
                  <td><button onClick={()=>this.deleteData(data.id)}>Delete</button></td>
                </tr>
              }))
            }
            </table>
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
