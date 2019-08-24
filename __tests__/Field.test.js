import { Field } from 'components';

const data = {
  name: 'name',
  type: 'type',
  label: 'label',
  maxLength: 10,
  validate: () => 'Error' || ''
};

describe('Field test', () => {
  const field = new Field(data);

  it('render', () => {
    expect(field.render()).toMatchSnapshot();
  });
})