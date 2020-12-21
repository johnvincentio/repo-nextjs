---

meta-title: "Markdown Spell Checking | John Vincent"
meta-description: "Spell Checking Markdown Documents"
meta-keywords: "markdown, spelling"

title: "Spell Checking Markdown Documents"
subtitle: ""
lead: ""

category: [Markdown, Jekyll, Spelling]
permalink: /website/markdown-spell-checking/
---

Discussion about spell checking Markdown documents.

<!-- end -->

## Markdown Spell Checker

I chose to use this [Markdown Spell Checker](https://www.npmjs.com/package/markdown-spellcheck)

```
npm i markdown-spellcheck --save-dev
```

Although `markdown-spellcheck` has  the ability to parse out files in a file system, I found it to be very cumbersome.

Thus I built a script `md-spell-checker` in the root directory of the project.

```
#!/bin/sh
#
# script to spell check markdown files
#
PARAM="$1"
#
if [ -z "$PARAM" ]; then
	echo "Spell Checker for all Markdown Files"
	for FILE in `find . \( -path ./node_modules -o -path ./destination -o -path ./Not-in-use \) -prune -o -name '*.md' -print`
	do
		echo "Spell Checking Markdown file $FILE"
		./node_modules/markdown-spellcheck/bin/mdspell -r -n -a --en-us $FILE
		echo "Completed Spell Checking Markdown file $FILE"
		echo " "
	done
else
	echo "Spell Checking Markdown file $PARAM"
	./node_modules/markdown-spellcheck/bin/mdspell -r -n -a --en-us $PARAM
fi
```

Notice the code to ignore directories I do not wish to spell check. Modify for your own needs.

To spell check only one file

```
./md-spell-checker {your-file}
```

Added to `package.json`

```
"scripts": {
	"spelling": "./md-spell-checker"
},
```

Add words to be considered valid by adding them, one word per line, to `.spelling`.


To spell check all markdown files

```
npm run spelling
```

