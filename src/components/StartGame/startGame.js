import './startGame.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, } from "react-bootstrap";
import Header from '../../page/header';
import AddPlayer from '../AddPlayer/addPlayer';
import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';
import { getAnswer, reloadLocal } from '../../features/counter/counterSlice';

const StartGame = () => {

    const dispatch = useDispatch();

    const [showAdd, getShowAdd] = useState(false);
    const [showStart, getShowStart] = useState(true);
    const onClickStart = () => {
        getShowAdd(true);
        getShowStart(false);
        dispatch(getAnswer());
    };


    useEffect(() => {
        localStorage.clear();
        dispatch(reloadLocal());
    }, []);

    return (
        <div className="start-game">
            <Header></Header>
            {showAdd ? <AddPlayer /> : null}
            {
                showStart && <Button onClick={onClickStart} variant="outline-dark"  >
                    Start Game
                </Button>
            }
        </div>
    );
};

export default StartGame;