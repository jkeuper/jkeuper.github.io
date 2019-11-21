#!/usr/bin/env bash
set -e # halt script on error

if [ "x$SFTP_USER$SFTP_PASS$SFTP_URL" != "x" ]; then

sshpass -p '$SFTP_PASS' sftp -o BatchMode=no -oStrictHostKeyChecking=no -b - $SFTP_USER@$SFTP_URL << !
   cd www
   lcd _site
   put -r *
   bye
!
    # lftp -e "mirror -R _site www; quit" -u $SFTP_USER,$SFTP_PASS $SFTP_URL
fi
