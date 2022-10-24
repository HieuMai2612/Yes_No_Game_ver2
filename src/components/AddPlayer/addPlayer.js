import './addPlayer.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPlayerName,
    idPlayer
} from '../../features/counter/counterSlice';

const AddPlayer = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const getId = useSelector(idPlayer);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(getPlayerName({ id: getId, name }));
        setName('');
        setShow(false);
        setTimeout(() => {
            navigate("../list-players", { replace: true });
        }, 500)
    };


    return (
        <div className='wrapper_dialog'>
            <Button variant="outline-dark" onClick={handleShow} >
                Add Player
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='Header' closeButton>
                    <Modal.Title>Please enter a new player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label >New player:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        aria-describedby="passwordHelpBlock"
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer className='Footer'>
                    <Button className="btn-player" variant="primary" onClick={handleAdd}>
                        OK
                    </Button>
                    <Button className="btn-player" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div >
    );

}

export default AddPlayer;