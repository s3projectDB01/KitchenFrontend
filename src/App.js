import React from 'react';
import './App.css';
import OrderList from './components/OrderList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Orders</h1>
        <OrderList />
        
      </header>
    </div>
  );
}

export default App;
