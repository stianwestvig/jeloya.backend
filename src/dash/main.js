import React from 'react';
import Logo from './components/logo.jsx';
import List from './components/list.jsx';

class App extends React.Component {
  constructor () {
    super();
  }

  render () {
    return(<div>
        <Logo></Logo>
        <div className="row">
            <div className="small-12 medium-6 columns">
                <List title="Parkerte biler"></List>
            </div>
            <div className="small-12 medium-6 columns">
                <List title="Betalinger"></List>
            </div>
        </div>
    </div>)
  }
}

React.render(<App />, document.querySelector('#content'));
