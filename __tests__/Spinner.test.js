import { Spinner } from 'components';

describe('Spinner test', () => {
  const spinner = new Spinner();

  it('render', () => {
    expect(spinner.render()).toMatchSnapshot();
  });
});