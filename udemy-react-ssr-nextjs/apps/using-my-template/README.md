
https://tvshow-pro.now.sh/us

https://iwallet-api.herokuapp.com/api/auth/signin

{
	"email": "bo@email",
	"password": "bo"
}


# Debugger

See [Debugging Next.js](https://www.johnvincent.io/visual-studio-code/)


# NextJs

[TVMaze](https://www.tvmaze.com/api)

```
http://api.tvmaze.com/schedule/web?date=2020-05-29&country=US
```

Can also use

```
npx create-next-app tvshow-pro
```





# Course Notes

My course was launched on Jan 2020, but Next.js team already made an update on their API which might affect you if you install the latest Next.js version.

Since version 9.3, Next.js now comes with a couple new methods to be used when fetching data for a page. So now, instead of only getInitialProps, we have:

* getStaticProps
* getServerSideProps (which is equivalent of getInitialProps for us)

I'd like to reinforce that getInitialProps is still compatible with the latest version.

However, if you would like to follow the documentation and start using getServerSideProps instead you are more than welcome to do it. But remember: you will need to stick with that till the end. Mixing the 2 methods won't work.





# General Doc

[Nextjs](https://nextjs.org/)

```
https://nextjs.org/docs/faq
https://nextjs.org/docs/basic-features/data-fetching
https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
https://nextjs.org/docs/basic-features/image-optimization
https://nextjs.org/docs/api-reference/next/image
https://nextjs.org/docs/routing/introduction
https://nextjs.org/docs/routing/dynamic-routes
https://nextjs.org/docs/api-reference/next/router
https://nextjs.org/docs/advanced-features/custom-app
https://nextjs.org/learn/basics/data-fetching
```

```
https://jfelix.info/blog/how-to-make-a-static-blog-with-next-js
```

## pwa example:

```
https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app
```

[How to Make a Markdown Blog With Next.js](https://jfelix.info/blog/how-to-make-a-static-blog-with-next-js)

## Other
		
```
https://frontaid.io/blog/using-nextjs-with-json-file/
https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticprops
https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths
```
