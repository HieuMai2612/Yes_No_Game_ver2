import './tablePlayer.scss';
import { Table, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import Header from '../../page/header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    getPlayer,
    getPlayerName,
    idPlayer,
    saveRoundList,
} from '../../features/counter/counterSlice';


const TablePlayer = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const getPlayers = useSelector(getPlayer);
    const getId = useSelector(idPlayer);
    const closeAdd = () => setShow(false);
    const showAdd = () => setShow(true);
    const dispatch = useDispatch();



    //Set Round 
    const [round, setRound] = useState("");

    const link = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getPlayerName({ id: getId + 1, name }));
        setName('');
        setShow(false);

    };

    const handleClose = () => {
        setName('');
        setShow(false);
    }

    const tableRows = getPlayers.map((player, index) => {
        return (
            <tr key={index}>
                <td>{player.id}</td>
                <td>{player.name}</td>
            </tr>
        );
    });

    const handleChangeRound = (e) => {
        setRound(e.target.value);
    };
    const handleStart = () => {
        try {
            if (typeof JSON.parse(round) === "number") {
                dispatch(saveRoundList(Array.from(Array(JSON.parse(round)).keys())));
                link("/game-play");
            } else {
                return;
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <Header />
            <Table className='list-player-container' striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Player</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>

            <div className="mb-2">

                {getPlayers.length < 2 &&
                    <Button className='btn-add' variant="secondary" size="lg" onClick={showAdd}>
                        Add More Player
                    </Button>
                }
                <Modal show={show} onHide={closeAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please enter a new player</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label >New name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={name}
                            aria-describedby="passwordHelpBlock"
                            onChange={handleNameChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn-popup' variant="primary" onClick={handleSubmit}>
                            OK
                        </Button>
                        <Button className='btn-popup' variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>


                    </Modal.Footer>
                </Modal>


            </div>

            <div className='Footer-input'>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Set here..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={handleChangeRound}
                    />
                    <Button onClick={handleStart} className='btn-start' variant="outline-secondary" id="button-addon2">
                        Start
                    </Button>
                </InputGroup>
            </div>
        </>
    );
};

export default TablePlayer;