import React, { useState, useEffect } from "react";
import axios from 'axios'
import Container from "./Container.js";
import Header from "./Header.js";
import SearchForm from "./SearchForm.js";
import Results from "./Results.js";

function UserContainer() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  // const [filteredList, setFilteredList] = useState(result)

  useEffect(function () {
    console.log("using use effect")
    searchUsers();
  }, [])


  async function searchUsers() {
    const users = await axios.get("https://randomuser.me/api/?results=100&nat=us")
      
    console.log(`[searchUsers]`, users.data.results)
    setResult(users.data.results)
    // setFilteredList(users.data.results)
  };

  function handleInputChange(event) {
    let { name, value } = event.target;
    if (name === 'search') 
  
    setSearch(value)
    // setFilteredList(result.filter(item=>item.indexOf(event.target.value)>-1))
    // const filtered = value.filter((user) => (user.name.first.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))
    // console.log("Filter", filtered)
    console.log(`[handleInputChange]`, value)
  }

  function handleFormSubmit(event) {
    console.log(`[handleFormSubmit] called`)
    event.preventDefault();

    setSearch(event.target.value)
    searchUsers(search) 
       
    console.log(`[handleFormSubmit] checking inside searchUsers`, search)
    // setFilteredList(result.filter(item=>item.indexOf(event.target.value)>-1))
    // setResult( result.filter( name=>name.indexOf(search).toLowerCase()>-1))
  }

  function sortUsersFirstName() {
    const usersFirst = [...result];
    const updateSort = usersFirst.sort((a, b) => {
      const nameA = a.name.first;
      const nameB = b.name.first;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    setResult(updateSort);
  }

  function sortUsersLastName() {
    const usersLast = [...result];
    const updateSort = usersLast.sort((a, b) => {
      const nameA = a.name.last;
      const nameB = b.name.last;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    setResult(updateSort);
  }
  const userData = result.map(item => <Results
    first={item.name.first}
    last={item.name.last}
    image={item.picture.thumbnail}
    email={item.email}
    age={item.dob.age}
    state={item.location.state}
    city={item.location.city} />)


  return (
    <div>
      <Container>
        <Header />
        <SearchForm
          value={search}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th onClick={sortUsersFirstName}>First Name</th>
              <th onClick={sortUsersLastName}>Last Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          {userData}
        </table>

      </Container>

    </div>

  );
}

export default UserContainer;