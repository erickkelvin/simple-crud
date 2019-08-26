import { Button } from 'components';
import './ListItem.styl';

export default class ListItem {

  constructor(store, list, { id, name, email, cpf, phone }) {
    this.store = store;
    this.list = list;
    this.id = id;
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.phone = phone;

    this.editButton = new Button({
      name: `edit${this.id}`,
      label: 'Editar',
      onClick: () => window.location.href = `#/edit/${this.id}`
    });

    this.deleteButton = new Button({
      name: `delete${this.id}`,
      label: 'Excluir',
      onClick: () => {
        this.store.deleteUser(this.id);
        this.list.getUsers();
      }
    });
  }

  render() {
    return `
      <div id='user${this.id}' class='listItem'>
        <div class='listItemContent'>
          <div>
            <strong>Nome:</strong> ${this.name}
          </div>
          <div>
            <strong>E-mail:</strong> ${this.email}
          </div>
          <div>
            <strong>CPF:</strong> ${this.cpf}
          </div>
          <div>
            <strong>Telefone:</strong> ${this.phone}
          </div>
        </div>
        <div class='listItemActions'>
          ${ this.editButton.render() }
          ${ this.deleteButton.render() }
        </div>
        
      </div>
    `;
  }
  
  postRender() {
    this.editButton.postRender();
    this.deleteButton.postRender();
  }

}