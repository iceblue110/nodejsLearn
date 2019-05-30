#!/bin/sh
cd /Users/qsc/gitcode/iceblue110/nodejsLearn/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log