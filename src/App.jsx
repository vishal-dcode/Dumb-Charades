import { useState } from 'react';
import database from './dataBase.json';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


export default function App() {
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [generatedClue, setGeneratedClue] = useState('Click on Generate Clue');
  const [usedClues, setUsedClues] = useState([]);

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

    // Filter out used clues
    const filteredData = selectedData.filter(clue => !usedClues.includes(clue));

    // If all clues have been used, reset usedClues
    if (filteredData.length === 0) {
      setUsedClues([]);
      setGeneratedClue('No more clues available');
      return;
    }

    // Randomly select a clue from filteredData
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    const randomClue = filteredData[randomIndex];

    // Update usedClues
    setUsedClues(prevUsedClues => [...prevUsedClues, randomClue]);

    // Set generatedClue
    setGeneratedClue(randomClue);
  };


  return (
      <main className='App flex items-center text-center flex-col justify-around min-h-[70vh]'>
        <h1 className='title font-bold text-gray-300 text-5xl sm:text-6xl'>Dumb Charades</h1>

        <div className='app-wrapper w-full relative text-gray-300 border border-[#646cff] bg-[#1d1d1d] rounded-[16px] grid gap-1 max-w-[1100px] p-[4px] w-full'>
          <div className="dropdown px-5 py-10 flex justify-center">
            <div className='dropdown-content text-md max-w-[700px] flex flex-wrap justify-center gap-3'>
                <label className="container whitespace-nowrap flex gap-1 w-auto">
                <input type="checkbox" checked={selectedCategories.includes('All')} onChange={() => handleCategoryChange('All')} />
                All
                <span className="checkmark"></span>
              </label>
              {Object.keys(database).map(category => (
                <label key={category} className="container whitespace-nowrap flex gap-1 w-auto">
                  <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} />
                  {category}
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
          </div>
          <input className='input w-full overflow-scroll p-3 text-white rounded-tl-[12px] rounded-br-[6px] rounded-tr-[12px] rounded-bl-[6px] text-center text-[24px] font-bold bg-gray-600' type="text" value={generatedClue} readOnly />
          <button className='generate-btn p-3 text-md font-medium border-none uppercase bg-[#646cff] text-white rounded-tl-[6px] rounded-br-[12px] rounded-tr-[6px] rounded-bl-[12px]' onClick={handleClick}>Generate Clue</button>
        </div>

        <div className='footer fixed text-sm whitespace-nowrap bottom-4 right-4 flex items-center gap-2 justify-center text-gray-200'>
          <span className='credit italic font-light'>Made by <a className='text-[#646cff] font-medium' href="https://github.com/vishal-dcode">Vishal Vishwakarma</a></span>-
          <a className='flex items-center justify-center hover:text-[#535bf2]' href="https://github.com/vishal-dcode"><FaGithub /></a>
          <a className='flex items-center justify-center hover:text-[#535bf2]' href="https://www.linkedin.com/in/vishal-s-vishwakarma/"><FaLinkedin /></a>
        </div>
      </main>
  );
}
