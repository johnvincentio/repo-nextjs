---
meta-title: "Deploy SpringBoot Application to Heroku | John Vincent"
meta-description: "John Vincent's discussion on Deploy SpringBoot Application to Heroku"
meta-keywords: "Java Heroku"

title: "Create SpringBoot App and Deploy to Heroku"
subtitle: ""
lead: ""

category: [Java, Heroku]
permalink: /java/deploy-springboot-heroku/
---

This document discusses how to create a very basic SpringBoot application and how to deploy it to Heroku.

<!-- end -->

# Introduction

SpringBoot, Eclipse, Maven and Heroku do not play nice and so I created a structured methodology.

* [Create SpringBoot App](/java/deploy-springboot-heroku/#create-springboot-app)

* [Deploy SpringBoot App to Heroku](/java/deploy-springboot-heroku/#deploy-to-heroku)

* [Future Development Cycle](/java/deploy-springboot-heroku/#development-cycle)

Other topics include

* [Deploy SpringBoot App to Heroku via Procfile](/java/deploy-springboot-heroku/#procfile)

* [Other](/java/deploy-springboot-heroku/#other)


<a name="create-springboot-app"></a>

# Create SpringBoot App

Create github repository `myproject-eclipse`

Github repository: `git@github.com:johnvincentio/myproject-eclipse.git`

## Local Development

Create local project

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku
create-repo myproject-eclipse
```

Project directory

```
/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse
```

### Create SpringBoot App

[Spring Initializr](https://start.spring.io/)

* Group: io.johnvincent
* Artifact: myproject
* Packaging: Jar
* Java: 8

* Dependency: Spring Web

Downloads a zip file to `/Users/jv/Downloads`

Unzip the file.

Copy `myproject` to `/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse`

### Import into Eclipse

Start Eclipse-jee from `/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse`

Open Eclipse at `myproject`

* File, Import
* Maven, Existing Maven Projects

Maven Projects

* Root directory: `/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse`

Select Finish

Maven Project is Imported.

### Code

`MyprojectApplication.java`

```
package io.johnvincent.myproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.*;

@Controller
@SpringBootApplication
public class MyprojectApplication {

    @RequestMapping("/")
    @ResponseBody
    String home() {
      return "Hello World!";
    }

	public static void main(String[] args) {
		SpringApplication.run(MyprojectApplication.class, args);
	}

}
```

`application.properties`

```
server.port=9517
```

Commit to repo

```
git add .
git commit -m "init"
git push
```

### Execute

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse/myproject

./mvnw spring-boot:run
```

### Test

```
http://localhost:9517
```

### Create-package script

```
cd /Users/jv/Desktop/MyDevelopment/github/projects/springboot-heroku/springboot-heroku
```

`create-package`

```
#!/bin/sh
#
# script to create Jar
#
#
echo "Maven clean and make the package"
./mvnw clean package

echo "Save Jar"
cp target/myproject-0.0.1-SNAPSHOT.jar ../myproject.jar

echo "Completed"
```

### Build Jar file

```
/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse/myproject

./create-package
```

### Execute Jar file

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse

java -jar myproject.jar
```

### Test

```
http://localhost:9517
```



<a name="deploy-to-heroku"></a>

# Deploy SpringBoot App to Heroku

Github repository name: `myproject-eclipse`

Github repository: `git@github.com:johnvincentio/myproject-eclipse.git`

SpringBoot Project directory

```
/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse
```

Heroku Project directory

```
/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-heroku
```

## Create Local Development

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject

mkdir myproject-heroku
```

Create local git repository

```
cd myproject-heroku
git init
git add README.md
git commit -m "initial"
```

## Heroku Login

Login to Heroku

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-heroku

heroku login
```

## Create Heroku App

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-heroku

heroku create johnvincentio-myproject
```

```
https://johnvincentio-myproject.herokuapp.com/ | https://git.heroku.com/johnvincentio-myproject.git
```

* Application url: `https://johnvincentio-myproject.herokuapp.com/`
* Heroku git repository: `https://git.heroku.com/johnvincentio-myproject.git`

### Check Git

```
git remote -v
```

shows

```
heroku	https://git.heroku.com/johnvincentio-myproject.git (fetch)
heroku	https://git.heroku.com/johnvincentio-myproject.git (push)
```

## Script to copy SpringBoot App

Create script `/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse/myproject/create-heroku-package`

```
#!/bin/sh
#
# script to create Heroku ready SpringBoot app
#
HEROKU_DIR="/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-heroku"
CURR_DIR=`pwd`
#
echo " "
echo "Script to copy SpringBoot app files to Heroku project"
echo " "
echo "Current directory: $CURR_DIR"
echo " Heroku directory: $HEROKU_DIR"
echo " "
#
echo "Maven clean and make the package"
./mvnw clean package
#
echo "Copying SpringBoot app files"
cp -r src $HEROKU_DIR
cp -r target $HEROKU_DIR
cp pom.xml $HEROKU_DIR
cp mvnw $HEROKU_DIR
#
echo " "
echo "Completed"
```

## Copy SpringBoot App

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse/myproject

./create-heroku-package
```

### Add to repository

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse/myproject

git add .
git commit -m "myproject code"
```

## Deploy the Code

```
/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-heroku

git push heroku master
```

## Test

`https://johnvincentio-myproject.herokuapp.com/`



<a name="development-cycle"></a>

# Future Development Cycle

* Make code changes and test
* Copy code to Heroku

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse/myproject

./create-heroku-package
```

* Commit to git

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-heroku

git add .
git commit -m "updates"
```

* Update Heroku

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-heroku

git push heroku master
```

* Test with `https://johnvincentio-myproject.herokuapp.com/`



<a name="procfile"></a>

# Deploy SpringBoot App to Heroku via Procfile

Github repository name: `myproject-eclipse`

Github repository: `git@github.com:johnvincentio/myproject-eclipse.git`

SpringBoot Project directory

```
/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse
```

Heroku Project directory

```
/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-heroku
```

Heroku Procfile Project directory

```
/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-procfile
```

## Create Local Development

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject

mkdir myproject-procfile
```

Create local git repository

```
cd myproject-procfile

git init
git add README.md
git commit -m "initial"
```

## Heroku Login

Login to Heroku

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-procfile

heroku login
```

## Create Heroku App

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-procfile

heroku create johnvincentio-procfile
```

```
https://johnvincentio-procfile.herokuapp.com/ | https://git.heroku.com/johnvincentio-procfile.git
```

* Application url: `https://johnvincentio-procfile.herokuapp.com/`
* Heroku git repository: `https://git.heroku.com/johnvincentio-procfile.git`

### Check Git

```
git remote -v
```

shows

```
heroku	https://git.heroku.com/johnvincentio-procfile.git (fetch)
heroku	https://git.heroku.com/johnvincentio-procfile.git (push)
```

## Copy SpringBoot App

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-eclipse

cp myproject.jar /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-procfile
```

## Create Procfile

`/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-procfile/Procfile`

```
web: java -jar myproject.jar
```

### Add to repository

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-procfile

git add .
git commit -m "myproject code"
```

## Deploy the Code

```
/Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-procfile

git push heroku master
```

Produces error

```
remote: Building source:
remote: 
remote:  !     No default language could be detected for this app.
remote: 			HINT: This occurs when Heroku cannot detect the buildpack to use for this application automatically.
remote: 			See https://devcenter.heroku.com/articles/buildpacks
remote: 
remote:  !     Push failed
remote: Verifying deploy...
remote: 
remote: !	Push rejected to johnvincentio-procfile.
remote: 
To https://git.heroku.com/johnvincentio-procfile.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'https://git.heroku.com/johnvincentio-procfile.git'
```

Heroku does not know how to build the app. It has not picked up `Procfile`

This apparently should work but it doesn't. I do not know how to proceed from here.


<a name="other"></a>

# Other

If on deployment to Heroku you get this error

```
remote:  !     No default language could be detected for this app.
remote: 			HINT: This occurs when Heroku cannot detect the buildpack to use for this application automatically.
remote: 			See https://devcenter.heroku.com/articles/buildpacks
```

check that `pom.xml` is in the root directory.

## Buildpacks

Not needed for this application but lets describe here.

See `https://devcenter.heroku.com/articles/buildpacks`

Add Java Buildpack

```
cd /Users/jv/Desktop/MyDevelopment/github/projects-heroku/myproject/myproject-heroku

heroku buildpacks:set heroku/java
```

Remove Java Buildpack

```
heroku buildpacks:remove heroku/java
```
