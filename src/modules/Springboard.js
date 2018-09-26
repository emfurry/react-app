import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import Game from './TicTacToe'
import FilterList from './FilterList'

export default function() {
    return (
        <div>
            <h1>Hello, Springboard!</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/game">Tic Tac Toe</Link></li>
                <li><Link to="/filter-list">Filter List Example</Link></li>
            </ul>
            <div>
                <Switch>
                    <Route path="/game" component={Game} />
                    <Route path="/filter-list" component={FilterList} />
                </Switch>
            </div>
        </div>
    );
}