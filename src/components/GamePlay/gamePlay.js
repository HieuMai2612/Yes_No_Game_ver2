import { Button, Spinner, Placeholder } from 'react-bootstrap';
import './gamePlay.scss';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    roundList,
    getPlayer,
    saveResultApi,
    saveResult,
    resultsApi,
    saveAllResult,
    results
} from '../../features/counter/counterSlice';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCoffee, faXmark } from '@fortawesome/free-solid-svg-icons';
// import axios from '../../api/Api';
const GamePlay = () => {
    const apiResults = useSelector(resultsApi);

    const round = useSelector(roundList);
    const player = useSelector(getPlayer);
    const getResults = useSelector(results);
    console.log("🚀 ~ file: gamePlay.js ~ line 26 ~ GamePlay ~ getResults", getResults)
    //show btn when clicked
    const [showBtn, setShowBtn] = useState(true);
    const [showSelketon, setShowSelketon] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // set state for player with answer
    const [answerPlayerOne, setAnswerPlayerOne] = useState([]);
    const [answerPlayerTwo, setAnswerPlayerTwo] = useState([]);

    const dispatch = useDispatch();
    const link = useNavigate();


    useEffect(() => {
        setAnswerPlayerOne(
            round.map(() => {
                return "yes";
            })
        );
        setAnswerPlayerTwo(
            round.map(() => {
                return "no";
            })
        );
    }, []);

    console.log(player[0].id)


    const onClickSubmit = () => {

        setShowBtn(false);
        setIsLoading(true);
        setShowSelketon(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowSelketon(false);
            setShowBtn(true);
        }, 2000);
        round.map(async (item) => {
            await axios.get("https://yesno.wtf/api")
                .then((res) => {
                    // let api = res.data.answer;
                    // answersApi = [...apiResults, api];
                    dispatch(saveResultApi({
                        round: item,
                        rounds: round,
                        // resultApi: apiResults,
                        idPlayer: player[0].id,
                        namePlayer: player[0].name,
                        answer: answerPlayerOne,
                        createdAt: new Date().toISOString(),
                    }),
                        dispatch(saveResultApi({
                            round: item,
                            rounds: round,
                            // resultApi: apiResults,
                            idPlayer: player[1].id,
                            namePlayer: player[1].name,
                            answer: answerPlayerTwo,
                            createdAt: new Date().toISOString(),
                        })

                            // if (player[0].id === 1) {
                            //     dispatch(saveAllResult({
                            //         idPlayer: player[0].id,
                            //         round: round[0],
                            //         namePlayer: player[0].name,
                            //         answerApi: res.data.answer,
                            //         answerPlayer: answerPlayerOne,
                            //         createdAt: new Date().toISOString(),

                            //     }));
                            // }
                        ))
                });

        });


        // player.forEach((item) => {
        //     let data = {
        //         score: 0,
        //         win: [],
        //         date: new Date().toLocaleString(),
        //         isValid: false,
        //     };
        // });
        // setTimeout(() => {
        //     link("/game-result");
        // }, 1000);
        // round.map(async (item) => {
        //     await axios.get("https://yesno.wtf/api").then((res) => {
        //         dispatch(saveResultApi({
        //             round: item,
        //             resultApi: res.data.answer,
        //             idPlayer: player[0].id,
        //             namePlayer: player[0].name,
        //             answer: [],
        //             createdAt: new Date().toISOString(),
        //         }),
        //         );
        //     });

        // });
    }
    // const onClickYes = (roundItem) => {
    //     setPlayerAnswer([
    //         ...playerAnswer,
    //         {
    //             round: roundItem,
    //             idPlayer: player[playerIndex].id,
    //             namePlayer: player[playerIndex].name,
    //             answer: "yes",
    //             createdAt: new Date().toISOString(),
    //         },
    //     ]);
    // };

    // const onClickNo = (roundItem) => {
    //     setPlayerAnswer([
    //         ...playerAnswer,
    //         {
    //             round: roundItem,
    //             idPlayer: player[playerIndex].id,
    //             namePlayer: player[playerIndex].name,
    //             answer: "no",
    //             createdAt: new Date().toISOString(),
    //         },
    //     ]);
    // };

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
                        <FontAwesomeIcon icon={faCoffee} style={{ color: "green", marginRight: 10 + 'px ' }} />
                        Player :
                        <div style={{ color: "green" }}> {player[0].name}</div>,
                        <div style={{ color: "red" }}> {player[1].name}</div>

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

                                        <Button

                                            className='game-body-choose-btn-yes'
                                            variant="outline-dark"
                                        >
                                            <FontAwesomeIcon icon={faCheck} />    YES
                                        </Button>
                                        <Button

                                            className='game-body-choose-btn-no'
                                            variant="outline-dark"
                                        >
                                            <FontAwesomeIcon icon={faXmark} />      NO
                                        </Button>
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

            </div>
        </div >
    );
}

export default GamePlay;
