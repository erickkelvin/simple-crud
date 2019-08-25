import { Spinner } from 'components';

describe('Spinner', () => {
  const spinner = new Spinner();

  it('render', () => {
    expect(spinner.render()).toMatchSnapshot();
  });
});