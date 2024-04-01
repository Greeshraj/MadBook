// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <div>
        <Link to="/createpdf">
          <button>Create PDF</button>
        </Link>
        <Link to="/createsubject">
          <button>Create Subject</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
