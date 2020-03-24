import React from 'react';

// createContext(consumer(we can modify this data from here), export provider )
const SearchContext = React.createContext({
    location: "Seatle, WA",
    breed: "",
    breeds: [],
    handleAnimalChange() {},
    handleBreedChange() {},
    handleLocationChange() {},
    getBreeds() {},
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;