import { Field } from 'components';

const data = {
  name: 'name',
  type: 'type',
  label: 'label',
  maxLength: 10,
  validate: (fieldIsInvalid) => fieldIsInvalid ? 'Error' : ''
};

describe('Field', () => {

  it('doValidation true', () => {
    const field = new Field(data);
    document.body.innerHTML = field.render();
    field.postRender({ validate: jest.fn() });
    field.doValidation();
    expect(field.isValid).toBeTruthy();
  });

  it('doValidation false', () => {
    const field = new Field(data);
    document.body.innerHTML = field.render();
    field.postRender({ validate: jest.fn() });
    field.input.value = 'invalidInput';
    field.doValidation();
    expect(field.isValid).toBeFalsy();
  });

  it('filterInput phone', () => {
    const field = new Field(data);
    field.doValidation = jest.fn();
    field.name = 'phone';
    const e = { target: { value: '12121212121', classList: { contains: jest.fn() } }};
    jest.useFakeTimers();
    field.filterInput(e);
    jest.runAllTimers();
    expect(e.target.value).toBe('(12) 12121-2121');
  });

  it('filterInput cpf', () => {
    const field = new Field(data);
    field.doValidation = jest.fn();
    field.name = 'cpf';
    const e = { target: { value: '12312312312', classList: { contains: jest.fn() } }};
    jest.useFakeTimers();
    field.filterInput(e);
    jest.runAllTimers();
    expect(e.target.value).toBe('123.123.123-12');
  });

  it('render', () => {
    const field = new Field(data);
    expect(field.render()).toMatchSnapshot();
  });

  it('postRender', () => {
    const field = new Field(data);
    document.body.innerHTML = field.render();
    field.postRender();

    field.doValidation = jest.fn();
    field.filterInput = jest.fn();

    field.input.focus();
    field.input.blur();
    expect(field.doValidation).toHaveBeenCalledTimes(1);

    field.input.dispatchEvent(new Event('input', { 'bubbles': true }));
    expect(field.filterInput).toHaveBeenCalledTimes(1);
  });

})