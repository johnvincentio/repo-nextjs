---
meta-title: "TaskMuncher Performance | John Vincent"
meta-description: "John Vincent's TaskMuncher Performance"
meta-keywords: "Taskmuncher, React, Webpack, Code splitting, Caching"

title: "TaskMuncher Performance"
subtitle: ""
lead: ""

category: [Taskmuncher, React, Webpack, Code splitting, Caching]
permalink: /taskmuncher/taskmuncher-performance/
---

Let's discuss TaskMuncher performance after the upgrade to Webpack 4, Babel 7 and Material-UI 3

<!-- end -->

# TaskMuncher V2 Performance

For extensive discussions regarding TaskMuncher, please see [TaskMuncher Overview](/taskmuncher/overview/)

For discussion regarding TaskMuncher V2 development work, see [Update TaskMuncher to Webpack v4, Babel v7, Material-UI v3](/taskmuncher/update-taskmuncher-v2/)

Also helpful is [Optimizing TaskMuncher](/taskmuncher/optimize-taskmuncher/)

## TaskMuncher V2 Testing

* Chrome, initial load
	* Home page = 1 sec
	* Login < 0.25 sec
	* Calendar < 0.1 sec
* Chrome, subsequent invocations are instantaneous as files are retrieved from browser cache.

* Mobile, initial load
	* Home page = 1-2 secs
	* Login = 1-2 secs
	* Calendar = 1 sec
* Mobile, subsequent invocations are instantaneous.

## TaskMuncher V2 Validation

[Website Validation Reference](/website/website-validation/)

[TaskMuncher V1 Website Validation](/taskmuncher/deploy/website-validation/)

### Lighthouse

TaskMuncher V2

```
94: Performance
62: Progressive Web App
92: Accessibility
100: Best Practices
100: SEO
```

TaskMuncher V1

```
21: Performance
35: Progressive Web App
92: Accessibility
100: Best Practices
100: SEO
```

There is clearly a huge improvement in the performance of TaskMuncher V2. 

## TaskMuncher V1

TaskMuncher V1 was based on webpack 3. The production build yielded

```
main.bundle.css  568 bytes       0  [emitted]         main
./index.html    3.64 kB          [emitted]         
bundle.js    16.1 MB       0  [emitted]  [big]  main
```

From a browser, the home page `www.taskmuncher.com` showed these files being retrieved

```
main.bundle.css  568 bytes 
download  size 557 bytes

bundle.js    16.1 MB
download  size 3.8MB
```

The files downloaded are much smaller than the files built by webpack. This is due to Nginx gzipping the files prior to download. For details, see [Configure HTTPS Nginx](/taskmuncher/deploy/configure-https-nginx/)

### Problems

* `bundle.js` is huge (3.8MB). Requires code splitting.
* not practical over a mobile phone network. In effect, TaskMuncher V1 was not a practical mobile application.
* `bundle.js` contains application and vendor code.
	* vendor code is huge and will change infrequently.
	* application code changes frequently and will require a complete download.
* browsers may not get the latest version `bundle.js`. Requires cache busting.

The solution to these problems is to use code splitting and cache busting from webpack 4.

## TaskMuncher V2

TaskMuncher V2 was based on webpack 4. The production build yielded

