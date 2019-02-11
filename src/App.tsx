import * as React from 'react';
// import {connect} from 'react-redux';
import RouteMap from './router/index';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <RouteMap />
      </div>
    );
  }
}

export default App;
