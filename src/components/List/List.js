import ListItem from "../ListItem/ListItem.js";
import Button from "../Button/Button.js";
import './List.styl';

export default class List {

  constructor(store) {
    this.store = store;
    this.users = {};
    
    this.newButton = new Button({
      name: 'new',
      label: 'Cadastrar',
      onClick: () => window.location.href = '#/new'
    });
  }

  getUsers() {
    const usersList = document.getElementById('usersList');
    if (usersList) {
      usersList.innerHTML = 'Carregando...';

      const successCallback = (users) => {
        this.listItems = Object.keys(users).map((userId) => new ListItem(this.store, this, users[userId]));
        usersList.innerHTML = `
            ${ this.listItems && this.listItems.length ?
            this.listItems.map((listItem) => listItem.render()).join('') :
            'Não há usuários a exibir.'}
          `;
        this.listItems.forEach((listItem) => listItem.postRender());
      };

      const errorCallback = () => {
        usersList.innerHTML = 'Erro ao carregar o estado inicial da aplicação.';
      };
      
      this.store.fetchInitialState(successCallback, errorCallback);
    }
  }

  render() {
    return `
      <div id='listContainer' class= 'pageContainer'>
        <h3>Usuários</h3>
        ${ this.newButton.render() }
        <div id='usersList'></div>
      </div>
    `;
  }

  postRender() {
    this.newButton.postRender();
    this.getUsers();
  }

}