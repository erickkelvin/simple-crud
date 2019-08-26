import { Field, Button } from 'components';
import './Form.styl';

export default class Form {

  constructor(store, id) {
    this.store = store;
    if (id) {
      this.userData = this.store.getUser(id);
      if (this.userData) {
        this.id = id;
      }
    }

    this.fields = [
      new Field({
        name: 'name',
        type: 'text',
        label: 'Nome completo (sem abreviações)',
        validate: (value) => value.length < 3 ? 'O campo deve conter 3 caracteres ou mais' : ''
      }),
      new Field({
        name: 'email',
        type: 'email',
        label: 'E-mail',
        validate: (value) => !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? 'O campo deve conter um e-mail válido' : ''
      }),
      new Field({
        name: 'cpf',
        type: 'text',
        label: 'CPF',
        maxLength: 14,
        validate: (value) => value.length < 14 ? 'O campo deve conter um CPF válido' : ''
      }),
      new Field({
        name: 'phone',
        type: 'phone',
        label: 'Telefone',
        maxLength: 15,
        validate: (value) => value.length < 15 ? 'O campo deve conter um telefone válido' : ''
      })
    ];
  
    this.saveButton = new Button({
      name: 'save',
      label: this.id ? 'Atualizar' : 'Cadastrar',
      onClick: (e) => setTimeout(() => this.saveForm(e), 1000) // setTimeout only necessary to allow user to see the loading spinner
    });

    this.listButton = new Button({
      name: 'list',
      label: 'Ver todos',
      onClick: () => window.location.href = '#/'
    });
  }

  validate() {
    let isValid = true;
    
    this.fields.forEach((field) => {
      isValid = field.isValid && isValid;
    });

    const form = document.getElementById('userForm');
    if (form) {
      isValid ? form.classList.add('ready') : form.classList.remove('ready');
    }
    
    return isValid;
  }

  setValues(values) {
    this.fields.forEach((field) => {
      field.input.value = values[field.name];
      field.isValid = true;
    });
    this.validate();
  }

  getValues() {
    let values = {};
    this.fields.forEach((field) => {
      values[field.name] = field.input.value;
    });
    return values;
  }

  saveForm(e) {
    e.preventDefault();
    if (this.id) {
      this.store.updateUser(this.id, this.getValues());
    } else {
      this.store.createUser(this.getValues());
    }
    window.location.href = '#/';
  }
  
  render() {
    return `
      <div id='formContainer' class= 'pageContainer'>
        <h3>${this.id ? 'Atualizar usuário' : 'Cadastrar usuário'}</h3>
        ${ this.listButton.render() }
        <form id='userForm'>
          ${ this.fields.map(field => field.render()).join('') }
          ${ this.saveButton.render() }
        </form>
      </div>
    `;
  }

  postRender() {
    this.fields.forEach(field => field.postRender(this));
    this.saveButton.postRender();
    this.listButton.postRender();

    if (this.userData) {
      this.setValues(this.userData);
    }
  }
  
}