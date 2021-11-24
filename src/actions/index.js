export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleteHero = (heroes) => {
    return {
        type: 'HEROES_DELETE_HERO',
        payload: heroes
    }
}

export const heroesFilterHeroes = (filters) => {
    return {
        type: 'HEROES_FILTERED',
        payload: filters
    }
}

export const heroesSetFilterList = (filterList) => {
    return {
        type: 'SET_FILTER_LIST',
        payload: filterList
    }
}


