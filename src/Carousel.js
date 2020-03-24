import React from 'react';

class Carousel extends React.Component {
    state = {
        photos: [],
        active: 0,
    }

    componentWillMount() {
        const {media} = this.props;
        let photos = [];

        if (media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
        }

        this.setState({photos});

    }
    // Didn't work // Don't know why
    // static getDerivedStateFromProps({media}) {
    //     let photos = [];

    //     if (media && media.photos && media.photos.photo) {
    //         photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
    //     }

    //     return photos;
    // }

    handleIndexClick = (event) => {
        this.setState({
            active: +event.target.dataset.index,
        })
    }


    render() {

        const {photos, active} = this.state;

        return (
            <div className="carousel">
                <img src={photos[active].value} alt="primary animal"/>
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        <img
                            data-index={index}
                            key={photo.value}
                            src={photo.value}
                            className={index === active ? 'active': ''}
                            onClick={this.handleIndexClick}
                            alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Carousel;