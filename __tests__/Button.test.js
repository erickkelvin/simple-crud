import { Button } from 'components';

const data = {
  name: 'name',
  label: 'label',
  onClick: jest.fn()
};

describe('Button', () => {
  const button = new Button(data);

  it('render', () => {
    expect(button.render()).toMatchSnapshot();
  });

  it('postRender', () => {
    document.body.innerHTML = button.render();
    button.postRender();

    const buttonDom = document.getElementById(`${button.name}Button`);
    buttonDom.click();

    expect(buttonDom).toMatchSnapshot();
    expect(button.onClick).toHaveBeenCalledTimes(1);
  });
})