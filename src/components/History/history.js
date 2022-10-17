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

    console.log("ee", resultApi)


    // const matchResult = getResults.filter((match) => {
    //     if (match.matchId === questionNum) {
    //         return match;
    //     }
    // });

    // const search = matchResult.filter((item) => item?.name?.includes(text));

    const tableItem = getResults.map((results, index) => {
        return (
            <tr key={index}>
                <td>{results?.round}</td>
                <td>{results?.namePlayer}</td>
                <td>{results?.date}</td>
                <td>{results?.answer}</td>
                <td>{2}</td>
                <td>{results?.result === 'yes' ? '1' : '0'}</td>
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
                Match
                {/* {questions[indexName]?.match} */}
            </div>
            <Form.Control
                type="text"
                name="name"
                className="history-search"
            // onChange={handleSearch}
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
                    <tr>
                        <td>Mark</td>
                        <td>0%</td>
                        <td>0</td>

                    </tr>
                    <tr>
                        <td>Hennry</td>
                        <td>100%</td>
                        <td>1</td>

                    </tr>

                </tbody>
            </Table>
        </>
    )
}


export default History