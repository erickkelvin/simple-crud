import './NotFound.styl';

export default class NotFound {
  render() {
    return `
      <div id='notFoundContainer' class='pageContainer'>
        <h3>Erro 404</h3>
        <div>
          Não foi possível encontrar a página requisitada.
        </div>
      </div>
    `;
  }
}