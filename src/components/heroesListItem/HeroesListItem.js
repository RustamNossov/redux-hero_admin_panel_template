import { CSSTransition } from 'react-transition-group';
import { useState, useEffect } from 'react';

import './heroes.scss'

const HeroesListItem = ({name, description, element, onRemoveHero, id}) => {
    
    const [inProp, setInProp] = useState(false);

    
    useEffect(()=>{
        setInProp(true)
    }, [])
    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    const onDelete = async (e) => {
        if (window.confirm(`Вы уверены что хотите удалить героя ${e.target.getAttribute('data-name')}?`)) {
            
            setInProp(false); 
            setTimeout(()=>onRemoveHero(e), 300)
        }
    }

    return (
        
            <CSSTransition 
                in={inProp}
                timeout={300}
                   
                unmountOnExit>
                <li className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
                        <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                            className="img-fluid w-25 d-inline" 
                            alt="unknown hero" 
                            style={{'objectFit': 'cover'}}/>
                        <div className="card-body">
                            
                            <h3 className="card-title">{name}</h3>
                            <p className="card-text">{description}</p>
                        </div>
                        <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                            <button 
                                    type="button" 
                                    className="btn-close btn-close" 
                                    aria-label="Close"
                                    data-name={name}
                                    data-id={id}
                                    onClick={(e)=>onDelete(e)}
                                    ></button>
                        </span>
                </li>

            </CSSTransition>
        
    )
}

export default HeroesListItem;