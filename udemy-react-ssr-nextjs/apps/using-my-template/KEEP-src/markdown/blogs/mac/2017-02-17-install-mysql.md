---
meta-title: "Install MySQL on Mac | John Vincent"
meta-description: "John Vincent's discussion on Install MySQL on Mac"
meta-keywords: "MySQL"

title: "Install MySQL on Mac"
subtitle: ""
lead: ""

category: [Mac, MySQL]
permalink: /mac/install-mysql/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Install and Configure MySQL

[MySQL Community Downloads](https://dev.mysql.com/downloads/mysql/)

Select: macOS 10.15 (x86, 64-bit), DMG Archive

Download and install.

Installer installed MySQL into `/usr/local`

`mysql-8.0.19-osx10.7-x86_64/` symbolic link to `mysql`.

MySQL is installed to:

* Base directory: `/usr/local/mysql`
* Data directory: `/usr/local/mysql/data`

## MySQL Useful Commands

Is MySQL running

```
ps -ef | grep -i mysqld
```

Start MySQL

```
sudo /usr/local/mysql/support-files/mysql.server start
```

Restart MySQL

```
sudo /usr/local/mysql/support-files/mysql.server restart
```

Stop MySQL

```
sudo /usr/local/mysql/support-files/mysql.server stop
```

## Using System Preferences

* System Preferences
	* MySQL (near the bottom)

If you get `could not load mysql preference pane`, you need to install a newer version of MySQL.

Can manage MySQL installation and configuration.

## MySQL Workbench

[MySQL Workbench](https://www.mysql.com/products/workbench/)

[Download](https://dev.mysql.com/downloads/workbench/)

Download: `macOS (x86, 64-bit), DMG Archive`

Install

## Some MySQL Errors

` Error! MySQL server PID file could not be found`

as root

```
sudo -s
cd /usr/local/mysql/data
rm mysqld.local.pid
```

`kill -9` the pid of MySQL daemon if it is running.

May get `ERROR! The server quit without updating PID file`

```
cd /usr/local/mysql/data
rm mysqld.local.pid mysqld.local.err
```

edit `mysqld.local.pid`, insert one blank line

Try to start the MySQL server.

### El Capitan Upgrade - MySQL Fails on Startup

```
cd /usr/local/mysql
chown -R _mysql data/
```

### MySQL running on 3307 instead of 3306

edit `/Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist`

change `port=3307` to `port=3306`

Restart MySQL Server

### MySQL System Preferences problems

* Apple
* System Preferences
	* MySQL

try starting the daemon manually

```
sudo launchctl start com.mysql.mysql
```

or stopping the daemon manually

```
sudo launchctl stop com.mysql.mysql
```

## MySQL Connection

[Connector/J 8.0.19](https://dev.mysql.com/downloads/connector/j/)

OS: Platform independent

Select: `mysql-connector-java-8.0.19.zip`

Download

### Usage

Add `mysql-connector-java-8.0.19.jar` to the classpath

JDBC driver manager `com.mysql.jdbc.Driver` implements `java.sql.Driver`
