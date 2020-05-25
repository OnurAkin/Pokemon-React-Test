import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
export default class PokemonDetail extends Component{
state = {
 id:null,
 types:[],
 habilities:[],
 height:null,
}

      async componentDidMount() {
       const url = "https://pokeapi.co/api/v2/pokemon/" + this.props.match.params.name;
       const response = await fetch(url);
       const data = await response.json();
       this.setState({id : data.id, types: data.types, height: data.height, habilities: data.abilities});
      }

    render(){
            return (
              <div className="columndetail">
                 <article className="articledetails">
                     <Link to={'/'}> 
                         <div className="close-container">
                              <div className="leftright"></div>
                              <div className="rightleft"></div>
                              <label className="close">close</label>
                          </div>
                      </Link>
                      <div className="center"><img src={'https://img.pokemondb.net/sprites/black-white/anim/normal/' + this.props.match.params.name + '.gif'} style={{width: '60%', }}/></div> 
                        <h3 className="article__title center" >{this.props.match.params.name}</h3> 
                          <p><b>ID:</b> {this.state.id}</p> 
                          <b>Type:</b> {this.state.types.map(char => (
                          <div key={char.type.name}>
                           <ul><li>{char.type.name}</li></ul>
                          </div>
                        ))}
                          <p><b>Heifght:</b>  {this.state.height}</p> 
                          <b>Habilities:</b> {this.state.habilities.map(char => (
                          <div key={char.ability.name}>
                           <ul><li>{char.ability.name}</li></ul>
                          </div>
                         ))}
              
                  </article>
               </div> 
           );
       
    }
}