```
                               index.html   4.34 KiB          [emitted]         
                           assets/icons.svg     35 KiB          [emitted]         
                 1.517e739f69feee06f636.css  575 bytes       1  [emitted]         main
        main.aaaecfc7d23a48393dab.bundle.js   46.8 KiB       1  [emitted]         main
           2.f116dd20719ffd3e2155.bundle.js    106 KiB       2  [emitted]         
           3.d09078d544e366ed7cca.bundle.js    226 KiB       3  [emitted]         
           4.1b29a07a15585ced160e.bundle.js   26.2 KiB       4  [emitted]         
      vendor.348028e469699b4c4e1b.bundle.js    315 KiB       5  [emitted]  [big]  vendor
           6.a6bdfe9669738b9b5d7f.bundle.js    762 KiB       6  [emitted]  [big]  
           7.ed6c0809ef4814f13341.bundle.js    257 KiB       7  [emitted]  [big]  
    manifest.87a618c1f83c717e6bdd.bundle.js    4.4 KiB       8  [emitted]         manifest
       0.66b1ba767846fb68f215.bundle.js.map  450 bytes       0  [emitted]         
             1.517e739f69feee06f636.css.map  832 bytes       1  [emitted]         main
    main.aaaecfc7d23a48393dab.bundle.js.map  154 bytes       1  [emitted]         main
       2.f116dd20719ffd3e2155.bundle.js.map  163 bytes       2  [emitted]         
       3.d09078d544e366ed7cca.bundle.js.map  153 bytes       3  [emitted]         
       4.1b29a07a15585ced160e.bundle.js.map  159 bytes       4  [emitted]         
  vendor.348028e469699b4c4e1b.bundle.js.map  630 bytes       5  [emitted]         vendor
       6.a6bdfe9669738b9b5d7f.bundle.js.map  442 bytes       6  [emitted]         
       7.ed6c0809ef4814f13341.bundle.js.map  154 bytes       7  [emitted]         
manifest.87a618c1f83c717e6bdd.bundle.js.map  139 bytes       8  [emitted]         manifest
           0.66b1ba767846fb68f215.bundle.js    430 KiB       0  [emitted]  [big]  
                    images/john-vincent.jpg   22.7 KiB          [emitted]         
                     images/taskmuncher.png   71.2 KiB          [emitted]         
                            images/home.jpg    112 KiB          [emitted]         
                                sitemap.xml   1.03 KiB          [emitted]         
                google9104b904281bf3a3.html   53 bytes          [emitted]         
                                 robots.txt   63 bytes          [emitted]         
                 android-chrome-192x192.png   3.19 KiB          [emitted]         
                 android-chrome-512x512.png   7.69 KiB          [emitted]         
                       apple-touch-icon.png   3.11 KiB          [emitted]         
                          browserconfig.xml  246 bytes          [emitted]         
                          favicon-16x16.png  866 bytes          [emitted]         
                          favicon-32x32.png   1.25 KiB          [emitted]         
                                favicon.ico   14.7 KiB          [emitted]         
                         mstile-144x144.png   3.19 KiB          [emitted]         
                         mstile-150x150.png   3.21 KiB          [emitted]         
                         mstile-310x150.png   3.34 KiB          [emitted]         
                         mstile-310x310.png   5.63 KiB          [emitted]         
                           mstile-70x70.png   2.45 KiB          [emitted]         
                      safari-pinned-tab.svg   3.13 KiB          [emitted]         
                           site.webmanifest  505 bytes          [emitted]         
Entrypoint main [big] = manifest.87a618c1f83c717e6bdd.bundle.js manifest.87a618c1f83c717e6bdd.bundle.js.map vendor.348028e469699b4c4e1b.bundle.js vendor.348028e469699b4c4e1b.bundle.js.map 1.517e739f69feee06f636.css main.aaaecfc7d23a48393dab.bundle.js 1.517e739f69feee06f636.css.map main.aaaecfc7d23a48393dab.bundle.js.map


WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  0.66b1ba767846fb68f215.bundle.js (430 KiB)
  vendor.348028e469699b4c4e1b.bundle.js (315 KiB)
  6.a6bdfe9669738b9b5d7f.bundle.js (762 KiB)
  7.ed6c0809ef4814f13341.bundle.js (257 KiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  main (367 KiB)
      manifest.87a618c1f83c717e6bdd.bundle.js
      vendor.348028e469699b4c4e1b.bundle.js
      1.517e739f69feee06f636.css
      main.aaaecfc7d23a48393dab.bundle.js
```

### TaskMuncher V2 Testing

From a browser, the home page `www.taskmuncher.com` showed these files being retrieved

```
1.517e739f69feee06f636.css  575 bytes
download size=485B

main.aaaecfc7d23a48393dab.bundle.js   46.8 KiB 
download size=7.9kb

vendor.348028e469699b4c4e1b.bundle.js 315 KiB
download size=78.7kb

manifest.87a618c1f83c717e6bdd.bundle.js    4.4 KiB 
download size=1.8kb

0.66b1ba767846fb68f215.bundle.js    430 KiB
download size=84.7kb

2.f116dd20719ffd3e2155.bundle.js    106 KiB 
download size=18.3kb
```

which is a vast improvement from TaskMuncher V1.

From a browser, the member section showed these files being retrieved

```
6.a6bdfe9669738b9b5d7f.bundle.js    762 KiB
download size=184kb

3.d09078d544e366ed7cca.bundle.js    226 KiB
download size=30.5kb
```

From a browser, the calendar section showed these files being retrieved

```
7.ed6c0809ef4814f13341.bundle.js 257Kib
download size=51.7kb

4.1b29a07a15585ced160e.bundle.js   26.2 KiB
download size=5.4kb
```

Note the files downloaded are much smaller than the files built by webpack. This is due to Nginx gzipping the files prior to download. For details, see [Configure HTTPS Nginx](/taskmuncher/deploy/configure-https-nginx/)

This is clearly vastly superior to TaskMuncher V1.

### TaskMuncher V2 Caching

Verified that bundles are retrieved from cache.


Altered `HomeMain.jsx`. Verify build and caching.

