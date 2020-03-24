
import Pet from './Pet';
import pf from 'petfinder-client';
import React from 'react';

import {Consumer} from './SearchContext';
import SearchBox from './SearchBox';

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
});

class Results extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            pets: [],
        };
    }

    componentDidMount() {
        this.search();
    }

    search = () => {
        petfinder.pet.find({
            output: 'full',
            location: this.props.searchParams.location,
            animal: this.props.searchParams.animal,
            breed: this.props.searchParams.breed,
        }).then(({petfinder}) => {
                let pets = [];

                if (petfinder.pets && petfinder.pets.pet) {
                    if (Array.isArray(petfinder.pets.pet)) {
                        pets = petfinder.pets.pet;
                    } else {
                        pets = [petfinder.pets.pet];
                    }
                }

                this.setState({
                    pets,
                });
            }
        );
    }

    handleTitleClick() {
        alert('You clicked the title');
    }

    render() {
        return (
            <div className="search" key="searchbox">
            <SearchBox search={this.search} />
                {this.state.pets.map((pet) => {
                    let breed;

                    if (Array.isArray(pet.breeds.breed)) {
                        breed = pet.breeds.breed.join(', ');
                    } else {
                        breed = pet.breeds.breed;
                    }

                    return (
                        <div>
                            <Pet
                                key={pet.id}
                                name={pet.name}
                                animal={pet.animal}
                                breed={breed}
                                location={`${pet.contact.city}, ${pet.contact.state}`}
                                media={pet.media}
                                id={pet.id}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default function ResultsWithContext(props) {
    return (
        <Consumer>
            {context => <Results {...props} searchParams={context} />}
        </Consumer>
    )
} ;
