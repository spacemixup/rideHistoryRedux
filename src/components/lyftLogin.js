import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../actions/index.js';
import { Link } from 'react-router';

class LyftLogin extends Component { 
	componentWillMount() {
		this.props.fetchAuth();
	}
	render() {
		return (
			<LyftButton />
		)
	}
}

function mapStateToProps(state) {
	return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchAuth })(LyftLogin);