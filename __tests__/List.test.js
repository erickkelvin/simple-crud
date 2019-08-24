import { List } from 'components';
import { Users } from '../src/store';

describe('List test', () => {
  const list = new List(new Users());

  it('render', () => {
    expect(list.render()).toMatchSnapshot();
  });
});