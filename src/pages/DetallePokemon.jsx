import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CardPokemon from '../components/Cardpokemon';
import '../pages/DetallePokemon.css';

//------------CHARTS JS-----------//
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import RadarChart from '../components/Radar';
//--------------------------//

Chart.register(CategoryScale);

export const DetallePokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [especie, setEspecie] = useState([]);
  const [habitat, setHabitat] = useState('Desconocido');
  const [descripcion, setDescripcion] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);
  const [cardClass, setCardClass] = useState('d-none');
  //----------------------------------------------------//
  //----------------//Use state de grafico Radar //-------//
  const [chartData, setChartData] = useState({
    labels: [
      'PS',
      'Ataque',
      'Defensa',
      'Ataque Especial',
      'Defensa Especial',
      'Velocidad',
    ],
    datasets: [
      {
        label: 'Value',
        data: [10, 20, 30, 40, 50, 60],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });
  //----------------------------------------------------//

  useEffect(() => {
    getPokemon();
  }, []);

  //----------------------------------------------------//

  const getPokemon = async () => {
    const liga = 'https://pokeapi.co/api/v2/pokemon/' + id;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      setImagen(respuesta.sprites.other['official-artwork'].front_default);
      await getTipos(respuesta.types);
      await getHabilidades(respuesta.abilities);
      await getEspecie(respuesta.species.name);
      await getEstadisticas(respuesta.stats);
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

  const getHabilidades = async (hab) => {
    let listaHabilidades = [];
    hab.forEach((h) => {
      axios.get(h.ability.url).then(async (response) => {
        listaHabilidades.push(response.data.names[5].name);
        setHabilidades(listaHabilidades);
      });
    });
  };

  const getEstadisticas = async (es) => {
    let listaEstadisticas = [];
    es.forEach((h) => {
      axios.get(h.stat.url).then(async (response) => {
        listaEstadisticas.push({
          nombre: response.data.names[5].name,
          valor: h.base_stat,
        });
        setEstadisticas(listaEstadisticas);
        //-------//Set chart Data aca debe mejorar con map u otro metodo de objetos y arrays //-------//
        const data = {
          labels: [
            listaEstadisticas[0].nombre,
            listaEstadisticas[1].nombre,
            listaEstadisticas[2].nombre,
            listaEstadisticas[3].nombre,
            listaEstadisticas[4].nombre,
            listaEstadisticas[5].nombre,
          ],
          datasets: [
            {
              label: 'Value',
              data: [
                listaEstadisticas[0].valor,
                listaEstadisticas[1].valor,
                listaEstadisticas[2].valor,
                listaEstadisticas[3].valor,
                listaEstadisticas[4].valor,
                listaEstadisticas[5].valor,
              ],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        };
        setChartData(data);
      });
    });
  };

  const getEspecie = async (esp) => {
    const liga = 'https://pokeapi.co/api/v2/pokemon-species/' + id;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setEspecie(respuesta);
      if (respuesta.habitat != null) {
        await getHabitat(respuesta.habitat.url);
      }
      await getDescripcion(respuesta.flavor_text_entries);
    });
  };
  const getHabitat = async (hab) => {
    axios.get(hab).then(async (response) => {
      setHabitat(response.data.names[1].name);
    });
  };

  const getDescripcion = async (desc) => {
    let texto = '';
    desc.forEach((d) => {
      if (d.language.name == 'es') {
        texto = d.flavor_text;
      }
    });
    setDescripcion(texto);
  };

  return (
    <>
      <button className="btn-home">
        <Link to="/" className="">
          <i class="fa fa-home"> Home</i>
        </Link>
      </button>

      <div className="img-info-hab">
        <div className="info-container">
          <h1 className="Nombre">{pokemon.name}</h1>
          <p className="descripcion">{descripcion} </p>
        </div>
        <div className="hab-container">
          <h1 className="Hab">habitat</h1>
          <p className="Hab-info">{habitat} </p>
        </div>
        <div className="img-container">
          <img className="img-detalle" src={imagen} />
        </div>
        <div className="radar-container">
          <p className="radar-label">{pokemon.name} abilities</p>
          <RadarChart chartData={chartData} />
        </div>
      </div>
    </>
  );
};

export default DetallePokemon;
