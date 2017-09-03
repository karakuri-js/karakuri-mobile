#!/bin/sh
jsfiles=$(git diff --cached --name-only --diff-filter=ACM | grep '\.jsx\?$' | tr '\n' ' ')
[ -z "$jsfiles" ] && exit 0

diffs=$(node_modules/.bin/prettier -l $jsfiles)
[ -z "$diffs" ] && exit 0

command=$(node_modules/.bin/prettier --write $diffs)
[ -z "$command" ]

echo "JS files have been formatted with prettier, please add the changes before committing: "$diffs""

exit 1
