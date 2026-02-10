---
title: "Linux Basics: My Beginner's Guide with Bandit"
excerpt: "I started my Linux journey with the OverTheWire Bandit game. I practiced by setting up Ubuntu on VirtualBox."
date: "2025-01-06"
readTime: "8 min"
tags: ["linux", "beginner", "bandit"]
author: "Azize"
---

On January 6, 2025, I made a decision: I would learn Linux. But I didn't know where to start. With years of industry experience, Burhan's guidance led me to the [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) game. This game and my mentor's approach marked the beginning of a learning journey that goes beyond traditional education, aiming to provide direct industry competence.

## Bandit: Learning Linux by Playing

Bandit is a "wargame" - at each level, you need to find the password for the next level. It sounds simple, but here's the beauty: you have to use Linux commands to find the password. The game forces you to learn.

Even making the first connection is a lesson:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

The first levels were easy. Reading files with `cat readme`, seeing hidden files with `ls -la`... But as I progressed, things got harder. For example, when a filename is just `-`, `cat -` doesn't work, you need to write `cat ./-`. I also learned here that you need quotes for filenames with spaces.

In levels 5-10, I got acquainted with powerful tools like `find`, `grep`, `sort`. Especially the `find` command is a lifesaver - perfect for finding files of a specific size or with specific permissions.

I completed the first 10 levels in 4 days. The basic Linux commands had settled in my mind.

## I Needed a Real Linux System

Bandit was great, but playing on someone else's server wasn't enough. I needed my own system - an environment where I could set things up and break them.

I installed [VirtualBox](https://www.virtualbox.org/) on my Windows 11 computer and set up [Ubuntu Server](https://ubuntu.com/download/server). Why Server instead of Desktop? Because my goal was to learn the command line, not to look at pretty interfaces.

My VM settings were simple: 2 GB RAM, 20 GB disk. I set the network to "Bridged Adapter" so I could access Ubuntu from Windows.

## First Days: Discovering Everything

Once Ubuntu was installed, the first thing I did was update the system:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
```

Then I started exploring the file system. There's no C:, D: logic like in Windows. Everything starts from a single root directory (`/`). `/home` for user files, `/etc` for configuration files, `/var` for logs...

## Permissions: The Heart of Linux

When I couldn't run a file, I had to learn about permissions. In Linux, every file has an owner and there are three types of permissions: read (r), write (w), execute (x).

The strange letters like `-rw-r--r--` in the `ls -l` output now made sense. Giving execute permission to a script with `chmod +x script.sh`, full control with `chmod 755`... These became reflexes.

## At the End of Two Weeks

By January 21st, I had something concrete: I had completed the first 10 levels of Bandit, my own Ubuntu server was running, and I knew the basic commands by heart.

But the main thing I learned was this: the best way to learn Linux is to break things. Take snapshots, experiment, break, restore, try again.

Now it's time to set up a web server. Apache and Nginx are waiting for me.

**Useful links:** [Bandit Game](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
