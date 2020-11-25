import React, { FC } from 'react';

 

const App  = () => {
  let arr = [];
  for (let index = 0; index < 100; index++) {
    arr.push(index);
  }
  return (
    <div className='App'>
      <div className='testBox'>
        <h3>在渲染后得到 testBox 高度</h3>
        {arr.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
      <header className='App-header'> 
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
