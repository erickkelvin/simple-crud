import { Form, List, NotFound } from 'components';
import { Users } from 'store';
import './index.styl';

const routes = {
  'index': List,
  'new': Form,
  'edit': Form,
  '404': NotFound
};

const store = new Users();

const renderApp = () => {
  if (window.location.pathname !== '/') {
    window.location.href = '/';
  }
  const path = window.location.hash.split('/');
  const route = routes[path[1] || 'index']  || routes['404'];
  const page = new route(store, path[1] === 'edit' && path[2]);
  document.getElementById('root').innerHTML = page.render();
  page.postRender && page.postRender();
};

renderApp();

window.addEventListener("hashchange", renderApp);
