//

import React from 'react';

import { MainLayout, SubpageHeader, createMetaData } from '../components';

import {
	BlogList, BlogPagination, BlogCategoriesWithCounts, BlogCategoriesWithBlogs,
} from '../components/blog';

import json from '../data/pages/blog.json';

const BlogTemplate = (props) => {
	// console.log('blog; props ', props);

	const { site, page, seo } = createMetaData(json);

	const { pageData } = props;

	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<div>
				<section id="blog">
					<div className="container">
						<div className="row">
							{/* <!-- List of Blogs --> */}
							<div className="col-lg-7 col-lg-offset-1 col-md-7 col-md-offset-1">
								<BlogList site={site} pageData={pageData} />
								<BlogPagination pageData={pageData} />
							</div>

							{/* <!-- Blog Sidebar Widgets Column --> */}
							<div className="col-md-4">
								<BlogCategoriesWithCounts pageData={pageData} />
								<BlogCategoriesWithBlogs pageData={pageData} />

								{/* <!-- Google Custom Search, Side Widget Well --> */}
								{/* <div className="well google-search"></div> */}
							</div>
						</div>
					</div>
				</section>
			</div>
		</MainLayout>
	);
};

export default BlogTemplate;
