---
title: Install Cloud9 IDE in CentOS 7
date: 2019-03-24T07:01:53.046Z
summary: Staggeringly easy development from the comfort of your own browser.
tags:
  - post
---
## First Things First
First, get a working CentOS 7 server with your preferred stack.
Next, install requirements:
```
yum groupinstall -y development
yum install -y git glibc-static epel-release nodejs npm
```
Now clone the git repo and Install the Cloud9 SDK:
```
git clone https://github.com/c9/core.git c9sdk
cd c9sdk/
scripts/install-sdk.sh
```
## Encrypt All The Things
Get DNS set up to point to the box, then use Certbot to get a Let's Encrypt cert:
```
sudo yum install certbot
certbot certonly --webroot -w /var/www/html/ -d $hostname
```
The output from this command shows you where the cert is saved.

Combine the cert and private key, and put the result somewhere c9 can see it.
```
cd /etc/letsencrypt/live/$hostname/
openssl rsa -in privkey.pem -out privkey_rsa.pem
touch combined_key.pem | cat privkey_rsa.pem fullchain.pem >> combined_key.pem
mv combined_key.pem /home/$user/c9sdk
chown $user:$user /home/$user/c9sdk/combined_key.pem
```
## Run It Forever
To keep it running, use [Forever](https://www.npmjs.com/package/forever):
```
sudo npm install forever -g
cd c9sdk
forever start server.js -p 8080 -w ~/workspace/ -l 0.0.0.0 --auth developer:cleverpassword --secure combined_key.pem
```
