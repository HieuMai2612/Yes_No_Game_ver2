import './history.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { results, resultsApi, getAllResults } from '../../features/counter/counterSlice';

const History = () => {


    const allResult = useSelector(getAllResults);
    const getListResults = Object.values(allResult);

    //search
    const [text, setText] = useState('');


    const onChangeSearch = (e) => {
        setText(e.target.value);
        console.log(e.target.value)
    };

    const filtered = !text ? getListResults : getListResults.filter((results) => results?.namePlayer.toLowerCase().includes(text.toLowerCase()))

    const tableItem = filtered.map((results, index) => {
        return (
            <tr key={index}>
                <td>{results?.idPlayer}</td>
                <td>{results?.namePlayer}</td>
                <td>{results?.createdAt.slice(0, results.createdAt.length / 2)
                    .map((item) => (
                        <div>{item}</div>
                    ))
                }</td>
                <td>{results?.answer.slice(0, results.answer.length / 2)
                    .map((item) => (
                        <div>{item}</div>
                    ))}</td>
                <td>{results?.answerApi.slice(0, results.answerApi.length / 2)
                    .map((item) => (
                        <div>{item}</div>
                    ))}</td>
                <td>{results?.score / 2}</td>
            </tr>
        );
    });

    const playerSum = filtered.map((results, index) => {

        return (
            <tr key={index}>
                <td>{results?.namePlayer}</td>
                <td>{(results?.score / results.round) * 100} %</td>
                <td>{results?.score / 2}</td>
            </tr>
        );
    });

    return (
        <>
            <div className='game-header'>
                <div className='game-title'>Yes No WTF GAME</div>

            </div>
            <div className='history-body-match'>
                Final results
            </div>
            <Form.Control
                type="text"
                name="name"
                className="history-search"
                onChange={onChangeSearch}
                value={text}
            />
            <Table className='history-table' striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Player Name</th>
                        <th>Date</th>
                        <th>Answer</th>
                        <th>Result</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {tableItem}
                </tbody>
                <thead>
                    <tr>
                        <th>Summary</th>
                        <th>Correct Percent</th>
                        <th>Total Score</th>

                    </tr>
                </thead>
                <tbody>
                    {playerSum}
                </tbody>
            </Table>


            <div>
                {getListResults[0].score > getListResults[1].score
                    ? `The winner is ${getListResults[0].namePlayer}`
                    : `The winner is ${getListResults[1].namePlayer}`}
            </div>
        </>
    )
}


export default History