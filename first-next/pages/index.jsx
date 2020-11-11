import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';

// const Index = (props) => {
// 	console.log('props.posts ',props.posts);
// 	return (
// 		<div>
// 			<h1>Index page (2)</h1>
// 			<ul>
// 				{props.posts.map(post => (
// 					<li key={post.id}>{post.title}</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// Index.getInitialProps = async () => {
// 	console.log('Index::getInitialProps()');
// 	const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
// 	const { data } = res;
// 	console.log('data[0] ', res.data[0]);
// 	return { posts: data };
// };

class Index extends Component {
	constructor(props) {
		super(props);
		console.log('Index::constructor()');
	}

	static async getInitialProps() {
		console.log('Index::getInitialProps()');
		const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
		const { data } = res;
		// console.log('data[0] ', res.data[0]);
		return { posts: data };
	}

	render() {
		console.log('Index::render()');
		return (
			<div>
				<h1>Index page (2)</h1>
				<ul>
					{this.props.posts.map(post => (
						<li key={post.id}>
							<Link href={`/post?id=${post.id}`} as={`/p/${post.id}`}><a>{post.title}</a></Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
} 

export default Index;
