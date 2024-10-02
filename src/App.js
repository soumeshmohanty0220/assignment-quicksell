import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import Board from './Components/Board/Board';
import './App.css';

function App() {
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');

  useEffect(() => {
    const savedState = localStorage.getItem('kanbanState');
    if (savedState) {
      const { grouping, ordering } = JSON.parse(savedState);
      setGrouping(grouping);
      setOrdering(ordering);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanState', JSON.stringify({ grouping, ordering }));
  }, [grouping, ordering]);

  return (
    <div className="App">
      <Header 
        grouping={grouping}
        ordering={ordering}
        onGroupingChange={setGrouping}
        onOrderingChange={setOrdering}
      />
      <Board grouping={grouping} ordering={ordering} />
    </div>
  );
}

export default App;