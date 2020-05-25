import React, { useEffect, useState} from 'react';
import axios from 'axios';
import logo from './img/pokemonlogo.png';
import './css/styles.scss';
import PokemonDetail from './PokemonDetail'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default function Pokemon() {
 const [pokemonchar, setPokemonchar] = useState([]);
 const [search, SetSearch] = useState('');
 
  useEffect(() => {
     axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then(response => setPokemonchar(response.data.results));
      }, []);


      const filteredPokemon = pokemonchar.filter( pokemon => {
         return pokemon.name.toLowerCase().includes(search.toLowerCase())
         })


  return (
<Router>
    <div>
      <div className="center"> 
        <img src={logo} className="logo" alt="Pokesmon slogo" />
      </div>
      
      <Route path="/" 
         exact
         render ={renderProps => {
             return (<div className="left"><input type="text" placeholder="Search" onChange={ e => SetSearch(e.target.value)} /></div>);
          }
      }
      />
     <div className="container">
   
      <Route path="/" 
        exact
        render={() => filteredPokemon.map(character => {
        return (
          <div key={character.name} className="column">
              <Link to={'/pokemon/'+character.name}> 
                <article className="article">
                  <div className="center"><img src={'https://img.pokemondb.net/sprites/black-white/anim/normal/' + character.name + '.gif'} /></div>
                   <h1 className="article__title center">{character.name}</h1>
                 </article>
              </Link>
          </div>
        );
      })
    
    }
    />

       <Route path="/pokemon/:name" 
          render={renderProps => {
           const detail = pokemonchar.find(
            detail => detail.name ===
            renderProps.match.params.name
       )
        return <PokemonDetail {...renderProps} detail={detail}/>;
    }} 
    />
     </div>
    
  </div>
</Router>
  
  );
}

