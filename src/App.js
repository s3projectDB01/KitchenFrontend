import React from 'react';
import './App.css';
import OrderList from './components/OrderList';

function App() {
  return (
    <div className="App">
        <h1>Order Overview</h1>

        <OrderList />
        
    </div>
  );
}

export default App;
