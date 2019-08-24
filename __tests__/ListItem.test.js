import { List, ListItem } from 'components';
import { Users } from '../src/store';

const data = {
  id: 'id123',
  name: 'name',
  email: 'email@test.com',
  cpf: '123.456.789-12',
  phone: '(12) 34567-8901'
};

describe('ListItem test', () => {
  const listItem = new ListItem(new Users(), new List(), data);

  it('render', () => {
    expect(listItem.render()).toMatchSnapshot();
  });
});