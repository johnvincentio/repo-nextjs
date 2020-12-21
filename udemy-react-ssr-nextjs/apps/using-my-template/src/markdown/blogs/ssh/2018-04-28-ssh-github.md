---
meta-title: "SSH Ubuntu Github | John Vincent"
meta-description: "John Vincent's discussion on SSH to Github"
meta-keywords: "SSH Ubuntu Github"

title: "SSH to Github"
subtitle: "Access Github without passwords"
lead: "Configure Ubuntu SSH"

category: [Ssh, Ubuntu, Github]
permalink: /ssh/ssh-github/
---

Basic configuration so let's begin.

<!-- end -->

## Configure SSH Keys

Login to Ubuntu system

Start SSH-Agent

```
eval "$(ssh-agent)"
```

Generate a new key, do not enter a passphrase

```
cd .ssh
ssh-keygen -t rsa -b 4096 -C “github_email_address” -f id_github
passphrase: <none>
```

This generates two files

* private: `id_github`
* public: `id_github.pub`

Set permissions

```
chmod 600 id_github*
```

Add to keychain

```
ssh-add -k ~/.ssh/id_github
```

Verify

```
ssh-add -l
```

## Add public key to Github account

Copy content of `id_github.pub`

Login to Github account

* Settings
* SSH and GPG keys
* New SSH key
* Title: use a descriptive term
* Paste to SSH key
* Save

## Test SSH Keys

Clone a public and a private repository from your Github account.

For example

```
git clone git@github.com:<your-github-id>/<your-repo>
```

## Other

Notice this does not permanently add the ssh keys as I am only interested in pulling from Github for a redeployment. The deployment script has the following code

```
eval "$(ssh-agent)"
ssh-add -k ~/.ssh/id_github
```

which enables the git clone.

## Copy over SSH using rsync

For example, copy from local to folder `remote-folder` at remote server `mywebsite`

```
cd
cd tmp
rsync -r --exclude=".git" --exclude=".gitignore" --exclude=".DS_Store" \
    music mywebsite:remote-folder
```

## Copy over SSH using scp

For example, copy from local to folder `remote-folder` at remote server `mywebsite`

```
cd
cd tmp
scp -r tmp/. $REMOTE_USER@mywebsite:$REMOTE_HOME/remote-folder
```

For example, copy from `remote-folder` at remote server `mywebsite` to local

```
cd tmp
scp -r $REMOTE_USER@mywebsite:$REMOTE_HOME/bin .
```
