import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CardPokemon from '../components/Cardpokemon';
import '../pages/HomePage.css';

export const HomePage = () => {
  const [pokemones, setPokemones] = useState([]);
  const [allPokemones, setAllPokemones] = useState([]);
  const [listado, setListado] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151);
  useEffect(() => {
    getPokemones(offset);
    getAllPokemones();
  }, []);

  const getPokemones = async (o) => {
    const liga =
      'https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + o;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setPokemones(respuesta.results);
      setListado(respuesta.results);
      //console.log(pokemones)
    });
  };
  const getAllPokemones = async () => {
    const liga = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setAllPokemones(respuesta.results);
    });
  };
  const buscar = async (e) => {
    if (e.keyCode == 13) {
      //significa que: si al presionar la tecla Enter en el buscador
      if (filtro.trim() != '') {
        setListado([]);
        setTimeout(() => {
          setListado(allPokemones.filter((p) => p.name.includes(filtro)));
        }, 100);
      }
    } else if (filtro.trim() == '') {
      //si la barra del buscador esta vacio, vuelve a traer la lista de pokemones completa
      setListado([]);
      setTimeout(() => {
        setListado(pokemones);
      }, 100);
    }
  };
  return (
    <>
      <header>
        <div className="logo">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            alt="Logo Pokedex"
          />
        </div>
        <input
          className="barra-busqueda"
          type="text"
          placeholder="¿Que Pokémon quieres buscar?"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
          }}
          onKeyUpCapture={buscar}
        />
      </header>

      <div className="todos">
        <div className="pokemon-todos" id="listaPokemon">
          {listado.map((pok, i) => (
            <CardPokemon poke={pok} key={i} />
          ))}
          {listado.length == 0 ? (
            <p className="text-center fs-2 mb-3">No hay Pokemones</p>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
