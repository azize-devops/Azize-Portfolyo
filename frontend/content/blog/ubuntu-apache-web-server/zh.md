---
title: "在Ubuntu上用Apache搭建我的第一个网站"
excerpt: "在VirtualBox上的Ubuntu服务器上安装Apache以及我遇到的错误。从端口冲突到配置问题。"
date: "2025-01-22"
readTime: "10 分钟"
tags: ["linux", "apache", "web-server"]
author: "Azize"
---

学习了Linux基础之后，是时候做一些真正的事情了：搭建Web服务器。我的目标很简单——在Ubuntu虚拟机上运行一个网站，并从Windows访问它。听起来很简单，对吧？并没有。

## Apache安装：简单的部分

[Apache](https://httpd.apache.org/)的安装真的很简单：

```bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
```

看到`active (running)`我很高兴。我在浏览器中打开虚拟机的IP，然后...什么都没有。冒险就此开始。

## 第一个错误：端口冲突

当我尝试重启Apache时，终端出现红色文字：

```
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
```

80端口已被占用。我检查了谁在使用它：

```bash
sudo lsof -i :80
```

原来我之前为测试安装的另一个Web服务器还在运行。我有两个选择：停止它或更改Apache的端口。我选择更改端口——将`/etc/apache2/ports.conf`中的`Listen 80`改为`Listen 8080`。

## 第二个错误：打字错误！

当我启动Apache时，新的错误：

```
AH02297: Cannot access directory "/etc/apache2/${APACHE_LOG_DIR]"
```

仔细看，我注意到：`${APACHE_LOG_DIR]`——我用了方括号而不是花括号！一个字符的错误花了我半小时。我学会了`sudo apache2ctl configtest`命令——每次更改后进行语法检查是必须的。

## 创建网站

错误解决后，是时候创建内容了。我创建了`/var/www/mysite`文件夹并写了一个简单的HTML文件。然后是虚拟主机配置：

```bash
sudo nano /etc/apache2/sites-available/mysite.conf
```

用`a2ensite mysite.conf`激活网站，用`a2dissite 000-default.conf`禁用默认站点。`sudo systemctl reload apache2`然后...

我在Windows浏览器中打开`http://192.0.2.100:8080`。当我看到"Hello World!"时，真的很高兴。一个简单的HTML页面，但对我来说是一大步。

## 经验教训

从这次经历中得到的教训：
- **真正**阅读错误信息很重要
- 始终使用`apache2ctl configtest`
- 用`lsof -i :port`检查端口
- 不要忘记防火墙：`sudo ufw allow 8080/tcp`

下一个是Nginx。他们说它更轻、更快。让我们看看。

**有用链接：** [Apache文档](https://httpd.apache.org/docs/) | [Ubuntu服务器指南](https://ubuntu.com/server/docs)
