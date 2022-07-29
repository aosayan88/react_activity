import React, { Component } from 'react';
import Main from './pages/Main';
import "./App.css";

class App extends Component {
    render() { 
        return (
            <React.Fragment>
                <div className="container">
                    <Main />
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;