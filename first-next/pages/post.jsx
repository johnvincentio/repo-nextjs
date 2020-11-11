
import React from 'react';
import axios from 'axios';

const Post = ({ id, comments }) => (
	<div>
		<h1>Comments for Post #{id} </h1>
		{comments.map(comment => (
			<Comment {...comment} key={comment.id} />
		))}
	</div>
);

const Comment = ({ email, body }) => (
	<div>
		<h5>{email}</h5>
		<p>{body}</p>
	</div>
);

Post.getInitialProps = async ({ query }) => {
	console.log('Post::getInitialProps()');
	// console.log('query ', query);
	const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${query.id}`);
	const { data } = res;
	// console.log('data[0] ', res.data[0]);
	// return { posts: data };
	return { ...query, comments: data };
}

export default Post;


/*
import React from 'react';
import { withRouter } from 'next/router';

const Post = props => (
	<h1>Post Page #{props.router.query.id} </h1>
);

Post.getInitialProps = async ({ query }) => {
	// console.log('query ', query);
	return query;
}

export default withRouter(Post);
*/
