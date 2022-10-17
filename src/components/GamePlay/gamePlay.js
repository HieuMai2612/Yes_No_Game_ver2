import { Button, Spinner, Placeholder } from 'react-bootstrap';
import './gamePlay.scss';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    roundList,
    getPlayer,
    indexPlayer,
    nextPlayer,
    saveResultApi,
    saveResult
} from '../../features/counter/counterSlice';
import axios from 'axios';
// import axios from '../../api/Api';
const GamePlay = () => {
    const round = useSelector(roundList);
    const player = useSelector(getPlayer);
    const playerIndex = useSelector(indexPlayer);
    const [playerAnswer, setPlayerAnswer] = useState([]);

    //show btn when clicked
    const [showBtn, setShowBtn] = useState(true);
    const [showSelketon, setShowSelketon] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(true);

    const dispatch = useDispatch();
    const link = useNavigate();





    const onClickSubmit = () => {
        if (playerIndex < player.length - 1) {
            dispatch(saveResult(playerAnswer));
            dispatch(nextPlayer());
            setPlayerAnswer([]);
            setShowBtn(false);
            setIsLoading(true);
            setShowSelketon(true);
            setTimeout(() => {
                setIsLoading(false);
                setShowSelketon(false);
                setShowBtn(true);
            }, 3000);
        } else {
            dispatch(saveResult(playerAnswer));
            setShowBtn(false);
            setIsLoading(true);
            setShowSelketon(true);
            setTimeout(() => {
                setIsLoading(false);
                setShowSelketon(false);
                setShowBtn(true);
            }, 2000);
            round.map(async (item) => {
                await axios.get("https://yesno.wtf/api").then((res) => {
                    dispatch(saveResultApi({ round: item, result: res.data.answer }));
                });
                setTimeout(() => {
                    link("/game-result");
                }, 1000);
            });

        }
    }
    const onClickYes = (roundItem) => {
        setPlayerAnswer([
            ...playerAnswer,
            {
                round: roundItem,
                idPlayer: player[playerIndex].id,
                namePlayer: player[playerIndex].name,
                answer: "yes",
            },
        ]);
    };

    const onClickNo = (roundItem) => {
        setPlayerAnswer([
            ...playerAnswer,
            {
                round: roundItem,
                idPlayer: player[playerIndex].id,
                namePlayer: player[playerIndex].name,
                answer: "no",
            },
        ]);
    };

    // useEffect(() => {
    //     if (playerCount === players.length) {
    //         setQuestionNum(questionNum => questionNum + 1);
    //         dispatch(playerResult(null, null, null, null, questionNum + 1));
    //         setPlayerCount(0);
    //     }
    // }, [showBtn]);

    // useEffect(() => {
    //     axios.getImage().then((response) => {
    //         setImage(response.image);
    //         setApiAnswer(response.answer);
    //     });
    // }, [showBtn]);

    // useEffect(() => {
    //     apiAnswer === answer ? setCheckAnswer('yes') : setCheckAnswer('no');
    // }, [answer]);


    return (
        <div className='game-container'>
            <div className='game-header'>
                <div className='game-title'>Yes No WTF GAME</div>

                <Link to="/history">
                    <Button className='history-btn' variant="outline-dark">Player History</Button>
                </Link>
            </div>
            <div className='game-body'>
                <div className='game-body-title'>
                    <div className='game-body-match'>
                        Player:
                        {player[playerIndex].name}
                    </div>
                </div>

                <div className='game-body-play'>
                    {
                        round.map((item, index) => (
                            <div key={index} className='game-body-choose'>
                                <div className='game-body-round'>
                                    Round:{item}
                                </div>

                                {showSelketon === true ?
                                    <Placeholder className='game-body-choose-placeholder' as="p" animation="glow">
                                        <Placeholder style={{ height: 120 + 'px', width: 400 + 'px' }} xs={12} />
                                    </Placeholder> :
                                    <div className='game-body-choose-btn'>
                                        <Button onClick={() => onClickYes(item)} className='game-body-choose-btn-yes' variant="outline-dark">YES</Button>
                                        <Button onClick={() => onClickNo(item)} className='game-body-choose-btn-no' variant="outline-dark">NO</Button>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className='game-footer'>

                {showBtn &&
                    <Button Button
                        onClick={onClickSubmit}
                        className='btn-submit' variant="outline-dark" >Submit Answer</Button>
                }
                {isLoading && <Button
                    isloading={isLoading}
                    variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>}

                {/* {showSummaryBtn &&
                    <Link to="/history">
                        <Button variant="success" className='btn-result '>
                            Summary
                        </Button>
                    </Link>
                } */}
            </div>
        </div >
    );
}

export default GamePlay;
