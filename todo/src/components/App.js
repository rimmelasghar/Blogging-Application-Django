import './App.css';
import React , {useState,useEffect} from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import Contactlst from "./Contactlst";


function App() {
  const LocalStoragekey = "contact";
  const [contacts,setContacts] = useState([]);
  const addContactHandler = (contact) =>{
    setContacts([...contacts,contact])
  };
  useEffect(()=>{
    const retriveContacts = JSON.parse(localStorage.getItem(LocalStoragekey));
    console.log(retriveContacts);
    // if(retriveContacts) setContacts(retriveContacts);
  });
  useEffect(()=>{
    localStorage.setItem(LocalStoragekey,JSON.stringify(contacts));

  },[contacts]);

  return (
    <div className='ui container'>
      <Header/>
      <AddContact addContactHandler={addContactHandler}/>
      <Contactlst contacts={contacts}/>
    </div>
  );
}

export default App;
