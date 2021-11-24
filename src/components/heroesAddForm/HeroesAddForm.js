import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { heroesFetched } from '../../actions';
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from '../../hooks/http.hook';

import './heroesAddForm.scss'
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {heroes, filters, filtersList} = useSelector(state => state);
    const [optns, setOptns] = useState([])
    const dispatch = useDispatch()
    const {request} = useHttp();

   
    useEffect(()=>{
        setOptns(
            filtersList.map((element, i) => {
                                    return  <option key={i} value={element.option}>{element.russian}</option>
                                })
                    )
    },[filtersList])

    const formSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        
        
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        let newHeroes = JSON.parse(json)
        if (newHeroes.element !== "all") {
            newHeroes.id = uuidv4()
       
            request("http://localhost:3001/heroes", "POST", JSON.stringify(newHeroes))
                .then(()=> {
                    if (filters === 'all' || newHeroes.element === filters) {
                        newHeroes = [...heroes, newHeroes]
                        dispatch(heroesFetched(newHeroes))
                    }
    
                })
                .catch(() => {
                    window.alert('Произошла ошибка. Герой не добавлен. Попробуйте позднее')
            })
            
            form.reset()

        }
        
    }

    return (

        <Formik
            initialValues={{
                name: '',
                description:'',
                element: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                        .min(2, "At least 2 symbols")
                        .required("Please enter a name"),
                description: Yup.string()
                        .min(10, "At least 10 symbols")
                        .required("Please enter some description"),
                element: Yup.string()
                        .required("Please select an element")
                        .matches(/(fire|water|wind|earth)/, 'Please select an element')
            })}
        
        >
                <Form onSubmit={(e)=> formSubmit(e)} className="border p-4 shadow-lg rounded">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                        <Field 
                        required
                            type="text" 
                            name="name" 
                            className="form-control" 
                            id="name" 
                            placeholder="Как меня зовут?"
                            />
                        <ErrorMessage className="error" name="name" component="div"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="text" className="form-label fs-4">Описание</label>
                        <Field
                        required
                            type="textarea"
                            as="textarea"
                            name="description" 
                            className="form-control" 
                            id="text" 
                            placeholder="Что я умею?"
                            maxLength="50"
                            style={{"height": '130px'}}
                            />
                        <ErrorMessage className="error" name="description" component="div"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                        <Field 
                            as="select"
                            className="form-select" 
                            id="element" 
                            name="element">
                                {optns}
                        </Field>
                        <ErrorMessage className="error" name="element" component="div"/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Создать</button>
                        {/* {heroesLoadingStatus === "loading" ? <Spinner/> : null} */}
                    </div>
                    
                </Form>

        </Formik>
        
    )
}

export default HeroesAddForm;