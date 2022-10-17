import './history.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { results, resultsApi } from '../../features/counter/counterSlice';

const History = () => {

    const getResults = useSelector(results)
    const resultApi = useSelector(resultsApi);

    //search
    const [text, setText] = useState('');


    const onChangeSearch = (e) => {
        setText(e.target.value);
        console.log(e.target.value)
    };

    const filtered = !text ? getResults : getResults.filter((results) => results?.namePlayer.toLowerCase().includes(text.toLowerCase()))

    const tableItem = filtered.map((results, index) => {
        return (
            <tr key={index}>
                <td>{results?.round}</td>
                <td>{results?.namePlayer}</td>
                <td>00/12/2000</td>
                <td>{results?.answer}</td>
                <td>2</td>
                <td>0</td>
            </tr>
        );
    });

    const playerSum = filtered.map((results, index) => {
        return (
            <tr key={index}>
                <td>{results?.namePlayer}</td>
                <td>100 %</td>
                <td>000</td>
            </tr>
        );
    });


    return (
        <>
            <div className='game-header'>
                <div className='game-title'>Yes No WTF GAME</div>
                <Link to="/game-play">
                    <Button className='history-btn' variant="outline-dark">Back</Button>
                </Link>
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
        </>
    )
}


export default History