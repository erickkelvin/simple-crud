import './Button.styl';
import Spinner from '../Spinner/Spinner.js';

export default class Button {

  constructor({ name, label, onClick }) {
    this.name = name;
    this.label = label;
    this.onClick = onClick;
  }

  render() {
    return `
      <button id='${this.name}Button'>${this.label}</button>
    `;
  }

  postRender() {
    const button = document.getElementById(`${this.name}Button`);
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.innerHTML = new Spinner().render();
      e.target.style.pointerEvents = 'none';
      this.onClick(e);
    });
  }
  
}