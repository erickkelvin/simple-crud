import { NotFound } from 'components';

describe('NotFound', () => {
  const notFound = new NotFound();

  it('render', () => {
    expect(notFound.render()).toMatchSnapshot();
  });
});