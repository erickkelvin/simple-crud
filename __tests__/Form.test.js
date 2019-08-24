import { Form } from 'components';
import { Users } from '../src/store';

describe('Form test', () => {
  it('render form new', () => {
    const form = new Form(new Users());
    expect(form.render()).toMatchSnapshot();
  });

  it('render form edit', () => {
    const store = new Users();
    const userData = {
      "name": "My name 1",
      "cpf": "040.807.572-47",
      "phone": "(11) 98765-4321",
      "email": "myemail1@test.com.br"
    };
    store.createUser(userData);
    
    const form = new Form(store, Object.keys(store.getUsers())[0]);
    expect(form.render()).toMatchSnapshot();
  });
})