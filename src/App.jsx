import { useState } from 'react';
import database from './dataBase.json';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


export default function App() {
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [generatedClue, setGeneratedClue] = useState('Click on Generate Clue');

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      if (selectedCategories.includes('All')) {
        setSelectedCategories([category]);
      } else {
        if (selectedCategories.includes(category)) {
          setSelectedCategories(selectedCategories.filter(item => item !== category));
        } else {
          setSelectedCategories([...selectedCategories, category]);
        }
      }
    }
  };

  const handleClick = () => {
    let selectedData = [];
    if (selectedCategories.includes('All')) {
      selectedData = Object.values(database).flat();
    } else {
      selectedData = selectedCategories.flatMap(category => database[category] || []);
    }

    const randomClue = selectedData[Math.floor(Math.random() * selectedData.length)];
    setGeneratedClue(randomClue);
  };


  return (
    <main className='App'>
      <h1 className='title'>Dumb Charades</h1>

      <div className='app-wrapper'>
        <div className="dropdown">
          <div className='dropdown-content'>
              <label className="container">
              <input type="checkbox" checked={selectedCategories.includes('All')} onChange={() => handleCategoryChange('All')} />
              All
              <span className="checkmark"></span>
            </label>
            {Object.keys(database).map(category => (
              <label key={category} className="container">
                <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} />
                {category}
                <span className="checkmark"></span>
              </label>
            ))}
          </div>
        </div>
        <input className='input' type="text" value={generatedClue} readOnly />
        <button className='generate-btn' onClick={handleClick}>Generate Clue</button>
      </div>

      <div className='footer'>
        <span className='credit'>Made by <a href="https://github.com/vishal-dcode">Vishal Vishwakarma</a></span>-
        <a href="https://github.com/vishal-dcode"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/vishal-s-vishwakarma/"><FaLinkedin /></a>
      </div>
    </main>
  );
}
