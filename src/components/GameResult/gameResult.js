import { Button, Placeholder } from 'react-bootstrap';
import './gameResult.scss';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    getPlayer,
    results,
    resultsApi, saveAllResult
} from '../../features/counter/counterSlice';
import axios from 'axios';
// import axios from '../../api/Api';
const GameResult = () => {
    const player = useSelector(getPlayer);
    const resultApi = useSelector(resultsApi);
    const resultPlayer = useSelector(results);

    const [image, setImage] = useState();
    const dispatch = useDispatch();
    const link = useNavigate();
    const [playerAnswer, setPlayerAnswer] = useState([resultPlayer]);


    const handleSumary = (resultApi) => {
        setPlayerAnswer([
            ...playerAnswer.concat(resultApi)
        ]);
    }

    const winnerIs = (index, resultApi) => {
        const player1 = resultPlayer.filter(
            (item) => item.namePlayer === player[0].name
        );
        const player2 = resultPlayer.filter(
            (item) => item.namePlayer === player[1].name
        );


        if (player1[index].answer === resultApi) {
            dispatch(
                saveAllResult({
                    id: player1[index].idPlayer,
                    round: player1[index].round,
                    player: player1[index].namePlayer,
                    date: player1[index].createdAt,
                    answer: player1[index].answer,
                    result: resultApi,
                })
            );
            dispatch(
                saveAllResult({
                    id: player2[index].idPlayer,
                    round: player2[index].round,
                    player: player2[index].namePlayer,
                    date: player2[index].createdAt,
                    answer: player2[index].answer,
                    result: resultApi,
                })
            );
            return player1[index].namePlayer;
        } else if (player2[index].answer === resultApi) {

            dispatch(
                saveAllResult({
                    id: player1[index].idPlayer,
                    round: player1[index].round,
                    player: player1[index].namePlayer,
                    date: player1[index].createdAt,
                    answer: player1[index].answer,
                    result: resultApi,
                })
            );
            dispatch(
                saveAllResult({
                    id: player2[index].idPlayer,
                    round: player2[index].round,
                    player: player2[index].namePlayer,
                    date: player2[index].createdAt,
                    answer: player2[index].answer,
                    result: resultApi,
                })
            );
            return player2[index].namePlayer;
        }


    };


    useEffect(() => {
        axios.get("https://yesno.wtf/api").then((res) => setImage(res.data.image));
    }, []);
    return (
        <div className='game-container'>
            <div className='game-header'>
                <div className='game-title'>Yes No WTF GAME</div>
                <div className="namePlayer">
                    Player : {player[0].name} , {player[1].name}
                </div>
                <Button className='history-btn' variant="outline-dark">Good luck</Button>
            </div>
            <div className='game-body-play'>

                {resultApi.map((item, index) => (

                    <div className='game-body-choose' key={item}>

                        <div>Round {item.round} </div>
                        <div className='game-body-choose-item'>
                            <div className='game-body-choose-item-info' >
                                <div className='game-body-info-result' >
                                    Result : {item.result}
                                </div>
                                <div className='game-body-info-winner'>
                                    Winner : {winnerIs(index, item.result)}
                                </div>
                            </div>

                            <div className='game-body-img'>
                                <img
                                    style={{ width: "112px", height: "61px" }}
                                    src={image}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='game-footer'>
                <Link to="/history">
                    <Button onClick={handleSumary} variant="success" className='btn-result '>
                        Summary
                    </Button>
                </Link>
            </div>
        </div >
    );
}

export default GameResult;
