import { Users } from 'store';

describe('Users', () => {
  const store = new Users();

  const initialUserData = {
    name: 'name',
    email: 'email@test.com',
    cpf: '123.456.789-12',
    phone: '(12) 34567-8901'
  };

  const updatedUserData = {
    name: 'test',
    email: 'anotherEmail@test.com',
    cpf: '222.333.444-55',
    phone: '(12) 14567-8901'
  };

  const mockSuccessResponse = [
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

  it('clear users and local storage', () => {
    store.clear();
    expect(localStorage.getItem('users')).toBeNull();
    expect(store.getUsers()).toEqual({});
  });

  it('fetch success', (done) => {
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    store.fetchInitialState();
                            
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://private-21e8de-rafaellucio.apiary-mock.com/users');

    process.nextTick(() => {
      expect(Object.keys(store.users)).toHaveLength(3);
      store.clear();
      global.fetch.mockClear();
      delete global.fetch;
      done();
    });
  });

  it('fetch fail', (done) => {
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      ok: false,
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    store.fetchInitialState();
                            
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://private-21e8de-rafaellucio.apiary-mock.com/users');

    process.nextTick(() => {
      expect(Object.keys(store.users)).toHaveLength(0);
      store.clear();
      global.fetch.mockClear();
      delete global.fetch;
      done();
    });
  });

  it('do not fetch', (done) => {
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      ok: false,
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    store.users = {};
    store.setUsers({});
    store.fetchInitialState();
                            
    expect(global.fetch).toHaveBeenCalledTimes(0);

    process.nextTick(() => {
      expect(Object.keys(store.users)).toHaveLength(0);
      store.clear();
      global.fetch.mockClear();
      delete global.fetch;
      done();
    });
  });

  it('createUser', () => {
    const userId = store.createUser(initialUserData);
    expect(store.getUser(userId)).toEqual(initialUserData);
  });

  it('getUsers', () => {
    const userId = Object.keys(store.users)[0];
    expect(store.getUsers()).toEqual({ [userId]: initialUserData });
  });

  it('updateUser', () => {
    const userId = Object.keys(store.users)[0];
    store.updateUser(userId, updatedUserData);
    expect(store.getUser(userId)).toEqual(updatedUserData);
  });

  it('deleteUser', () => {
    const userId = Object.keys(store.users)[0];
    store.deleteUser(userId);
    expect(store.getUser(userId)).toBeUndefined();
  });
});