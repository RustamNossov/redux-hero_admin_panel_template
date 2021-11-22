import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroesDeleteHero } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onRemoveHero = (e) => {
        if (window.confirm(`Вы уверены что хотите удалить героя ${e.target.getAttribute('data-name')}?`)) {
            const heroId = +e.target.getAttribute('data-id');
            
                
            request(`http://localhost:3001/heroes/${heroId}`, 'DELETE')
                .then(()=>{
                    const position = heroes.findIndex(elem => elem.id === heroId);
                    const newHeroes = [...heroes.slice(0, position), ...heroes.slice(position+1)];
                    dispatch(heroesDeleteHero(newHeroes))
                })
                .catch(() => window.alert('Ошибка! Не удалось удалить персонажа'))
        }
        
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem 
                        key={id} id={id} {...props} onRemoveHero={(e)=>onRemoveHero(e)}
                        />
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;