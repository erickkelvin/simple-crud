import { List, ListItem } from 'components';
import { Users } from 'store';

const data = {
  id: 'id123',
  name: 'name',
  email: 'email@test.com',
  cpf: '123.456.789-12',
  phone: '(12) 34567-8901'
};

describe('ListItem', () => {
  const listItem = new ListItem(new Users(), new List(), data);

  it('render', () => {
    expect(listItem.render()).toMatchSnapshot();
  });

  it('postRender', () => {
    listItem.editButton.postRender = jest.fn();
    listItem.deleteButton.postRender = jest.fn();
    listItem.postRender();
    expect(listItem.editButton.postRender).toHaveBeenCalledTimes(1);
    expect(listItem.deleteButton.postRender).toHaveBeenCalledTimes(1);
  });
});