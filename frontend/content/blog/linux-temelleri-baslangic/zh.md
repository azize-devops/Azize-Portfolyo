---
title: "Linux基础：我的Bandit入门指南"
excerpt: "我通过OverTheWire Bandit游戏开始了Linux之旅。我在VirtualBox上安装Ubuntu进行练习。"
date: "2025-01-06"
readTime: "8 分钟"
tags: ["linux", "beginner", "bandit"]
author: "Azize"
---

2025年1月6日，我做出了一个决定：我要学习Linux。但我不知道从哪里开始。凭借多年的行业经验，Burhan的指导让我接触到了[OverTheWire Bandit](https://overthewire.org/wargames/bandit/)游戏。这个游戏和我导师的方法标志着一段超越传统教育、旨在提供直接行业能力的学习之旅的开始。

## Bandit：通过游戏学习Linux

Bandit是一个"战争游戏"——在每个级别，你需要找到下一个级别的密码。听起来很简单，但妙处在于：你必须使用Linux命令来找到密码。游戏迫使你学习。

即使是建立第一个连接也是一堂课：

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

前几关很简单。用`cat readme`读取文件，用`ls -la`查看隐藏文件...但随着进展，事情变得更难了。例如，当文件名只是`-`时，`cat -`不起作用，你需要写`cat ./-`。我还在这里学到了带空格的文件名需要引号。

在5-10级，我接触了强大的工具，如`find`、`grep`、`sort`。特别是`find`命令是救星——非常适合查找特定大小或特定权限的文件。

我在4天内完成了前10个级别。基本的Linux命令已经在我脑海中扎根。

## 我需要一个真正的Linux系统

Bandit很棒，但在别人的服务器上玩是不够的。我需要自己的系统——一个可以设置和破坏东西的环境。

我在Windows 11电脑上安装了[VirtualBox](https://www.virtualbox.org/)并设置了[Ubuntu Server](https://ubuntu.com/download/server)。为什么选Server而不是Desktop？因为我的目标是学习命令行，而不是看漂亮的界面。

我的虚拟机设置很简单：2 GB内存，20 GB磁盘。网络设置为"桥接适配器"，这样我就可以从Windows访问Ubuntu。

## 最初的日子：探索一切

Ubuntu安装后，我做的第一件事是更新系统：

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
```

然后我开始探索文件系统。这里没有Windows中的C:、D:逻辑。一切都从单个根目录（`/`）开始。`/home`用于用户文件，`/etc`用于配置文件，`/var`用于日志...

## 权限：Linux的核心

当我无法运行文件时，我不得不学习权限。在Linux中，每个文件都有所有者，有三种类型的权限：读取(r)、写入(w)、执行(x)。

`ls -l`输出中像`-rw-r--r--`这样的奇怪字母现在有意义了。用`chmod +x script.sh`给脚本执行权限，用`chmod 755`完全控制...这些已经成为反射动作。

## 两周结束时

到1月21日，我有了具体的成果：我完成了Bandit的前10个级别，我自己的Ubuntu服务器在运行，我熟记了基本命令。

但我学到的最重要的事情是：学习Linux的最好方法是破坏东西。拍快照，实验，破坏，恢复，再试。

现在是设置Web服务器的时候了。Apache和Nginx在等着我。

**有用链接：** [Bandit游戏](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
