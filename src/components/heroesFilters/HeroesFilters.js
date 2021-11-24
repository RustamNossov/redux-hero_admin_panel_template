import { useEffect, useState } from "react";
import { heroesFilterHeroes } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';


// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const [optns, setOptns] = useState([])
    const {filtersList} = useSelector(state => state);
    const dispatch = useDispatch()

    const onFilter = (e) => {
        document.querySelectorAll('.btn-group .btn').forEach(btn=> btn.classList.remove('active'))
        e.target.classList.add('active')
        dispatch(heroesFilterHeroes(e.target.getAttribute('data-name')))
    }

    useEffect(()=>{
            setOptns(
                filtersList.map((element, i) => {
                                let clazz, desc;
                                if (element.option === 'all') {
                                    clazz = `btn active ${element.clazzForFilter}`
                                    desc = "Все"
                                } else {
                                    clazz = `btn ${element.clazzForFilter}`
                                    desc = element.russian
                                }
                                                
                                return  <button 
                                            onClick={(e)=>onFilter(e)} 
                                            key={i} 
                                            data-name={element.option} 
                                            className={clazz}
                                            >{desc}</button>           
                    })
            )

         
    },[filtersList])
    

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {optns}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;