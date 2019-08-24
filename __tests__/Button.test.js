import { Button } from 'components';

const data = {
  name: 'name',
  label: 'label',
  onClick: () => {}
};

describe('Button test', () => {
  const button = new Button(data);

  it('render', () => {
    expect(button.render()).toMatchSnapshot();
  });
})