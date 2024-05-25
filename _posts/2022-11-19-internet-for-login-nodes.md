---
layout: post
title: "Access the internet (for good) on login nodes behind firewalls"
author: "Bonan Zhu"
categories: posts
tags: [posts, misc, linux]
---

On some computing clusters the login nodes do not have internet access. 
This is a  pain for installing software that requires pulling data from a repository, e.g. Python, Julia and many others.
Lucky, there is a simple way to bypass this limitation without hacking through the firewall - SOCKS5 proxy with `ssh` [reverse tunnelling](https://man.openbsd.org/ssh). 
This allows the internet traffic to be diverted to  a tunnel established by `ssh`, going through the client (local) machine.

On the local machine, do:

```
ssh -R <port_number> <username>@<hostname>
```

On the remote machine, one can set the following environmental variables to tell there is a SOCKS5 proxy available:

```
export http_proxy=socks5h://localhost:<port_number>
export https_proxy=socks5h://localhost:<port_number>
```

or 

```
export http_proxy=socks5://localhost:<port_number>
export https_proxy=socks5://localhost:<port_number>
```

Where `<port_number>` is just a port that is not in use.
The only difference between the two is that the former will also divert domain resolution through SOCKS5.
Note that certain programs (or different versions of the same program) may only support one (or none) of the above protocols.
I have not extensively tested this, but seems that `wget` does not work with SOCKS5 at all, but `curl` does.
For python `pip` should work (depends on the `requests` library), `conda` should also work, but it may need the environmental variable to be in the upper case...
Note that for these two one can also specify the proxy directly in the command line or in the configuration file.
For Julia, both the two ways above works with `Pkg` as of 1.8.