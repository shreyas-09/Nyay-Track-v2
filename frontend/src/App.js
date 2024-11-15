import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import DefectChecker from './components/DefectChecker';
import Footer from './components/Footer';
import Header from './components/Header';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <main>
        <DefectChecker />
      </main>
      <Footer />
    </div>
  );
}

export default App;
