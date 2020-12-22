---
meta-title: "Configuring Google Domains | John Vincent"
meta-description: "John Vincent's discussion on Configuring Google Domains"
meta-keywords: "Google Domains"

title: "Configuring Google Domains"
subtitle: "Configuring Google Domains"
lead: ""

category: [Taskmuncher, Google, Domains]
permalink: /taskmuncher/deploy/configuring-domains/
---

This is part of a series of discussions regarding Deploying TaskMuncher to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Configuring Google Domains

[Sign in to Google Domains](https://domains.google.com)

Select domain: taskmuncher.com

* Configure DNS
* Registered Hosts

```
Host name: taskmuncher.com
IP: 159.89.179.32

Host name: www.taskmuncher.com
IP: 159.89.179.32
```

Add Custom resource records.

```
name: @
Type: A
TTL: 1h
Data: 159.89.179.32
```

```
name: www
Type: A
TTL: 1h
Data: 159.89.179.32
```

## Verify Domain Configuration

[Google Domains](https://domains.google.com/registrar)

Ensure all are domains and subdomains are forwarding to the correct ip.

#### Test Domains

```
ping taskmuncher.com
ping www.taskmuncher.com

dig A taskmuncher.com
dig A www.taskmuncher.com
```

Output for each should look like:

```
dig A www.taskmuncher.com

; <<>> DiG 9.8.3-P1 <<>> A www.taskmuncher.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 61202
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;www.taskmuncher.com.		IN	A

;; ANSWER SECTION:
www.taskmuncher.com.	3581	IN	A	159.89.179.32

;; Query time: 0 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Mon Aug 14 03:47:38 2017
;; MSG SIZE  rcvd: 51
```
