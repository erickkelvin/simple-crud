import { List } from 'components';
import { Users } from 'store';

const users = [
  {
    "name": "My name 1",
    "cpf": "04080757247",
    "phone": "11987654321",
    "email": "myemail1@test.com.br"
  },
  {
    "name": "My name 2",
    "cpf": "77797584192",
    "phone": "11987654321",
    "email": "myemail2@test.com.br"
  },
  {
    "name": "My name 3",
    "cpf": "45486737688",
    "phone": "11987654321",
    "email": "myemail3@test.com.br"
  }
];

describe('List', () => {

  it('getUsers success with users', () => {
    const list = new List(new Users());
    document.body.innerHTML = list.render();
    const usersList = document.getElementById('usersList');
    list.store.fetchInitialState = jest.fn((successCallback) => successCallback && successCallback(users));
    list.getUsers();

    expect(list.store.fetchInitialState).toHaveBeenCalledTimes(1);
    expect(usersList).toMatchSnapshot();
  });

  it('getUsers success with no users', () => {
    const list = new List(new Users());
    document.body.innerHTML = list.render();
    const usersList = document.getElementById('usersList');
    list.store.fetchInitialState = jest.fn((successCallback) => successCallback && successCallback([]));
    list.getUsers();

    expect(list.store.fetchInitialState).toHaveBeenCalledTimes(1);
    expect(usersList).toMatchSnapshot();
  });

  it('getUsers error', () => {
    const list = new List(new Users());
    document.body.innerHTML = list.render();
    const usersList = document.getElementById('usersList');
    list.store.fetchInitialState = jest.fn((successCallback, errorCallback) => errorCallback && errorCallback());
    list.getUsers();

    expect(list.store.fetchInitialState).toHaveBeenCalledTimes(1);
    expect(usersList).toMatchSnapshot();
  });

  it('render', () => {
    const list = new List(new Users());
    expect(list.render()).toMatchSnapshot();
  });

  it('postRender', () => {
    const list = new List(new Users());
    list.newButton.postRender = jest.fn();
    list.getUsers = jest.fn();
    list.postRender();
    expect(list.newButton.postRender).toHaveBeenCalledTimes(1);
    expect(list.getUsers).toHaveBeenCalledTimes(1);
  });
});