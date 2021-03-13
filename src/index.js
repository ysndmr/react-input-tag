import React from 'react';
import logo from './logo.svg';
import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './app.scss';
import './index.css';

class InputTag extends React.Component {
	inputKeyDown = (event) => {
		if (event.key === "Enter" || event.key === "Tab") {
			event.preventDefault();
			event.stopPropagation();
			this.valueCheck(event);
		} else {
			if (event.key === "Backspace") {
				this.removeTag(event, undefined);
			}
		}
	}
	isErrorCheck = (event) => {
		let elm = document.getElementById("wrapper");
		const isErrorGroup = this.state.isErrorGroup;
		if (isErrorGroup) {
			elm.classList.add('error-set')
		} else {
			elm.classList.remove('error-set')
		}
	}
	valueCheck = (event) => {
		let evenTarget = event.target;
		let spanCheck = document.getElementsByClassName("input__group--span");
		let validate = false;
		if (evenTarget.value.length >= this.state.minLetters) {
			this.state.tags.map(function (item) {
				if (item.toString().toLowerCase() === evenTarget.value.toString().toLowerCase()) {
					validate = true;
				}
			});
			if ( !validate) {
				if (spanCheck.length < this.state.maxTag) {
					this.setState({isError: false});
					this.setState({isErrorGroup: false});
					this.setState({isDisabled: false});
					this.addTags(evenTarget)
				} else {
					this.setState({isError: true});
					this.setState({isErrorGroup: true});
					this.setState({isDisabled: true});
					this.isErrorCheck();
					setTimeout(() => {
						this.setState({isError: false});
						this.setState({isErrorGroup: false});
					}, 3000)
				}
			} else {
				this.isErrorCheck();
				this.noAddTags();
			}
			evenTarget.value = ''
		}
	}
	addTags = (event) => {
		this.setState({tags: [...this.state.tags, event.value]});
		this.setState({isVisible: false});
		this.setState({isErrorGroup: false});
	}
	noAddTags = () => {
		this.setState({isVisible: true});
		this.setState({isErrorGroup: true});
		
		setTimeout(() => {
			this.setState({isVisible: false});
			this.setState({isErrorGroup: false});
		}, 3000)
	}
	removeTag = (event, index) => {
		const newTags = [...this.state.tags];
		if (index === undefined) {
			if (event.target.value <= 0) {
				newTags.splice(this.state.tags.length - 1, 1);
				this.setState({tags: newTags});
				this.setState({isDisabled: false});
			}
		} else {
			newTags.splice(index, 1);
			this.setState({tags: newTags});
			this.setState({isDisabled: false})
		}
	}
	
	constructor() {
		super();
		this.state = {
			tags: [],
			isVisible: false,
			isErrorGroup: false,
			isDisabled: false,
			isError: false,
			maxTag: 7,
			minLetters: 4
		};
	}
	
	render() {
		return (
			<div>
				
				<div className="input-tag">
					<div className="input__group">
						<img src={logo} className="App-logo" alt="logo" />
						<small className="input__group--info">* You can add up to {this.state.maxTag} tags </small>
						<div className="input__group--wrapper" id="wrapper">
							{this.state.tags.map((tag, index) => (
								<span className="input__group--span" key={tag}>
					<span className="input__group--value" key={index}>
						{tag}
					</span>
							<span className="input__group--close" onClick={() => {
								this.removeTag(this.event, index);
							}}> X </span>
					</span>
							))}
							<input className="input__group--input"
							       onKeyDown={this.inputKeyDown}
							       type="text"
							       placeholder="write tags, least 4 letters."/>
						
						</div>
						{this.state.isVisible && <span className="input__group--error">This tag already added</span>}
						{this.state.isError && <span className="input__group--error">You added already seven tag</span>}
					</div>
				</div>
			</div>
			
		)
	}
}

ReactDOM.render(
	<InputTag/>,
	document.getElementById('root')
);

