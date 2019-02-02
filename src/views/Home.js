import React from 'react';
import logo from './../assets/logo.svg';
import HelloWorld from './../components/HelloWorld';

// la c'est incroyab, je balance du JSX comme un gros porc (j'ai fait pareil en commentaire dans le router)
const Home = () => (
  <div className="home">
    <img src={ logo } alt="logo" />
    <HelloWorld/>
  </div>
)

export default Home;