import React from 'react';
import {createPortal} from 'react-dom';

const modalRoot = document.getElementById('modal');
//Renders in a sepparate part of the react dom
class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);

    }

    componentWillUnmount() {
        //cleaning up the memory
        modalRoot.removeChild(this.el);
    }

    render() {
        return createPortal(this.props.children, this.el);
    }
}

export default Modal;
