import React from 'react';
import pf from 'petfinder-client';
import { navigate } from '@reach/router';
import Carousel from './Carousel';
import Modal from './Modal';

const peftFinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
});

class Details extends React.Component {
    state = {
        loading: true,
        showModal: false,
    }

    toogleModal = () => this.setState({showModal: !this.state.showModal});

    componentDidMount () {
        peftFinder.pet.get({
            output: 'full',
            id: this.props.id,
        }).then(data => {
            const pet = data.petfinder.pet;
            let breed;
            if (Array.isArray(pet.breeds.breed)) {
                breed = pet.breeds.breed.join(', ');
            } else {
                breed = pet.breeds.breed;
            }

            this.setState({
                name: pet.name,
                animal: pet.animal,
                location: `${pet.contact.city}, ${pet.contact.state}`,
                description: pet.description,
                media: pet.media,
                breed,
                loading: false,
            })
        }).catch(err => {
            this.setState({error: err});
            navigate('/');
        });
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading ....</h1>
        }
        const {name, animal, breed, location,description, media, showModal} = this.state;

        console.log(this.myH1);
        return (
            <div className="details">
            <Carousel media={media} />
                <div>
                    <h1 ref={el => (this.myH1 = el)}>{name}</h1>
                    <h2>{animal} - {breed} - {location}</h2>
                    <button onClick={this.toogleModal}>Adopt {name}</button>
                    <p>{description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <h1>Would you adopt {name}?</h1>
                                <div className="buttons">
                                    <button onClick={this.toogleModal}>Yes</button>
                                    <button onClick={this.toogleModal}>No</button>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>

            </div>
        );
    }
}

export default Details;
