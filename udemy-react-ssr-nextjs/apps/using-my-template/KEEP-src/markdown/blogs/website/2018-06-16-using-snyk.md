---
meta-title: "Using Snyk | John Vincent"
meta-description: "John Vincent's discussion on Using Snyk"
meta-keywords: "Snyk, Vulnerabilities"

title: "Using Snyk"
subtitle: "Track and Remove Vulnerabilities"
lead: ""

category: [Snyk, Vulnerabilities]
permalink: /website/using-snyk/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Snyk

[Snyk](https://snyk.io/)

I use `login with github`

## Add projects

From the dashboard, Add more projects (button at bottom)

Select all public facing repositories

Note that a manifest file is required. See [Languages Supported](https://support.snyk.io/getting-started/languages-support) for details.

For my projects, the important files are

* npm - `package.json`
* RubyGems - `Gemfile.lock`
* Gradle - `build.gradle`


## Settings

From the dashboard

* Settings (top nav)
* Usage

Projects

* Delete any project not in use
* Change to Test Weekly for less important projects.

Free service has a limit of 200 tests a month on private repositories.

## In Use

To practice using the tool, let's fix a problem.

Select Projects (top nav)

### Problem with project Feediator

`package.json` has 1 low severity problem.

`View report and fix` goes a page showing details of the problem.

```
Prototype Pollution
Vulnerable module: hoek
Introduced through: jsonwebtoken@7.4.3

Introduced through: feediator@1.0.0 › jsonwebtoken@7.4.3 › joi@6.10.1 › topo@1.1.0 › hoek@2.16.3
Remediation: Upgrade to jsonwebtoken@8.0.0.
```

There is an example of code that will break the module.

`Fix this vulnerability` goes to a page to `Open a fix PR`

`Prototype Pollution in hoek` goes to a page providing more details. Notice it lists the vulnerable versions.

```
Affecting hoek package, versions <4.2.1 || >=5.0.0 <5.0.3
```

Notice the remediation

```
Upgrade hoek to versions 4.2.1, 5.0.3 or higher.
```

### Study

Let's verify the finding.

`package.json` does not reference `Hoek`

`package-lock.json` has many references to `Hoek`. Most versions referenced are good but `jsonwebtoken @7.4.3` references `hoek @2.16.3`. This confirms the finding.

Now let's check [jsonwebtoken at NPM](https://www.npmjs.com/package/jsonwebtoken)

Versions shows 8.3.0 is the latest. As it happens, I have another project running 8.2.0 which is vulnerability free.

### Fix

Change `package.json` to 

```
"jsonwebtoken": "^8.2.0",
```

Let's verify the change

```
npm outdated
```

To ensure the only package that changes is the package I changed, I prefer to do the following

```
rm -rf node_modules
npm install
```

Let's verify the change

```
npm outdated
```

Check `package-lock.json` to ensure correct module usage.


### Verify

Projects

Note the Feediator project.

Snyk appears to update automatically. The vulnerability has been resolved.












