export default class Users {
  
  constructor() {
    this.users = {};
  }

  fetchInitialState(successCallback, errorCallback) {
    if (localStorage.getItem('users') === null) {
      fetch('https://private-21e8de-rafaellucio.apiary-mock.com/users')
      .then((response) => {
        if (response.ok) {
          response.json().then((users) => {
            users.forEach((userData) => {
              this.createUser(userData);
            });
            if (successCallback) {
              successCallback(this.users);
            }
          });
        } else {
          if (errorCallback) {
            errorCallback();
          }
          console.log('Could not fetch initial state.');
        }
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback();
        }
        console.log('Could not fetch initial state: ' + error.message);
      });
    } else {
      if (successCallback) {
        successCallback(this.getUsers());
      }
    }
  }

  getUsers() {
    this.users = JSON.parse(localStorage.getItem('users')) || this.users;
    return this.users;
  }

  setUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUser(userId) {
    this.getUsers();
    return this.users[userId];
  }

  createUser(userData) {
    this.getUsers();
    userData.id = Math.random().toString(36).substr(2, 9);
    userData.cpf = userData.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,1})/,"$1.$2.$3-$4");
    userData.phone = userData.phone.replace(/^(\d{2})(\d{5})(\d{0,4}).*/,"($1) $2-$3");
    this.users[userData.id] = userData;
    this.setUsers();
  }

  updateUser(userId, userData) {
    this.getUsers();
    userData.id = userId;
    this.users[userId] = userData;
    this.setUsers();
  }

  deleteUser(userId) {
    this.getUsers();
    delete this.users[userId];
    this.setUsers();
  }
}