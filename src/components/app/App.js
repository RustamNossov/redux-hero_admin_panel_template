import { useEffect } from "react";
import { heroesSetFilterList } from '../../actions';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';


import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';
import 'animate.css'; 


const App = () => {
    const dispatch = useDispatch()
    const {request} = useHttp();
    
    useEffect(()=>{
        request("http://localhost:3001/filters")
            .then(data => dispatch(heroesSetFilterList(data)))
            .catch(() => console.log('Произошла ошибка'))
    }, [])


    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;