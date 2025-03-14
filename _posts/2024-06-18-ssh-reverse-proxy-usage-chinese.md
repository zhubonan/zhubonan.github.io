---
layout: post
title: "SSH反向隧道使远程计算机连接互联网教程"
author: "Bonan Zhu"
categories: posts
tags: [posts, misc, linux, ssh]
---

# SSH反向隧道远程连接互联网教程

某些情况下远程计算机并没有互联网连接（例如超算登录节点），但是又需要访问其中的一些服务。这时，可以通过SSH反向隧道来访问互联网。

## 前提条件

需要有以下条件：

1. 本地和远程电脑都安装了SSH。
2. 本地电脑已经设置好了代理服务器。
3. 你知道如何在命令行中使用SSH。

## 步骤

### 第一步：在本地电脑上建立SSH反向隧道

在你的本地电脑（Linux环境）上打开命令行或PowerShell（Window10之后的系统已经内置SSH客户端），输入以下命令来建立一个SSH反向隧道：

```bash
ssh -R 7890:localhost:7890 username@remote_host
```

这里，`username`是你远程电脑的用户名，`remote_host`是远程电脑的IP地址或者主机名。`localhost:7890`是你本地计算机上可以访问的代理服务器的地址和端口，需要根据实际情况进行修改。

在Linux环境下，可以通过以下命令测试代理服务器是否运作正常：

```bash
https_proxy=http://localhost:7890 curl https://www.baidu.com
```

这个命令的含义是：在远程电脑上打开7890端口，并将所有发往这个端口的数据转发到本地电脑的7890端口（即你的代理服务器）。

如果你没有可以使用的HTTP代理服务器，可直接输入：

```bash
ssh -R 7890 username@remote_host
```

SSH会构建一个SOCKS代理服务器，需要注意的是SOCKS代理不负责DNS解析，在完全没有互联网的环境下使用较为困难。

注：可修改远程电脑的7890端口为任意一个未被占用的端口。

### 第二步：在远程电脑上设置代理

现在，你需要在远程电脑上设置代理。首先，使用SSH登录到远程电脑：

```bash
ssh username@remote_host
```

然后，设置环境变量`http_proxy`和`https_proxy`。这两个环境变量告诉你的应用程序如何连接到代理服务器。在命令行中输入以下命令：

```bash
export http_proxy=http://localhost:7890
export https_proxy=http://localhost:7890
```

在这里，`localhost:7890`指的是远程计算机的7890端口，改端口已经通过SSH反向隧道映射到了本地。
因此，链接该端口将连接到你的本地电脑的代理服务器。

如果在没有本地电脑可用HTTP代理服务器的情况下，使用了上述的SOCKS代理方案，则需要设置环境变量为：

```bash
export http_proxy=socsk5h://localhost:7890
export https_proxy=socsk5h://localhost:7890
```

其中`socsk5h://`的意思是使用连接SOCKS代理链接的同时也使用代理服务器进行DNS解析，但是并不是所有的程序都支持这种协议。
相比之下，HTTP代理服务器（`http://`）的支持更加好一些。

现在，你的远程电脑应该能通过本地电脑的代理服务器连接到互联网了。

请注意，这些环境变量的设置只在当前的shell会话中有效。如果你退出shell或者重启电脑，你需要重新设置这些环境变量。

### 第三步：测试连接

在远程计算机上，你可以通过尝试访问一个网站来测试你的设置是否正确：

```bash
curl https://www.baidu.com
```

如果你看到了Baidu的首页HTML，那么恭喜你，你已经成功地通过SSH反向隧道连接到互联网了！

## 注意事项

SSH反向隧道是一种强大的工具，但也有一些限制和潜在的安全问题。例如，如果你在远程电脑上打开了一个端口，**那么任何人都可以通过这个端口连接到你的本地电脑**。因此，你应该只在信任的网络中使用SSH反向隧道，并且始终保持你的系统和SSH软件的更新。

此外，这种方法依赖于你的本地电脑和远程电脑都能够稳定地运行和连接。如果任何一台电脑的网络连接不稳定，或者电脑关机，那么这种方法可能会失败。
