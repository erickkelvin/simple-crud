import './Field.styl';

export default class Field {

  constructor({ name, type, label, maxLength, validate }) {
    this.name = name;
    this.type = type;
    this.label = label;
    this.maxLength = maxLength;
    this.validate = validate;
    this.isValid = false;
  }

  doValidation(e, showError) {
    const input = e ? e.target : this.input;
    const fieldError = document.getElementById(`${this.name}Error`);
    const error = this.validate && this.validate(input.value);
    if (error) {
      fieldError && (fieldError.innerHTML = error);
      showError && input.classList.add('error');
      this.isValid = false;
    } else {
      fieldError && (fieldError.innerHTML = '');
      input.classList.remove('error');
      this.isValid = true;
    }
    this.form.validate();
  }

  filterInput(e) {
    const phoneMask = (v) => {
      let r = v.replace(/\D/g,"");
      r = r.replace(/^0/,"");
      if (r.length > 7) {
        r = r.replace(/^(\d{2})(\d{5})(\d{0,4}).*/,"($1) $2-$3")
      } else if (r.length > 2) {
        r = r.replace(/^(\d{2})(\d{0,5})/,"($1) $2");
      } else {
        r = r.replace(/^(\d*)/, "($1");
      }
      return r;
    };

    const cpfMask = (v) => {
      let r = v.replace(/\D/g,"");
      if (r.length > 9) {
        r = r.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,1})/,"$1.$2.$3-$4")
      } else if (r.length > 6) {
        r = r.replace(/^(\d{3})(\d{3})(\d{0,3})/,"$1.$2.$3")
      } else if (r.length > 3) {
        r = r.replace(/^(\d{3})(\d{0,3})/,"$1.$2");
      } else {
        r = r.replace(/^(\d{3})/, "$1");
      }
      return r;
    };

    setTimeout(() => {
      let applyMask;
      if (this.name === 'phone') {
        applyMask = phoneMask;
      } else if (this.name === 'cpf') {
        applyMask = cpfMask;
      }
      if (applyMask) {
        e.target.value = applyMask(e.target.value);
      }
      this.doValidation(e, e.target.classList.contains('error'));
    }, 1);
  }

  render() {
    return `
      <div id='${this.name}Field' class='field'>
        <label for='${this.name}Input'>
          ${this.label}
        </label>
        <input 
          type='${this.type}'
          ${this.maxLength ? `maxlength='${this.maxLength}'` : ''}
          id='${this.name}Input'
          name='${this.name}Input'
        />
        <div id='${this.name}Error' class='fieldError'></div>
      </div>
    `;
  }

  postRender(form) {
    this.form = form;
    this.input = document.getElementById(`${this.name}Input`);
    if (this.input) {
      this.input.addEventListener('input', (e) => this.filterInput(e));
      this.input.addEventListener('blur', (e) => this.doValidation(e, true));
    }
  }
  
}