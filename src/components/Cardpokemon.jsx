import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Cardpokemon.css';

export const CardPokemon = (params) => {
  const [pokemon, setPokemon] = useState([]);
  const [imagen, setImagen] = useState('');
  const [cardClass, setCardClass] = useState('d-none');
  const [loadClass, setLoadClass] = useState('');
  const [tipos, setTipos] = useState([]);
  useEffect(() => {
    getPokemon();
  }, []);
  const getPokemon = async () => {
    const liga = params.poke.url;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      setImagen(respuesta.sprites.other['official-artwork'].front_default);
      await getTipos(respuesta.types);
      setCardClass('');
    });
  };

  const getTipos = async (tip) => {
    let listaTipos = [];
    tip.forEach((t) => {
      axios.get(t.type.url).then(async (response) => {
        listaTipos.push(response.data.names[5].name);
        setTipos(listaTipos);
      });
    });
  };

  return (
    <>
      <div className="pokemon">
        <p className="pokemon-id-back">#{pokemon.id}</p>
        <div className="pokemon-imagen">
          <img src={imagen} alt="pokemon" />
        </div>
        <div className="pokemon-info">
          <div className="nombre-contenedor">
            <p className="pokemon-id">#{pokemon.id}</p>
            <h2 className="pokemon-nombre">{pokemon.name}</h2>
          </div>
          <div className="pokemon-tipos">
            <p className="tipo">
              {tipos.map((tip, i) => (
                <p className={tip} key={i}>
                  {tip}
                </p>
              ))}
            </p>
          </div>
          <div className="pokemon-stats">
            <p className="stat">{pokemon.height / 10} m</p>
            <p className="stat">{pokemon.weight / 10} kg</p>
          </div>
          <button className="btn-info">
            <Link to={'/pokemon/' + pokemon.name} className="btn btn-dark">
              Info
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default CardPokemon;
