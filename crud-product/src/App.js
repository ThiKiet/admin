import React from 'react';
import Products from './components/Products';
import CardItem from './components/Card';
import './App.css';

function App() {
	return (
		<div className="row">
			<div className="col-md-8 offset-md-2">
				<Products />
				<CardItem />
			</div>
		</div>
	);
}

export default App;