```
                             index.html   4.34 KiB          [emitted]         
             1.517e739f69feee06f636.css  575 bytes       1  [emitted]         main
    main.aaaecfc7d23a48393dab.bundle.js   46.8 KiB       1  [emitted]         main
       2.fdcb27244d44b2f4774e.bundle.js    106 KiB       2  [emitted]         
       3.d09078d544e366ed7cca.bundle.js    226 KiB       3  [emitted]         
       4.1b29a07a15585ced160e.bundle.js   26.2 KiB       4  [emitted]         
  vendor.348028e469699b4c4e1b.bundle.js    315 KiB       5  [emitted]  [big]  vendor
       6.a6bdfe9669738b9b5d7f.bundle.js    762 KiB       6  [emitted]  [big]  
       7.ed6c0809ef4814f13341.bundle.js    257 KiB       7  [emitted]  [big]  
manifest.9f2630ebad2f2d63e667.bundle.js    4.4 KiB       8  [emitted]         manifest
       0.66b1ba767846fb68f215.bundle.js    430 KiB       0  [emitted]  [big]  
      
Entrypoint main [big] = manifest.9f2630ebad2f2d63e667.bundle.js manifest.9f2630ebad2f2d63e667.bundle.js.map vendor.348028e469699b4c4e1b.bundle.js vendor.348028e469699b4c4e1b.bundle.js.map 1.517e739f69feee06f636.css main.aaaecfc7d23a48393dab.bundle.js 1.517e739f69feee06f636.css.map main.aaaecfc7d23a48393dab.bundle.js.map

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  0.66b1ba767846fb68f215.bundle.js (430 KiB)
  vendor.348028e469699b4c4e1b.bundle.js (315 KiB)
  6.a6bdfe9669738b9b5d7f.bundle.js (762 KiB)
  7.ed6c0809ef4814f13341.bundle.js (257 KiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  main (367 KiB)
      manifest.9f2630ebad2f2d63e667.bundle.js
      vendor.348028e469699b4c4e1b.bundle.js
      1.517e739f69feee06f636.css
      main.aaaecfc7d23a48393dab.bundle.js
```

manifest has changed from `manifest.87a618c1f83c717e6bdd.bundle.js` to `manifest.9f2630ebad2f2d63e667.bundle.js`

2 has changed from `2.f116dd20719ffd3e2155.bundle.js` to `2.fdcb27244d44b2f4774e.bundle.js`

Tested in the browser. Both of these files are retrieved from the server. The remainder are retrieved from browser cache.

### Changed routes/index.jsx

This component is used throughout the application.

```
                             index.html   4.34 KiB          [emitted]         
             1.517e739f69feee06f636.css  575 bytes       1  [emitted]         main
    main.2a40244bff43ecd10b7f.bundle.js   46.5 KiB       1  [emitted]         main
       2.f116dd20719ffd3e2155.bundle.js    106 KiB       2  [emitted]         
       3.d09078d544e366ed7cca.bundle.js    226 KiB       3  [emitted]         
       4.1b29a07a15585ced160e.bundle.js   26.2 KiB       4  [emitted]         
  vendor.348028e469699b4c4e1b.bundle.js    315 KiB       5  [emitted]  [big]  vendor
       6.a6bdfe9669738b9b5d7f.bundle.js    762 KiB       6  [emitted]  [big]  
       7.ed6c0809ef4814f13341.bundle.js    257 KiB       7  [emitted]  [big]  
manifest.87a618c1f83c717e6bdd.bundle.js    4.4 KiB       8  [emitted]         manifest
       0.66b1ba767846fb68f215.bundle.js    430 KiB       0  [emitted]  [big]  
       
Entrypoint main [big] = manifest.87a618c1f83c717e6bdd.bundle.js manifest.87a618c1f83c717e6bdd.bundle.js.map vendor.348028e469699b4c4e1b.bundle.js vendor.348028e469699b4c4e1b.bundle.js.map 1.517e739f69feee06f636.css main.2a40244bff43ecd10b7f.bundle.js 1.517e739f69feee06f636.css.map main.2a40244bff43ecd10b7f.bundle.js.map


WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  0.66b1ba767846fb68f215.bundle.js (430 KiB)
  vendor.348028e469699b4c4e1b.bundle.js (315 KiB)
  6.a6bdfe9669738b9b5d7f.bundle.js (762 KiB)
  7.ed6c0809ef4814f13341.bundle.js (257 KiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  main (367 KiB)
      manifest.87a618c1f83c717e6bdd.bundle.js
      vendor.348028e469699b4c4e1b.bundle.js
      1.517e739f69feee06f636.css
      main.2a40244bff43ecd10b7f.bundle.js
```

Files main and manifest changed.

Tested in the browser. Both of these files are retrieved from the server. The remainder were retrieved from browser cache.



