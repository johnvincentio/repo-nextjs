---
meta-title: "Create Java Executable | John Vincent"
meta-description: "John Vincent's discussion on Create Java Executable"
meta-keywords: "Java"

title: "Create Java Executable"
subtitle: ""
lead: ""

category: [Java]
permalink: /java/create-java-executable/
---

This document discusses how to Create a Java Executable for MacOS. This discussion will use the Gomoku project as a working example.

<!-- end -->

# Create a Java Executable

There are a number of approaches available. Let's start with some basics.

## Logging messages

Review the code, clean out all traces.

May want to review any log4j settings.

May require different log4j configuration files.

### Development

`src/main/resources/log/log4j.xml`

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">

<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/" debug="true">

	<appender name="consoleAppender" class="org.apache.log4j.ConsoleAppender">
		<layout class="org.apache.log4j.PatternLayout">
			<param name="ConversionPattern" value="%m%n" />
		</layout>
	</appender>

	<appender name="fileAppender" class="org.apache.log4j.FileAppender">
		<param name="File" value="/tmp/gomoku.log" />
		<param name="Append" value="true" />
		<layout class="org.apache.log4j.PatternLayout">
			<param name="ConversionPattern" value="[%d{ISO8601}] [%t] %p - %m%n" />
		</layout>
	</appender>

	<root>
		<priority value="info" />	<!-- off, info, debug, error -->
		<appender-ref ref="consoleAppender" />
		<appender-ref ref="fileAppender" />
	</root>

</log4j:configuration>
```

Also, copy standard `log4j.dtd` to `src/main/resources/log/log4j.dtd`

### Production

`Packaging/log/log4j-production.xml`

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">

<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/" debug="true">

	<appender name="consoleAppender" class="org.apache.log4j.ConsoleAppender">
		<layout class="org.apache.log4j.PatternLayout">
			<param name="ConversionPattern" value="%m%n" />
		</layout>
	</appender>

	<appender name="fileAppender" class="org.apache.log4j.FileAppender">
		<param name="Append" value="true" />
		<layout class="org.apache.log4j.PatternLayout">
			<param name="ConversionPattern" value="[%d{ISO8601}] [%t] %p - %m%n" />
		</layout>
	</appender>

	<root>
		<priority value="error" />	<!-- off, info, debug, error -->
		<appender-ref ref="consoleAppender" />
	</root>

</log4j:configuration>
```

## Running Gomoku from Eclipse

Ensure `src/main/resources/` is on the Build Path. Ensure `log/log4j.xml` is in `classes`. If not, then:

* Project, Clean

to rebuild.

## Running Gomoku from the Command Line

Create script `app.command`

```
#!/bin/sh
#
# script to run java app Gomoku
#
PARAMS="$*"
echo "PARAMS are $PARAMS"
#
DEV_HOME=/Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku
#
cd $DEV_HOME
#
MYCP=$DEV_HOME/classes:$DEV_HOME/Jars/log4j-1.2.13.jar
#
MY_FILE=$PARAMS
#
java -cp $MYCP -Xdock:name="Gomoku" io.johnvincent.gomoku.App $MY_FILE
#
```

Notice the classpath which is from where the `log4j.xml` file will be loaded.

## Log4J Configuration

This is a real pain so let's describe the configuration.

### Use an Absolute Path

This approach works fine for local development but is of no value for a distributable package.

Shown here for reference

```
public class App extends JFrame {

		static {
			init();
		}
		private static void init() {
			String log4jConfPath = System.getProperty("user.dir")+File.separator+"log4j.xml";
			System.out.println("log4jConfPath "+log4jConfPath);
			DOMConfigurator.configure(log4jConfPath);
		}
```

which will load `/Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku/log4j.xml`

### Load from the root of the Classpath

If use `src/main/resources/log4j.xml`, then this file will be loaded by Log4J on startup. This is the simplest configuration as no specialized code is needed to load `log4j.xml`

## Load from non-root of the Classpath

This is my preferred configuration as it allows for better separation of resource files.

To load `log4j.xml`

```
public class App extends JFrame {

		static {
			init();
		}
		private static void init() {
			URL url = App.class.getResource("/log/log4j.xml");
			DOMConfigurator.configure(url);
		}

or

		private static void init() {
			URL url = App.class.getClassLoader().getResource("log/log4j.xml");
			DOMConfigurator.configure(url);
		}
```

## Create Packaging files

Need a working directory `working`

* mkdir working
* Add `working` to `.gitignore`

The `pkg` file that will be created is too large for the repository.

* Add `Gomoku.pkg` to `.gitignore`

Create packaging source directory `Packaging`

* mkdir -p Packaging/src Packaging/output

Create manifest file `Packaging/src/manifest.mf`

```
Manifest-Version: 1.0
Class-path: .
Main-Class: io.johnvincent.gomoku.App
```

Copied `johnvincentio.png` icon from the main website. This icon is my corporate identity.

```
cp {absolute path} Packaging/src/johnvincentio.png
```

## Create Packaging Script

Create script `create-package`

