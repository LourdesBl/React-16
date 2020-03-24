import React from "react";
import { ANIMALS } from "petfinder-client";
import {Consumer} from './SearchContext';

class SearchBox extends React.Component {
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.search();
    }
    render() {
        return (
            <Consumer>
            {/* function as a child */}
            {/* {function(context) {

            }}
            context is in scope, so now we can reference context
            */}
            {context => (
                 <div className="search-params">
                 <form onSubmit={this.handleFormSubmit} >
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        value={context.location}
                        placeholder="Location"
                        onChange={context.handleLocationChange}
                     >
                    </input>
                </label>

                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={context.animal}
                        onChange={context.handleAnimalChange}
                        onBlur={context.handleAnimalChange}
                    >
                        <option />
                        {
                            ANIMALS.map(animal => (
                                <option key={animal} value={animal}>
                                    {animal}
                                </option>
                            ))
                        }
                    </select>
                </label>

                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={context.breed}
                        onChange={context.handleBreedChange}
                        onBlur={context.handleBreedChange}
                        disabled={!context.breeds.length}
                    >
                        <option />
                        {
                            context.breeds.map(breed => (
                                <option key={breed} value={breed}>
                                    {breed}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <button>Submit</button>
                </form>
            </div>
            )}

            </Consumer>
        )
    }
}

export default SearchBox;

//export const SearchOtherParams = SearchParams; To export as a module
//Then how to import from outside
// import {SearchOtherParams} from './SearchParams'
// DO NOT DO: this.handleBreedChange.bind(this) .bind(this) gets called every render function
//you're creating and destroying the function in every call render

/**
 *     handleBreedChange(event) {
        this.setState({
            breed: event.target.value
        });
    }

 *
 * onChange={(event) => this.handleBreedChange(event)}
   onBlur={this.handleBreedChange.bind(this)} ==> this fn gets call on every render function, bad performance
   because you're creating and destroing a funtion avery single time you call render, and tha's just turn through
   memory, seeing more garbage collection

    CONTEXT:  universal data for your app, this is acccesible anywhere inside the react tree
    centralized store of data similar to Redux, help to avoid passing props along many components


 */