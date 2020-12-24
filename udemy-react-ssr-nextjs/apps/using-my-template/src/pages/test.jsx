
import React from 'react';

import MainLayout from '../components/MainLayout';

const Test = () => {
	console.log('Test');
	return (
		<MainLayout>
			<h1>This is the home page</h1>
			<p>
				To test the CORS route, open the console in a new tab on a different
				domain and make a POST / GET / OPTIONS request to 
				{' '}
				<b>/api/cors</b>
				. Using
				a different method from those mentioned will be blocked by CORS
			</p>
		</MainLayout>
	);
};

export default Test;