```
#!/bin/sh
#
# script to create Gomoku package
#
createJar() (
	echo;
	echo "Creating executable Jar $EXECUTABLE_JAR";
	echo;

	#
	# Copy base files
	#
	echo "Copy base files";
	cp $CUR_DIR/Packaging/src/manifest.mf $JAR_WORK_FILES_DIR;
	
	#
	echo "Copy class files";
	cp -R $CUR_DIR/classes/* $JAR_WORK_FILES_DIR;
	
	#
	# Copy log4j files last as they must overwrite classes
	#
	echo "Copy log4j files";
	cp $CUR_DIR/Packaging/log/log4j-production.xml $JAR_WORK_FILES_DIR/log/log4j.xml;
	
	#
	# Handle referenced Jar files
	#
	(cd $JAR_WORK_FILES_DIR && exec jar xf $CUR_DIR/Jars/log4j-1.2.13.jar);
	
	#
	# clean working directory
	#
	echo;
	echo "Cleaning working directory $JAR_WORK_FILES_DIR";
	(cd $JAR_WORK_FILES_DIR && exec find . -name '.DS_Store' -type f -delete);
	
	#
	# Create an executable Jar
	#
	echo;
	echo "Creating Executable Jar $EXECUTABLE_JAR";
	(cd $JAR_WORK_FILES_DIR && exec jar cmf manifest.mf $EXECUTABLE_JAR .);
)

createImages() (
	echo;
	echo "Creating images in $MACOSX_PACKAGE_FILES_DIR";
	echo;

	#
	# Create Installer background
	#
	echo;
	echo "Creating Installer background in $WORK_IMAGES_DIR";
	sips -z 100 100 -p 150 150 $MACOSX_PACKAGE_FILES_DIR/johnvincentio.png --out $MACOSX_PACKAGE_FILES_DIR/johnvincentio-background.png;
)

createIcons() (
	echo;
	echo "Creating icons in $MACOSX_PACKAGE_FILES_DIR";
	echo;

	#
	# Create Application icon
	#
	echo;
	echo "Creating Application icon in $WORK_DIR/$APP_NAME.iconset";
	
	mkdir $WORK_DIR/$APP_NAME.iconset;
	
	sips -z 128 128 $MACOSX_PACKAGE_FILES_DIR/johnvincentio.png --out $WORK_DIR/$APP_NAME.iconset/icon_128x128.png;
	
	echo;
	echo "Creating Application icon set in $WORK_ICONSET_DIR";
	iconutil --convert icns $WORK_DIR/$APP_NAME.iconset --output $MACOSX_PACKAGE_FILES_DIR/$APP_NAME.icns;
)

createApplication() (
	#
	# MacOS application and installer
	#
	echo;
	echo "Creating MacOS application and installer";
	echo

	javapackager -deploy \
		-vendor johnvincent.io \
		-description $APP_NAME \
		-name $APP_NAME \
		-appclass io.johnvincent.gomoku.App \
		-native pkg \
		-BappVersion=1.0.0 \
		-Bicon=$MACOSX_PACKAGE_FILES_DIR/$APP_NAME.icns \
		-srcdir $PACKAGE_WORK_FILES_DIR \
		-srcfiles $APP_NAME.jar \
		-outdir $WORK_DIR \
		-outfile $APP_NAME
)

CUR_DIR=`pwd`

APP_NAME=Gomoku

WORK_DIR=$CUR_DIR/working/$$
JAR_WORK_FILES_DIR=$WORK_DIR/jar_files

PACKAGE_WORK_FILES_DIR=$WORK_DIR/package_files
MACOSX_PACKAGE_FILES_DIR=$PACKAGE_WORK_FILES_DIR/package/macosx

EXECUTABLE_JAR=$PACKAGE_WORK_FILES_DIR/$APP_NAME.jar

echo
echo "Current directory: $CUR_DIR"
echo "Work directory: $WORK_DIR"
echo "Jar Files directory: $JAR_WORK_FILES_DIR"

# echo "Output directory: $WORK_OUTPUT_DIR"

#
# make directories
#
echo
echo "Creating work directories"
mkdir -p $JAR_WORK_FILES_DIR $MACOSX_PACKAGE_FILES_DIR

#
# create the executable Jar
#
createJar

#
# create images
#
echo
echo "Packaging Files directory: $PACKAGE_WORK_FILES_DIR"
echo "MacOSX directory: $MACOSX_PACKAGE_FILES_DIR"
echo

cp $CUR_DIR/Packaging/src/johnvincentio.png $MACOSX_PACKAGE_FILES_DIR

createImages

#
# create icons
#
createIcons

#
# Build MacOS application and installer
#
createApplication

#
# Copy application files
#
echo
echo "Copy $APP_NAME.jar"

cp $PACKAGE_WORK_FILES_DIR/$APP_NAME.jar $CUR_DIR/$APP_NAME.jar

echo
echo "Copy $APP_NAME.pkg"

cp $WORK_DIR/bundles/$APP_NAME-*.pkg $CUR_DIR/$APP_NAME.pkg

echo "Completed"
```

Set privileges

```
chmod 700 create-package
```

## Create Installer

```
./create-package
```

which creates

* Gomoku.jar
* Gomoku.pkg

### Execute the Jar

```
java -jar Gomoku.jar
```

### Install the Application

```
open Gomoku.pkg
```

## References

[Mac Java](https://centerkey.com/mac/java/)

[OS X Integration for Java](https://developer.apple.com/library/archive/documentation/Java/Conceptual/Java14Development/07-NativePlatformIntegration/NativePlatformIntegration.html)

[The Java Packager Tool](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/packager.html)

## Signing Applications for Gatekeeper on MacOS

[Signing Your Apps for Gatekeeper](https://developer.apple.com/developer-id/)

[Distribute outside the Mac App Store (macOS)](https://help.apple.com/xcode/mac/current/#/dev033e997ca)

[developer account](https://help.apple.com/xcode/mac/current/#/devbbdb0a993)

Get a developer account on [Apple Developer Website](https://developer.apple.com/account)

[Getting Started](https://developer.apple.com/account/#/welcome)

[How to use javapackager to build a MacOS application bundle](https://alvinalexander.com/java/how-use-javapackager-build-macos-application-bundle)

