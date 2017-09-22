#!/usr/bin/env bash
set -e # halt script on error

if [ "x$SFTP_USER$SFTP_PASS$SFTP_URL" != "x" ]; then
    lftp -e "mirror -R _site www; quit" -u $SFTP_USER,$SFTP_PASS $SFTP_URL
fi
