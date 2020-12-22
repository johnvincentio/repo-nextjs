---
meta-title: "Install Sass on Mac | John Vincent"
meta-description: "John Vincent's discussion on Install Sass on Mac"
meta-keywords: "Sass"

title: "Install Sass on Mac"
subtitle: ""
lead: ""

category: [Mac, Sass]
permalink: /mac/install-sass/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Sass

[Sass](http://sass-lang.com/)

## Installation

This is complicated by the need for Jekyll to handle auto compile of sass files.

Without this requirement the task is easy

```
sudo npm install -g sass
```

[Sass Install](http://sass-lang.com/install/) describes others ways to install Sass.

I installed a long time ago and so I used a technique I doubt I would use today.

## Install Sass using Ruby

Install ruby

```
brew update
brew install ruby
```

Check version

```
ruby -v
```

Install Sass

```
sudo gem install sass
```

Check version

```
sass -v
```

## Update Sass

```
sudo gem update sass
```

## Uninstall Sass

List gems

```
gem list
```

```
sudo gem uninstall sass-listen
sudo gem uninstall sass
```

## Use Sass Compiler

I have a convention of creating folders `scss` and `css`

Create file `sass-compiler`

```
sass --watch scss:css --line-numbers --style expanded
```

Any changes to `scss` files will be automatically compiled into `css` files.