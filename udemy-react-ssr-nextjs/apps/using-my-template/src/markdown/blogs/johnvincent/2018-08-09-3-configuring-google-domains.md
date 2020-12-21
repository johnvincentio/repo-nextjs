---
meta-title: "Configuring Google Domains | John Vincent"
meta-description: "John Vincent's discussion on Configuring Google Domains"
meta-keywords: "Configuring Google Domains"

title: "Configuring Google Domains"
subtitle: "Configuring Google Domains"
lead: ""

category: [Digital Ocean, Google, Domains, Johnvincent.io]
permalink: /johnvincent/configuring-domains/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Configuring Google Domains

[Sign in to Google Domains](https://domains.google.com)

Select domain: johnvincent.io

* Configure DNS
* Registered Hosts

```
Host name: johnvincent.io
IP: 104.236.194.244

Host name: www.johnvincent.io
IP: 104.236.194.244
```

## Google Subdomains

Do not use subdomain forward.

Add Custom resource records.

```
Type: A
TTL: 1h
Data: 104.236.194.244
```

for each of

```
jekyll
www.jekyll

music
www.music

mygithub
www.mygithub

rijksmuseum
www.rijksmuseum

internet-resources
www.internet-resources

peg-solitaire
www.peg-solitaire

omnifood
www.omnifood

images
www.images

linkedin
www.linkedin

test
www.test
```

### Verify Domain Configuration

[Google Domains](https://domains.google.com/registrar)

Ensure all are domains and subdomains are forwarding to the correct ip.

#### Test Domains

```
dig A www.johnvincent.io
dig A johnvincent.io
```

and repeat for all subdomains.

Output for each should look like:

```
dig A www.johnvincent.io

; <<>> DiG 9.10.6 <<>> A www.johnvincent.io
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 51430
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4000
;; QUESTION SECTION:
;www.johnvincent.io.		IN	A

;; ANSWER SECTION:
www.johnvincent.io.	3600	IN	A	104.236.194.244

;; Query time: 35 msec
;; SERVER: 192.168.0.1#53(192.168.0.1)
;; WHEN: Tue Sep 24 15:29:57 EDT 2019
;; MSG SIZE  rcvd: 63
```
