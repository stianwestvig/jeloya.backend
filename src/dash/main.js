import React from 'react';
import Logo from './components/logo.jsx';

class App extends React.Component {
  constructor () {
    super();
  }

  render () {
    return(<div>
        <Logo></Logo>
        <div>changed 3</div>


    </div>)
  }
}

React.render(<App />, document.querySelector('#content'));
