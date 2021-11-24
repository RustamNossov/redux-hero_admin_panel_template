const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: 'all',
    filtersList: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE_HERO':
            return {
                ...state,
                heroes: action.payload,
            }
        case 'HEROES_FILTERED':
            return {
                ...state,
                filters: action.payload,
            }
        case 'SET_FILTER_LIST':
            return {
                ...state,
                filtersList: action.payload,
            }
        default: return state
    }
}

export default reducer;