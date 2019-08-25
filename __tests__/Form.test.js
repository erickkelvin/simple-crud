import { Form } from 'components';
import { Users } from 'store';

describe('Form', () => {
  it('render form new', () => {
    const form = new Form(new Users());
    expect(form.render()).toMatchSnapshot();
  });

  it('render form edit', () => {
    const userData = {
      "name": "My name 1",
      "cpf": "040.807.572-47",
      "phone": "(11) 98765-4321",
      "email": "myemail1@test.com.br"
    };

    const store = new Users();
    store.createUser(userData);
    
    const form = new Form(store, Object.keys(store.getUsers())[0]);
    expect(form.render()).toMatchSnapshot();
  });

  it('postRender', () => {
    const form = new Form();
    form.render();

    form.saveButton.postRender = jest.fn();
    form.listButton.postRender = jest.fn();
    form.postRender();
    
    expect(form.saveButton.postRender).toHaveBeenCalledTimes(1);
    expect(form.listButton.postRender).toHaveBeenCalledTimes(1);
  });

  it('set and get values', () => {
    const userData = {
      "name": "My name 1",
      "cpf": "040.807.572-47",
      "phone": "(11) 98765-4321",
      "email": "myemail1@test.com.br"
    };

    const form = new Form();
    form.render();
    form.fields.forEach((field) => field.input = {});

    form.setValues(userData);
    expect(form.getValues()).toEqual(userData);
  });

  it('saveForm create', () => {
    const form = new Form(new Users());
    form.getValues = jest.fn();
    form.store.createUser = jest.fn();
    form.saveForm({ preventDefault: jest.fn() });
    expect(form.store.createUser).toHaveBeenCalledTimes(1);
  });

  it('saveForm update', () => {
    const form = new Form(new Users());
    form.id = 'id123';
    form.getValues = jest.fn();
    form.store.updateUser = jest.fn();
    form.saveForm({ preventDefault: jest.fn() });
    expect(form.store.updateUser).toHaveBeenCalledTimes(1);
  });

  it('validate true', () => {
    const form = new Form();
    form.fields.forEach((field) => field.isValid = true);
    document.body.innerHTML = form.render();
    const formDom = document.getElementById('userForm');
    expect(form.validate()).toBeTruthy();
    expect(formDom.classList.contains('ready')).toBeTruthy();
  });

  it('validate false', () => {
    const form = new Form();
    form.fields.forEach((field) => field.isValid = true);
    form.fields[1].isValid = false;
    document.body.innerHTML = form.render();
    const formDom = document.getElementById('userForm');
    expect(form.validate()).toBeFalsy();
    expect(formDom.classList.contains('ready')).toBeFalsy();
  });
});