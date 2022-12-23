import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {

  const [searchField, setSearchField] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => setUsers(users));
  }, [])

  useEffect(() => {
    const newFilteredUsers = users.filter(
      (user) => {
        return user.name.toLowerCase().includes(searchField);
      }
    );

    setFilteredUsers(newFilteredUsers);
  }, [users, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
       <h1 className="app-title">User Buzzer</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder='search users' className='users-search-box'/>
        <CardList users={filteredUsers} />
    </div>
  )
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       users: [],
//       searchField: ''
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) => {
//         this.setState(() => {
//           return { users };
//         });
//       });
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();
    
//     this.setState(() => {
//       return { searchField };
//     });
//   }

//   render() {
//     const { users, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredUsers = users.filter(
//       (user) => {
//         return user.name.toLowerCase().includes(searchField);
//       }
//     );

//     return (
//       <div className="App">
//       <h1 className="app-title">User Buzzer</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder='search users' className='users-search-box'/>
//         <CardList users={filteredUsers} />
//       </div>
//     );
//   }
// }

export default App;
