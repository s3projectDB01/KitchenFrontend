import React from 'react';
import './App.css';
import OrderList from './components/OrderList';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
        <NavBar />
        <OrderList />
    </div>
  );
}

export default App;
