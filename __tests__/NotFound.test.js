import { NotFound } from 'components';

describe('NotFound test', () => {
  const notFound = new NotFound();

  it('render', () => {
    expect(notFound.render()).toMatchSnapshot();
  });
});