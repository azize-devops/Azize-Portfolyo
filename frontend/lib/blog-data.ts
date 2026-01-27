import { type Locale } from "@/i18n/config";

// Localized string type
type LocalizedString = Record<Locale, string>;

// Internal blog post structure with all translations
interface BlogPostData {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  date: string;
  readTime: LocalizedString;
  tags: string[];
  author: { name: string };
}

// Public blog post type for display
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  author: { name: string };
}

// Blog posts data with all translations
const blogPostsData: BlogPostData[] = [
  {
    id: "1",
    slug: "linux-temelleri-baslangic",
    title: {
      tr: "Linux Temelleri: Bandit ile Başlangıç Rehberim",
      en: "Linux Basics: My Beginner's Guide with Bandit",
      ru: "Основы Linux: Мое руководство для начинающих с Bandit",
      zh: "Linux基础：我的Bandit入门指南",
      de: "Linux-Grundlagen: Mein Anfängerleitfaden mit Bandit",
      fr: "Les bases de Linux : Mon guide du débutant avec Bandit",
      ar: "أساسيات لينكس: دليلي للمبتدئين مع Bandit",
      es: "Fundamentos de Linux: Mi guía para principiantes con Bandit",
    },
    excerpt: {
      tr: "Linux yolculuğuma OverTheWire Bandit oyunu ile başladım. VirtualBox üzerinde Ubuntu kurarak pratik yaptım.",
      en: "I started my Linux journey with the OverTheWire Bandit game. I practiced by setting up Ubuntu on VirtualBox.",
      ru: "Я начал свой путь в Linux с игры OverTheWire Bandit. Практиковался, настраивая Ubuntu на VirtualBox.",
      zh: "我通过OverTheWire Bandit游戏开始了Linux之旅。我在VirtualBox上安装Ubuntu进行练习。",
      de: "Ich begann meine Linux-Reise mit dem OverTheWire Bandit-Spiel. Ich übte, indem ich Ubuntu auf VirtualBox einrichtete.",
      fr: "J'ai commencé mon parcours Linux avec le jeu OverTheWire Bandit. J'ai pratiqué en installant Ubuntu sur VirtualBox.",
      ar: "بدأت رحلتي مع لينكس بلعبة OverTheWire Bandit. تدربت من خلال إعداد أوبونتو على VirtualBox.",
      es: "Comencé mi viaje en Linux con el juego OverTheWire Bandit. Practiqué configurando Ubuntu en VirtualBox.",
    },
    date: "2025-01-06",
    readTime: {
      tr: "8 dk",
      en: "8 min",
      ru: "8 мин",
      zh: "8 分钟",
      de: "8 Min",
      fr: "8 min",
      ar: "8 دقائق",
      es: "8 min",
    },
    tags: ["linux", "beginner", "bandit"],
    author: { name: "Azize" },
    content: {
      tr: `
6 Ocak 2025'te bir karar aldım: Linux öğreneceğim. Ama nereden başlayacağımı bilmiyordum. Uzun yıllara dayanan sektörel tecrübesiyle Burhan'ın rehberliği beni [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) oyununa yönlendirdi. Bu oyun ve hocamın yaklaşımı, geleneksel eğitim anlayışının ötesine geçen, doğrudan sektörel yetkinlik kazandırmayı amaçlayan bir öğrenme sürecinin başlangıcı oldu.

## Bandit: Oyun Oynayarak Linux Öğrenmek

Bandit bir "wargame" - her seviyede bir sonraki seviyenin şifresini bulmanız gerekiyor. Kulağa basit geliyor ama işin güzel yanı şu: şifreyi bulmak için Linux komutlarını kullanmak zorundasınız. Oyun sizi öğrenmeye zorluyor.

İlk bağlantıyı kurmak bile bir ders:

\`\`\`bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
\`\`\`

İlk seviyeler basitti. \`cat readme\` ile dosya okumak, \`ls -la\` ile gizli dosyaları görmek... Ama ilerledikçe işler zorlaştı. Mesela dosya adı sadece \`-\` olunca \`cat -\` çalışmıyor, \`cat ./-\` yazmanız gerekiyor. Boşluklu dosya isimleri için tırnak kullanmak gerektiğini de burada öğrendim.

5-10 arasındaki seviyelerde \`find\`, \`grep\`, \`sort\` gibi güçlü araçlarla tanıştım. Özellikle \`find\` komutu hayat kurtarıcı - belirli boyutta, belirli izinlere sahip dosyaları bulmak için mükemmel.

4 günde ilk 10 seviyeyi bitirdim. Kafamda artık temel Linux komutları oturmuştu.

## Gerçek Bir Linux Sisteme İhtiyaç Vardı

Bandit güzeldi ama başkasının sunucusunda oynamak yetmiyordu. Kendi sistemime ihtiyacım vardı - bir şeyleri kurup bozabileceğim, deneyebileceğim bir ortam.

Windows 11 bilgisayarıma [VirtualBox](https://www.virtualbox.org/) kurdum ve [Ubuntu Server](https://ubuntu.com/download/server) yükledim. Neden Desktop değil de Server? Çünkü amacım komut satırını öğrenmekti, güzel arayüzlere bakmak değil.

VM ayarlarım basitti: 2 GB RAM, 20 GB disk. Ağ ayarını "Bridged Adapter" yaptım ki Windows'tan Ubuntu'ya erişebileyim.

## İlk Günler: Her Şeyi Keşfetmek

Ubuntu kurulunca ilk yaptığım şey sistemi güncellemek oldu:

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
\`\`\`

Sonra dosya sistemini keşfetmeye başladım. Windows'taki C:, D: mantığı burada yok. Her şey tek bir kök dizinden (\`/\`) başlıyor. \`/home\` kullanıcı dosyaları için, \`/etc\` ayar dosyaları için, \`/var\` loglar için...

## İzinler: Linux'un Kalbi

Bir dosyayı çalıştıramayınca izinleri öğrenmek zorunda kaldım. Linux'ta her dosyanın sahibi var ve üç tür izin var: okuma (r), yazma (w), çalıştırma (x).

\`ls -l\` çıktısındaki \`-rw-r--r--\` gibi garip harfler artık anlam kazandı. \`chmod +x script.sh\` ile bir script'e çalıştırma izni vermek, \`chmod 755\` ile tam kontrol... Bunlar artık refleks oldu.

## İki Haftanın Sonunda

21 Ocak'a geldiğimde elimde somut bir şeyler vardı: Bandit'in ilk 10 seviyesini bitirmiştim, kendi Ubuntu sunucum çalışıyordu, temel komutları ezbere biliyordum.

Ama asıl öğrendiğim şey şuydu: Linux'u öğrenmenin en iyi yolu bir şeyleri bozmak. Snapshot alın, deneyin, bozun, geri alın, tekrar deneyin.

Şimdi sıra web sunucusu kurmakta. Apache ve Nginx beni bekliyor.

**Faydalı linkler:** [Bandit Oyunu](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
      `,
      en: `
On January 6, 2025, I made a decision: I would learn Linux. But I didn't know where to start. With years of industry experience, Burhan's guidance led me to the [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) game. This game and my mentor's approach marked the beginning of a learning journey that goes beyond traditional education, aiming to provide direct industry competence.

## Bandit: Learning Linux by Playing

Bandit is a "wargame" - at each level, you need to find the password for the next level. It sounds simple, but here's the beauty: you have to use Linux commands to find the password. The game forces you to learn.

Even making the first connection is a lesson:

\`\`\`bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
\`\`\`

The first levels were easy. Reading files with \`cat readme\`, seeing hidden files with \`ls -la\`... But as I progressed, things got harder. For example, when a filename is just \`-\`, \`cat -\` doesn't work, you need to write \`cat ./-\`. I also learned here that you need quotes for filenames with spaces.

In levels 5-10, I got acquainted with powerful tools like \`find\`, \`grep\`, \`sort\`. Especially the \`find\` command is a lifesaver - perfect for finding files of a specific size or with specific permissions.

I completed the first 10 levels in 4 days. The basic Linux commands had settled in my mind.

## I Needed a Real Linux System

Bandit was great, but playing on someone else's server wasn't enough. I needed my own system - an environment where I could set things up and break them.

I installed [VirtualBox](https://www.virtualbox.org/) on my Windows 11 computer and set up [Ubuntu Server](https://ubuntu.com/download/server). Why Server instead of Desktop? Because my goal was to learn the command line, not to look at pretty interfaces.

My VM settings were simple: 2 GB RAM, 20 GB disk. I set the network to "Bridged Adapter" so I could access Ubuntu from Windows.

## First Days: Discovering Everything

Once Ubuntu was installed, the first thing I did was update the system:

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
\`\`\`

Then I started exploring the file system. There's no C:, D: logic like in Windows. Everything starts from a single root directory (\`/\`). \`/home\` for user files, \`/etc\` for configuration files, \`/var\` for logs...

## Permissions: The Heart of Linux

When I couldn't run a file, I had to learn about permissions. In Linux, every file has an owner and there are three types of permissions: read (r), write (w), execute (x).

The strange letters like \`-rw-r--r--\` in the \`ls -l\` output now made sense. Giving execute permission to a script with \`chmod +x script.sh\`, full control with \`chmod 755\`... These became reflexes.

## At the End of Two Weeks

By January 21st, I had something concrete: I had completed the first 10 levels of Bandit, my own Ubuntu server was running, and I knew the basic commands by heart.

But the main thing I learned was this: the best way to learn Linux is to break things. Take snapshots, experiment, break, restore, try again.

Now it's time to set up a web server. Apache and Nginx are waiting for me.

**Useful links:** [Bandit Game](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
      `,
      ru: `
6 января 2025 года я принял решение: буду изучать Linux. Но я не знал, с чего начать. Благодаря многолетнему опыту работы в отрасли, наставничество Бурхана привело меня к игре [OverTheWire Bandit](https://overthewire.org/wargames/bandit/). Эта игра и подход моего наставника ознаменовали начало пути обучения, выходящего за рамки традиционного образования и направленного на получение прямой отраслевой компетенции.

## Bandit: Изучение Linux через игру

Bandit - это "варгейм" - на каждом уровне вам нужно найти пароль для следующего уровня. Звучит просто, но вот в чём прелесть: чтобы найти пароль, нужно использовать команды Linux. Игра заставляет вас учиться.

Даже первое подключение - это урок:

\`\`\`bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
\`\`\`

Первые уровни были лёгкими. Чтение файлов с помощью \`cat readme\`, просмотр скрытых файлов с \`ls -la\`... Но по мере продвижения становилось сложнее. Например, когда имя файла просто \`-\`, \`cat -\` не работает, нужно писать \`cat ./-\`. Здесь же я узнал, что для имён файлов с пробелами нужны кавычки.

На уровнях 5-10 я познакомился с мощными инструментами: \`find\`, \`grep\`, \`sort\`. Особенно команда \`find\` - настоящий спаситель для поиска файлов определённого размера или с определёнными правами доступа.

За 4 дня я прошёл первые 10 уровней. Базовые команды Linux закрепились в моей голове.

## Мне нужна была настоящая система Linux

Bandit был отличным, но играть на чужом сервере было недостаточно. Мне нужна была своя система - среда, где я мог бы что-то настраивать и ломать.

Я установил [VirtualBox](https://www.virtualbox.org/) на свой компьютер с Windows 11 и настроил [Ubuntu Server](https://ubuntu.com/download/server). Почему Server, а не Desktop? Потому что моей целью было изучить командную строку, а не смотреть на красивые интерфейсы.

Настройки ВМ были простыми: 2 ГБ RAM, 20 ГБ диск. Сеть настроил на "Bridged Adapter", чтобы иметь доступ к Ubuntu из Windows.

## Первые дни: Исследование всего

После установки Ubuntu первое, что я сделал - обновил систему:

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
\`\`\`

Затем начал изучать файловую систему. Здесь нет логики C:, D: как в Windows. Всё начинается с одного корневого каталога (\`/\`). \`/home\` для файлов пользователей, \`/etc\` для конфигурационных файлов, \`/var\` для логов...

## Права доступа: Сердце Linux

Когда я не смог запустить файл, пришлось изучить права доступа. В Linux у каждого файла есть владелец и три типа прав: чтение (r), запись (w), выполнение (x).

Странные буквы вроде \`-rw-r--r--\` в выводе \`ls -l\` теперь обрели смысл. Дать скрипту права на выполнение через \`chmod +x script.sh\`, полный контроль через \`chmod 755\`... Это стало рефлексом.

## В конце двух недель

К 21 января у меня было что-то конкретное: я прошёл первые 10 уровней Bandit, мой собственный сервер Ubuntu работал, и я знал базовые команды наизусть.

Но главное, что я понял: лучший способ изучить Linux - это что-то сломать. Делайте снимки, экспериментируйте, ломайте, восстанавливайте, пробуйте снова.

Теперь пора настроить веб-сервер. Apache и Nginx ждут меня.

**Полезные ссылки:** [Игра Bandit](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
      `,
      zh: `
2025年1月6日，我做出了一个决定：我要学习Linux。但我不知道从哪里开始。凭借多年的行业经验，Burhan的指导让我接触到了[OverTheWire Bandit](https://overthewire.org/wargames/bandit/)游戏。这个游戏和我导师的方法标志着一段超越传统教育、旨在提供直接行业能力的学习之旅的开始。

## Bandit：通过游戏学习Linux

Bandit是一个"战争游戏"——在每个级别，你需要找到下一个级别的密码。听起来很简单，但妙处在于：你必须使用Linux命令来找到密码。游戏迫使你学习。

即使是建立第一个连接也是一堂课：

\`\`\`bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
\`\`\`

前几关很简单。用\`cat readme\`读取文件，用\`ls -la\`查看隐藏文件...但随着进展，事情变得更难了。例如，当文件名只是\`-\`时，\`cat -\`不起作用，你需要写\`cat ./-\`。我还在这里学到了带空格的文件名需要引号。

在5-10级，我接触了强大的工具，如\`find\`、\`grep\`、\`sort\`。特别是\`find\`命令是救星——非常适合查找特定大小或特定权限的文件。

我在4天内完成了前10个级别。基本的Linux命令已经在我脑海中扎根。

## 我需要一个真正的Linux系统

Bandit很棒，但在别人的服务器上玩是不够的。我需要自己的系统——一个可以设置和破坏东西的环境。

我在Windows 11电脑上安装了[VirtualBox](https://www.virtualbox.org/)并设置了[Ubuntu Server](https://ubuntu.com/download/server)。为什么选Server而不是Desktop？因为我的目标是学习命令行，而不是看漂亮的界面。

我的虚拟机设置很简单：2 GB内存，20 GB磁盘。网络设置为"桥接适配器"，这样我就可以从Windows访问Ubuntu。

## 最初的日子：探索一切

Ubuntu安装后，我做的第一件事是更新系统：

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
\`\`\`

然后我开始探索文件系统。这里没有Windows中的C:、D:逻辑。一切都从单个根目录（\`/\`）开始。\`/home\`用于用户文件，\`/etc\`用于配置文件，\`/var\`用于日志...

## 权限：Linux的核心

当我无法运行文件时，我不得不学习权限。在Linux中，每个文件都有所有者，有三种类型的权限：读取(r)、写入(w)、执行(x)。

\`ls -l\`输出中像\`-rw-r--r--\`这样的奇怪字母现在有意义了。用\`chmod +x script.sh\`给脚本执行权限，用\`chmod 755\`完全控制...这些已经成为反射动作。

## 两周结束时

到1月21日，我有了具体的成果：我完成了Bandit的前10个级别，我自己的Ubuntu服务器在运行，我熟记了基本命令。

但我学到的最重要的事情是：学习Linux的最好方法是破坏东西。拍快照，实验，破坏，恢复，再试。

现在是设置Web服务器的时候了。Apache和Nginx在等着我。

**有用链接：** [Bandit游戏](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
      `,
      de: `
Am 6. Januar 2025 traf ich eine Entscheidung: Ich würde Linux lernen. Aber ich wusste nicht, wo ich anfangen sollte. Mit jahrelanger Branchenerfahrung führte mich Burhans Anleitung zum [OverTheWire Bandit](https://overthewire.org/wargames/bandit/)-Spiel. Dieses Spiel und der Ansatz meines Mentors markierten den Beginn einer Lernreise, die über die traditionelle Bildung hinausgeht und darauf abzielt, direkte Branchenkompetenz zu vermitteln.

## Bandit: Linux lernen durch Spielen

Bandit ist ein "Wargame" - auf jeder Ebene müssen Sie das Passwort für die nächste Ebene finden. Es klingt einfach, aber hier ist das Schöne daran: Sie müssen Linux-Befehle verwenden, um das Passwort zu finden. Das Spiel zwingt Sie zum Lernen.

Selbst die erste Verbindung herzustellen ist eine Lektion:

\`\`\`bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
\`\`\`

Die ersten Level waren einfach. Dateien mit \`cat readme\` lesen, versteckte Dateien mit \`ls -la\` sehen... Aber je weiter ich kam, desto schwieriger wurde es. Wenn zum Beispiel ein Dateiname nur \`-\` ist, funktioniert \`cat -\` nicht, man muss \`cat ./-\` schreiben. Hier lernte ich auch, dass man für Dateinamen mit Leerzeichen Anführungszeichen braucht.

In den Leveln 5-10 lernte ich mächtige Werkzeuge wie \`find\`, \`grep\`, \`sort\` kennen. Besonders der \`find\`-Befehl ist ein Lebensretter - perfekt um Dateien einer bestimmten Größe oder mit bestimmten Berechtigungen zu finden.

Ich habe die ersten 10 Level in 4 Tagen abgeschlossen. Die grundlegenden Linux-Befehle hatten sich in meinem Kopf festgesetzt.

## Ich brauchte ein echtes Linux-System

Bandit war großartig, aber auf dem Server von jemand anderem zu spielen reichte nicht aus. Ich brauchte mein eigenes System - eine Umgebung, in der ich Dinge einrichten und kaputt machen konnte.

Ich installierte [VirtualBox](https://www.virtualbox.org/) auf meinem Windows 11-Computer und richtete [Ubuntu Server](https://ubuntu.com/download/server) ein. Warum Server statt Desktop? Weil mein Ziel war, die Kommandozeile zu lernen, nicht schöne Oberflächen anzuschauen.

Meine VM-Einstellungen waren einfach: 2 GB RAM, 20 GB Festplatte. Ich stellte das Netzwerk auf "Bridged Adapter", damit ich von Windows aus auf Ubuntu zugreifen konnte.

## Erste Tage: Alles erkunden

Nach der Installation von Ubuntu war das Erste, was ich tat, das System zu aktualisieren:

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
\`\`\`

Dann begann ich, das Dateisystem zu erkunden. Es gibt keine C:, D:-Logik wie in Windows. Alles beginnt von einem einzigen Wurzelverzeichnis (\`/\`). \`/home\` für Benutzerdateien, \`/etc\` für Konfigurationsdateien, \`/var\` für Logs...

## Berechtigungen: Das Herz von Linux

Als ich eine Datei nicht ausführen konnte, musste ich die Berechtigungen lernen. In Linux hat jede Datei einen Besitzer und es gibt drei Arten von Berechtigungen: Lesen (r), Schreiben (w), Ausführen (x).

Die seltsamen Buchstaben wie \`-rw-r--r--\` in der \`ls -l\`-Ausgabe ergaben jetzt Sinn. Einem Skript mit \`chmod +x script.sh\` Ausführungsrechte geben, volle Kontrolle mit \`chmod 755\`... Das wurde zum Reflex.

## Am Ende von zwei Wochen

Bis zum 21. Januar hatte ich etwas Konkretes: Ich hatte die ersten 10 Level von Bandit abgeschlossen, mein eigener Ubuntu-Server lief, und ich kannte die grundlegenden Befehle auswendig.

Aber die wichtigste Erkenntnis war: Der beste Weg, Linux zu lernen, ist Dinge kaputt zu machen. Machen Sie Snapshots, experimentieren Sie, machen Sie kaputt, stellen Sie wieder her, versuchen Sie es erneut.

Jetzt ist es Zeit, einen Webserver einzurichten. Apache und Nginx warten auf mich.

**Nützliche Links:** [Bandit-Spiel](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
      `,
      fr: `
Le 6 janvier 2025, j'ai pris une décision : j'allais apprendre Linux. Mais je ne savais pas par où commencer. Fort de nombreuses années d'expérience dans l'industrie, les conseils de Burhan m'ont conduit au jeu [OverTheWire Bandit](https://overthewire.org/wargames/bandit/). Ce jeu et l'approche de mon mentor ont marqué le début d'un parcours d'apprentissage qui va au-delà de l'éducation traditionnelle, visant à fournir une compétence industrielle directe.

## Bandit : Apprendre Linux en jouant

Bandit est un "wargame" - à chaque niveau, vous devez trouver le mot de passe pour le niveau suivant. Ça semble simple, mais voici la beauté : vous devez utiliser des commandes Linux pour trouver le mot de passe. Le jeu vous force à apprendre.

Même établir la première connexion est une leçon :

\`\`\`bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
\`\`\`

Les premiers niveaux étaient faciles. Lire des fichiers avec \`cat readme\`, voir les fichiers cachés avec \`ls -la\`... Mais au fur et à mesure, les choses devenaient plus difficiles. Par exemple, quand un nom de fichier est juste \`-\`, \`cat -\` ne fonctionne pas, il faut écrire \`cat ./-\`. J'ai aussi appris ici qu'il faut des guillemets pour les noms de fichiers avec des espaces.

Dans les niveaux 5-10, j'ai découvert des outils puissants comme \`find\`, \`grep\`, \`sort\`. Surtout la commande \`find\` est un sauveur - parfaite pour trouver des fichiers d'une taille spécifique ou avec des permissions spécifiques.

J'ai terminé les 10 premiers niveaux en 4 jours. Les commandes Linux de base s'étaient installées dans mon esprit.

## J'avais besoin d'un vrai système Linux

Bandit était génial, mais jouer sur le serveur de quelqu'un d'autre ne suffisait pas. J'avais besoin de mon propre système - un environnement où je pouvais configurer et casser des choses.

J'ai installé [VirtualBox](https://www.virtualbox.org/) sur mon ordinateur Windows 11 et configuré [Ubuntu Server](https://ubuntu.com/download/server). Pourquoi Server au lieu de Desktop ? Parce que mon objectif était d'apprendre la ligne de commande, pas de regarder de jolies interfaces.

Mes paramètres VM étaient simples : 2 Go de RAM, 20 Go de disque. J'ai mis le réseau en "Bridged Adapter" pour pouvoir accéder à Ubuntu depuis Windows.

## Premiers jours : Tout découvrir

Une fois Ubuntu installé, la première chose que j'ai faite a été de mettre à jour le système :

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
\`\`\`

Puis j'ai commencé à explorer le système de fichiers. Il n'y a pas de logique C:, D: comme dans Windows. Tout commence à partir d'un seul répertoire racine (\`/\`). \`/home\` pour les fichiers utilisateurs, \`/etc\` pour les fichiers de configuration, \`/var\` pour les logs...

## Permissions : Le cœur de Linux

Quand je n'ai pas pu exécuter un fichier, j'ai dû apprendre les permissions. Sous Linux, chaque fichier a un propriétaire et il y a trois types de permissions : lecture (r), écriture (w), exécution (x).

Les lettres étranges comme \`-rw-r--r--\` dans la sortie de \`ls -l\` avaient maintenant du sens. Donner la permission d'exécution à un script avec \`chmod +x script.sh\`, contrôle total avec \`chmod 755\`... C'est devenu un réflexe.

## À la fin de deux semaines

Le 21 janvier, j'avais quelque chose de concret : j'avais terminé les 10 premiers niveaux de Bandit, mon propre serveur Ubuntu fonctionnait, et je connaissais les commandes de base par cœur.

Mais la chose principale que j'ai apprise était : la meilleure façon d'apprendre Linux est de casser des choses. Faites des snapshots, expérimentez, cassez, restaurez, réessayez.

Maintenant il est temps de configurer un serveur web. Apache et Nginx m'attendent.

**Liens utiles :** [Jeu Bandit](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
      `,
      ar: `
في 6 يناير 2025، اتخذت قراراً: سأتعلم Linux. لكنني لم أكن أعرف من أين أبدأ. بفضل سنوات من الخبرة في المجال، قادني إرشاد برهان إلى لعبة [OverTheWire Bandit](https://overthewire.org/wargames/bandit/). هذه اللعبة ونهج معلمي شكّلا بداية رحلة تعلم تتجاوز التعليم التقليدي، بهدف توفير كفاءة صناعية مباشرة.

## Bandit: تعلم Linux من خلال اللعب

Bandit هي "لعبة حرب" - في كل مستوى، تحتاج إلى إيجاد كلمة المرور للمستوى التالي. يبدو بسيطاً، لكن هنا الجمال: يجب أن تستخدم أوامر Linux للعثور على كلمة المرور. اللعبة تجبرك على التعلم.

حتى إجراء الاتصال الأول هو درس:

\`\`\`bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
\`\`\`

المستويات الأولى كانت سهلة. قراءة الملفات بـ \`cat readme\`، رؤية الملفات المخفية بـ \`ls -la\`... لكن مع التقدم، أصبحت الأمور أصعب. مثلاً، عندما يكون اسم الملف فقط \`-\`، \`cat -\` لا يعمل، تحتاج لكتابة \`cat ./-\`. تعلمت هنا أيضاً أنك تحتاج علامات اقتباس لأسماء الملفات التي تحتوي مسافات.

في المستويات 5-10، تعرفت على أدوات قوية مثل \`find\`، \`grep\`، \`sort\`. خاصة أمر \`find\` منقذ للحياة - مثالي للعثور على ملفات بحجم معين أو بصلاحيات معينة.

أكملت أول 10 مستويات في 4 أيام. استقرت أوامر Linux الأساسية في ذهني.

## كنت بحاجة لنظام Linux حقيقي

Bandit كان رائعاً، لكن اللعب على خادم شخص آخر لم يكن كافياً. كنت بحاجة لنظامي الخاص - بيئة يمكنني فيها إعداد الأشياء وتخريبها.

قمت بتثبيت [VirtualBox](https://www.virtualbox.org/) على حاسوبي Windows 11 وأعددت [Ubuntu Server](https://ubuntu.com/download/server). لماذا Server بدلاً من Desktop؟ لأن هدفي كان تعلم سطر الأوامر، وليس النظر إلى واجهات جميلة.

إعدادات VM كانت بسيطة: 2 GB RAM، 20 GB قرص. ضبطت الشبكة على "Bridged Adapter" لأتمكن من الوصول إلى Ubuntu من Windows.

## الأيام الأولى: اكتشاف كل شيء

بعد تثبيت Ubuntu، أول شيء فعلته هو تحديث النظام:

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
\`\`\`

ثم بدأت في استكشاف نظام الملفات. لا يوجد منطق C:، D: كما في Windows. كل شيء يبدأ من دليل جذر واحد (\`/\`). \`/home\` لملفات المستخدم، \`/etc\` لملفات الإعداد، \`/var\` للسجلات...

## الصلاحيات: قلب Linux

عندما لم أتمكن من تشغيل ملف، اضطررت لتعلم الصلاحيات. في Linux، لكل ملف مالك وهناك ثلاثة أنواع من الصلاحيات: قراءة (r)، كتابة (w)، تنفيذ (x).

الحروف الغريبة مثل \`-rw-r--r--\` في مخرجات \`ls -l\` أصبحت الآن منطقية. منح صلاحية التنفيذ لسكريبت بـ \`chmod +x script.sh\`، التحكم الكامل بـ \`chmod 755\`... هذه أصبحت ردود فعل تلقائية.

## في نهاية أسبوعين

بحلول 21 يناير، كان لدي شيء ملموس: أكملت أول 10 مستويات من Bandit، خادم Ubuntu الخاص بي يعمل، وأعرف الأوامر الأساسية عن ظهر قلب.

لكن الشيء الرئيسي الذي تعلمته هو: أفضل طريقة لتعلم Linux هي تخريب الأشياء. خذ لقطات، جرّب، خرّب، استعد، حاول مرة أخرى.

الآن حان وقت إعداد خادم ويب. Apache و Nginx ينتظرانني.

**روابط مفيدة:** [لعبة Bandit](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
      `,
      es: `
El 6 de enero de 2025, tomé una decisión: aprendería Linux. Pero no sabía por dónde empezar. Con años de experiencia en la industria, la guía de Burhan me llevó al juego [OverTheWire Bandit](https://overthewire.org/wargames/bandit/). Este juego y el enfoque de mi mentor marcaron el comienzo de un viaje de aprendizaje que va más allá de la educación tradicional, con el objetivo de proporcionar competencia industrial directa.

## Bandit: Aprendiendo Linux jugando

Bandit es un "wargame" - en cada nivel, necesitas encontrar la contraseña para el siguiente nivel. Suena simple, pero aquí está la belleza: tienes que usar comandos de Linux para encontrar la contraseña. El juego te obliga a aprender.

Incluso hacer la primera conexión es una lección:

\`\`\`bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
\`\`\`

Los primeros niveles fueron fáciles. Leer archivos con \`cat readme\`, ver archivos ocultos con \`ls -la\`... Pero a medida que avanzaba, las cosas se volvieron más difíciles. Por ejemplo, cuando un nombre de archivo es solo \`-\`, \`cat -\` no funciona, necesitas escribir \`cat ./-\`. También aprendí aquí que necesitas comillas para nombres de archivos con espacios.

En los niveles 5-10, conocí herramientas poderosas como \`find\`, \`grep\`, \`sort\`. Especialmente el comando \`find\` es un salvavidas - perfecto para encontrar archivos de un tamaño específico o con permisos específicos.

Completé los primeros 10 niveles en 4 días. Los comandos básicos de Linux se habían asentado en mi mente.

## Necesitaba un sistema Linux real

Bandit era genial, pero jugar en el servidor de otra persona no era suficiente. Necesitaba mi propio sistema - un entorno donde pudiera configurar y romper cosas.

Instalé [VirtualBox](https://www.virtualbox.org/) en mi computadora Windows 11 y configuré [Ubuntu Server](https://ubuntu.com/download/server). ¿Por qué Server en lugar de Desktop? Porque mi objetivo era aprender la línea de comandos, no mirar interfaces bonitas.

Mis configuraciones de VM fueron simples: 2 GB de RAM, 20 GB de disco. Configuré la red como "Bridged Adapter" para poder acceder a Ubuntu desde Windows.

## Primeros días: Descubriendo todo

Una vez instalado Ubuntu, lo primero que hice fue actualizar el sistema:

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
\`\`\`

Luego comencé a explorar el sistema de archivos. No hay lógica C:, D: como en Windows. Todo comienza desde un único directorio raíz (\`/\`). \`/home\` para archivos de usuario, \`/etc\` para archivos de configuración, \`/var\` para logs...

## Permisos: El corazón de Linux

Cuando no pude ejecutar un archivo, tuve que aprender sobre permisos. En Linux, cada archivo tiene un propietario y hay tres tipos de permisos: lectura (r), escritura (w), ejecución (x).

Las letras extrañas como \`-rw-r--r--\` en la salida de \`ls -l\` ahora tenían sentido. Dar permiso de ejecución a un script con \`chmod +x script.sh\`, control total con \`chmod 755\`... Esto se volvió un reflejo.

## Al final de dos semanas

Para el 21 de enero, tenía algo concreto: había completado los primeros 10 niveles de Bandit, mi propio servidor Ubuntu estaba funcionando, y conocía los comandos básicos de memoria.

Pero lo principal que aprendí fue: la mejor manera de aprender Linux es romper cosas. Toma snapshots, experimenta, rompe, restaura, intenta de nuevo.

Ahora es tiempo de configurar un servidor web. Apache y Nginx me esperan.

**Enlaces útiles:** [Juego Bandit](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
      `,
    },
  },
  {
    id: "2",
    slug: "ubuntu-apache-web-server",
    title: {
      tr: "Ubuntu'da Apache ile İlk Web Sitem",
      en: "My First Website with Apache on Ubuntu",
      ru: "Мой первый сайт на Apache в Ubuntu",
      zh: "在Ubuntu上用Apache搭建我的第一个网站",
      de: "Meine erste Website mit Apache auf Ubuntu",
      fr: "Mon premier site web avec Apache sur Ubuntu",
      ar: "موقعي الأول مع Apache على Ubuntu",
      es: "Mi primer sitio web con Apache en Ubuntu",
    },
    excerpt: {
      tr: "VirtualBox üzerinde Ubuntu sunucuda Apache kurulumu ve karşılaştığım hatalar. Port çakışmasından konfigürasyon sorunlarına kadar her şey.",
      en: "Apache installation on Ubuntu server in VirtualBox and the errors I encountered. From port conflicts to configuration issues.",
      ru: "Установка Apache на сервер Ubuntu в VirtualBox и ошибки, с которыми я столкнулся. От конфликтов портов до проблем с конфигурацией.",
      zh: "在VirtualBox上的Ubuntu服务器上安装Apache以及我遇到的错误。从端口冲突到配置问题。",
      de: "Apache-Installation auf Ubuntu-Server in VirtualBox und die Fehler, die ich erlebt habe. Von Port-Konflikten bis zu Konfigurationsproblemen.",
      fr: "Installation d'Apache sur serveur Ubuntu dans VirtualBox et les erreurs rencontrées. Des conflits de ports aux problèmes de configuration.",
      ar: "تثبيت Apache على خادم Ubuntu في VirtualBox والأخطاء التي واجهتها. من تعارض المنافذ إلى مشاكل الإعداد.",
      es: "Instalación de Apache en servidor Ubuntu en VirtualBox y los errores que encontré. Desde conflictos de puertos hasta problemas de configuración.",
    },
    date: "2025-01-22",
    readTime: {
      tr: "10 dk",
      en: "10 min",
      ru: "10 мин",
      zh: "10 分钟",
      de: "10 Min",
      fr: "10 min",
      ar: "10 دقائق",
      es: "10 min",
    },
    tags: ["linux", "apache", "web-server"],
    author: { name: "Azize" },
    content: {
      tr: `
Linux temellerini öğrendikten sonra sıra gerçek bir şey yapmaya geldi: web sunucusu kurmak. Hedefim basitti - Ubuntu VM'de bir web sitesi ayağa kaldırıp Windows'tan erişmek. Kulağa kolay geliyor, değil mi? Öyle olmadı.

## Apache Kurulumu: Kolay Kısım

[Apache](https://httpd.apache.org/) kurulumu gerçekten basitti:

\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
\`\`\`

\`active (running)\` yazısını görünce sevindim. Tarayıcıda VM'in IP'sini açtım ve... hiçbir şey. İşte macera burada başladı.

## İlk Hata: Port Çakışması

Apache'yi yeniden başlatmaya çalıştığımda terminalde kırmızı yazılar belirdi:

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

80 portu zaten kullanılıyordu. Kim kullanıyor diye baktım:

\`\`\`bash
sudo lsof -i :80
\`\`\`

Meğer daha önce test için kurduğum başka bir web sunucusu hala çalışıyormuş. İki seçenek vardı: onu durdurmak ya da Apache'nin portunu değiştirmek. Ben portu değiştirmeyi tercih ettim - \`/etc/apache2/ports.conf\` dosyasında \`Listen 80\` satırını \`Listen 8080\` yaptım.

## İkinci Hata: Typo!

Apache'yi başlattığımda yeni bir hata:

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

Dikkatli bakınca fark ettim: \`\${APACHE_LOG_DIR]\` - süslü parantez yerine köşeli parantez kullanmışım! Bir karakterlik hata, yarım saatimi aldı. \`sudo apache2ctl configtest\` komutunu öğrendim - her değişiklikten sonra syntax kontrolü yapmak şart.

## Web Sitesi Oluşturma

Hatalar çözülünce sıra içeriğe geldi. \`/var/www/mysite\` klasörü oluşturdum, basit bir HTML dosyası yazdım. Sonra Virtual Host yapılandırması:

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

\`a2ensite mysite.conf\` ile siteyi aktif ettim, \`a2dissite 000-default.conf\` ile varsayılanı kapattım. \`sudo systemctl reload apache2\` ve...

Windows tarayıcısında \`http://192.0.2.100:8080\` açtım. "Merhaba Dünya!" yazısını gördüğümde gerçekten mutlu oldum. Basit bir HTML sayfası ama benim için büyük bir adımdı.

## Öğrendiğim Şeyler

Bu deneyimden çıkardığım dersler:
- Hata mesajlarını **gerçekten** okumak önemli
- \`apache2ctl configtest\` her zaman kullan
- \`lsof -i :port\` ile port kontrolü yap
- Firewall'u unutma: \`sudo ufw allow 8080/tcp\`

Sırada Nginx var. Daha hafif, daha hızlı diyorlar. Bakalım.

**Faydalı linkler:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
      `,
      en: `
After learning Linux basics, it was time to do something real: set up a web server. My goal was simple - get a website running on Ubuntu VM and access it from Windows. Sounds easy, right? It wasn't.

## Apache Installation: The Easy Part

[Apache](https://httpd.apache.org/) installation was really simple:

\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
\`\`\`

I was happy when I saw \`active (running)\`. I opened the VM's IP in the browser and... nothing. That's where the adventure began.

## First Error: Port Conflict

When I tried to restart Apache, red text appeared in the terminal:

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

Port 80 was already in use. I checked who was using it:

\`\`\`bash
sudo lsof -i :80
\`\`\`

Turns out another web server I had installed earlier for testing was still running. I had two options: stop it or change Apache's port. I chose to change the port - changed \`Listen 80\` to \`Listen 8080\` in \`/etc/apache2/ports.conf\`.

## Second Error: Typo!

When I started Apache, a new error:

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

Looking carefully, I noticed: \`\${APACHE_LOG_DIR]\` - I had used a square bracket instead of a curly brace! A one-character error took half an hour of my time. I learned the \`sudo apache2ctl configtest\` command - syntax checking after every change is a must.

## Creating the Website

Once errors were resolved, it was time for content. I created the \`/var/www/mysite\` folder and wrote a simple HTML file. Then Virtual Host configuration:

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

I activated the site with \`a2ensite mysite.conf\`, disabled the default with \`a2dissite 000-default.conf\`. \`sudo systemctl reload apache2\` and...

I opened \`http://192.0.2.100:8080\` in the Windows browser. When I saw "Hello World!", I was really happy. A simple HTML page but a big step for me.

## Lessons Learned

Lessons from this experience:
- **Actually** reading error messages is important
- Always use \`apache2ctl configtest\`
- Check ports with \`lsof -i :port\`
- Don't forget the firewall: \`sudo ufw allow 8080/tcp\`

Nginx is next. They say it's lighter, faster. Let's see.

**Useful links:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
      `,
      ru: `
После изучения основ Linux пришло время сделать что-то реальное: настроить веб-сервер. Моя цель была проста - запустить сайт на Ubuntu VM и получить к нему доступ из Windows. Звучит легко, правда? Не тут-то было.

## Установка Apache: Простая часть

Установка [Apache](https://httpd.apache.org/) была действительно простой:

\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
\`\`\`

Я обрадовался, увидев \`active (running)\`. Открыл IP виртуальной машины в браузере и... ничего. Вот тут и началось приключение.

## Первая ошибка: Конфликт портов

Когда я попытался перезапустить Apache, в терминале появился красный текст:

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

Порт 80 уже был занят. Я проверил, кто его использует:

\`\`\`bash
sudo lsof -i :80
\`\`\`

Оказалось, что другой веб-сервер, который я установил ранее для тестирования, всё ещё работал. У меня было два варианта: остановить его или изменить порт Apache. Я выбрал изменение порта - поменял \`Listen 80\` на \`Listen 8080\` в \`/etc/apache2/ports.conf\`.

## Вторая ошибка: Опечатка!

Когда я запустил Apache, новая ошибка:

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

Внимательно посмотрев, я заметил: \`\${APACHE_LOG_DIR]\` - я использовал квадратную скобку вместо фигурной! Ошибка в один символ отняла полчаса моего времени. Я узнал команду \`sudo apache2ctl configtest\` - проверка синтаксиса после каждого изменения обязательна.

## Создание сайта

Когда ошибки были устранены, пришло время для контента. Я создал папку \`/var/www/mysite\` и написал простой HTML-файл. Затем настройка Virtual Host:

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

Активировал сайт командой \`a2ensite mysite.conf\`, отключил стандартный через \`a2dissite 000-default.conf\`. \`sudo systemctl reload apache2\` и...

Открыл \`http://192.0.2.100:8080\` в браузере Windows. Когда увидел "Привет, мир!", был по-настоящему счастлив. Простая HTML-страница, но большой шаг для меня.

## Уроки

Выводы из этого опыта:
- **Действительно** читать сообщения об ошибках важно
- Всегда используй \`apache2ctl configtest\`
- Проверяй порты с \`lsof -i :port\`
- Не забывай про файрвол: \`sudo ufw allow 8080/tcp\`

Следующий - Nginx. Говорят, он легче и быстрее. Посмотрим.

**Полезные ссылки:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
      `,
      zh: `
学习了Linux基础之后，是时候做一些真正的事情了：搭建Web服务器。我的目标很简单——在Ubuntu虚拟机上运行一个网站，并从Windows访问它。听起来很简单，对吧？并没有。

## Apache安装：简单的部分

[Apache](https://httpd.apache.org/)的安装真的很简单：

\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
\`\`\`

看到\`active (running)\`我很高兴。我在浏览器中打开虚拟机的IP，然后...什么都没有。冒险就此开始。

## 第一个错误：端口冲突

当我尝试重启Apache时，终端出现红色文字：

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

80端口已被占用。我检查了谁在使用它：

\`\`\`bash
sudo lsof -i :80
\`\`\`

原来我之前为测试安装的另一个Web服务器还在运行。我有两个选择：停止它或更改Apache的端口。我选择更改端口——将\`/etc/apache2/ports.conf\`中的\`Listen 80\`改为\`Listen 8080\`。

## 第二个错误：打字错误！

当我启动Apache时，新的错误：

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

仔细看，我注意到：\`\${APACHE_LOG_DIR]\`——我用了方括号而不是花括号！一个字符的错误花了我半小时。我学会了\`sudo apache2ctl configtest\`命令——每次更改后进行语法检查是必须的。

## 创建网站

错误解决后，是时候创建内容了。我创建了\`/var/www/mysite\`文件夹并写了一个简单的HTML文件。然后是虚拟主机配置：

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

用\`a2ensite mysite.conf\`激活网站，用\`a2dissite 000-default.conf\`禁用默认站点。\`sudo systemctl reload apache2\`然后...

我在Windows浏览器中打开\`http://192.0.2.100:8080\`。当我看到"Hello World!"时，真的很高兴。一个简单的HTML页面，但对我来说是一大步。

## 经验教训

从这次经历中得到的教训：
- **真正**阅读错误信息很重要
- 始终使用\`apache2ctl configtest\`
- 用\`lsof -i :port\`检查端口
- 不要忘记防火墙：\`sudo ufw allow 8080/tcp\`

下一个是Nginx。他们说它更轻、更快。让我们看看。

**有用链接：** [Apache文档](https://httpd.apache.org/docs/) | [Ubuntu服务器指南](https://ubuntu.com/server/docs)
      `,
      de: `
Nach dem Erlernen der Linux-Grundlagen war es Zeit, etwas Echtes zu tun: einen Webserver einrichten. Mein Ziel war einfach - eine Website auf Ubuntu VM zum Laufen bringen und von Windows darauf zugreifen. Klingt einfach, oder? War es nicht.

## Apache-Installation: Der einfache Teil

Die [Apache](https://httpd.apache.org/)-Installation war wirklich einfach:

\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
\`\`\`

Ich freute mich, als ich \`active (running)\` sah. Ich öffnete die IP der VM im Browser und... nichts. Dort begann das Abenteuer.

## Erster Fehler: Port-Konflikt

Als ich versuchte, Apache neu zu starten, erschien roter Text im Terminal:

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

Port 80 war bereits in Verwendung. Ich prüfte, wer ihn benutzte:

\`\`\`bash
sudo lsof -i :80
\`\`\`

Es stellte sich heraus, dass ein anderer Webserver, den ich früher zum Testen installiert hatte, noch lief. Ich hatte zwei Optionen: ihn stoppen oder Apaches Port ändern. Ich entschied mich für die Portänderung - änderte \`Listen 80\` zu \`Listen 8080\` in \`/etc/apache2/ports.conf\`.

## Zweiter Fehler: Tippfehler!

Als ich Apache startete, ein neuer Fehler:

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

Bei genauerem Hinsehen bemerkte ich: \`\${APACHE_LOG_DIR]\` - ich hatte eine eckige Klammer statt einer geschweiften verwendet! Ein Ein-Zeichen-Fehler kostete mich eine halbe Stunde. Ich lernte den Befehl \`sudo apache2ctl configtest\` - Syntaxprüfung nach jeder Änderung ist ein Muss.

## Die Website erstellen

Sobald die Fehler behoben waren, war es Zeit für Inhalt. Ich erstellte den Ordner \`/var/www/mysite\` und schrieb eine einfache HTML-Datei. Dann die Virtual Host-Konfiguration:

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

Ich aktivierte die Site mit \`a2ensite mysite.conf\`, deaktivierte die Standardseite mit \`a2dissite 000-default.conf\`. \`sudo systemctl reload apache2\` und...

Ich öffnete \`http://192.0.2.100:8080\` im Windows-Browser. Als ich "Hallo Welt!" sah, war ich wirklich glücklich. Eine einfache HTML-Seite, aber ein großer Schritt für mich.

## Gelernte Lektionen

Lektionen aus dieser Erfahrung:
- Fehlermeldungen **wirklich** zu lesen ist wichtig
- Immer \`apache2ctl configtest\` verwenden
- Ports mit \`lsof -i :port\` prüfen
- Firewall nicht vergessen: \`sudo ufw allow 8080/tcp\`

Als nächstes kommt Nginx. Sie sagen, er ist leichter und schneller. Mal sehen.

**Nützliche Links:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
      `,
      fr: `
Après avoir appris les bases de Linux, il était temps de faire quelque chose de concret : configurer un serveur web. Mon objectif était simple - faire fonctionner un site web sur Ubuntu VM et y accéder depuis Windows. Ça semble facile, non ? Ça ne l'était pas.

## Installation d'Apache : La partie facile

L'installation d'[Apache](https://httpd.apache.org/) était vraiment simple :

\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
\`\`\`

J'étais content de voir \`active (running)\`. J'ai ouvert l'IP de la VM dans le navigateur et... rien. C'est là que l'aventure a commencé.

## Première erreur : Conflit de port

Quand j'ai essayé de redémarrer Apache, du texte rouge est apparu dans le terminal :

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

Le port 80 était déjà utilisé. J'ai vérifié qui l'utilisait :

\`\`\`bash
sudo lsof -i :80
\`\`\`

Il s'avère qu'un autre serveur web que j'avais installé plus tôt pour des tests tournait encore. J'avais deux options : l'arrêter ou changer le port d'Apache. J'ai choisi de changer le port - changé \`Listen 80\` en \`Listen 8080\` dans \`/etc/apache2/ports.conf\`.

## Deuxième erreur : Faute de frappe !

Quand j'ai démarré Apache, une nouvelle erreur :

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

En regardant attentivement, j'ai remarqué : \`\${APACHE_LOG_DIR]\` - j'avais utilisé un crochet au lieu d'une accolade ! Une erreur d'un caractère m'a pris une demi-heure. J'ai appris la commande \`sudo apache2ctl configtest\` - la vérification de syntaxe après chaque modification est indispensable.

## Création du site web

Une fois les erreurs résolues, il était temps pour le contenu. J'ai créé le dossier \`/var/www/mysite\` et écrit un simple fichier HTML. Puis la configuration Virtual Host :

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

J'ai activé le site avec \`a2ensite mysite.conf\`, désactivé celui par défaut avec \`a2dissite 000-default.conf\`. \`sudo systemctl reload apache2\` et...

J'ai ouvert \`http://192.0.2.100:8080\` dans le navigateur Windows. Quand j'ai vu "Bonjour le monde !", j'étais vraiment heureux. Une simple page HTML mais un grand pas pour moi.

## Leçons apprises

Les leçons de cette expérience :
- **Vraiment** lire les messages d'erreur est important
- Toujours utiliser \`apache2ctl configtest\`
- Vérifier les ports avec \`lsof -i :port\`
- Ne pas oublier le pare-feu : \`sudo ufw allow 8080/tcp\`

Nginx est le suivant. On dit qu'il est plus léger, plus rapide. On verra.

**Liens utiles :** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
      `,
      ar: `
بعد تعلم أساسيات Linux، حان الوقت لفعل شيء حقيقي: إعداد خادم ويب. كان هدفي بسيطاً - تشغيل موقع ويب على Ubuntu VM والوصول إليه من Windows. يبدو سهلاً، أليس كذلك؟ لم يكن كذلك.

## تثبيت Apache: الجزء السهل

كان تثبيت [Apache](https://httpd.apache.org/) بسيطاً حقاً:

\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
\`\`\`

فرحت عندما رأيت \`active (running)\`. فتحت IP الـ VM في المتصفح و... لا شيء. هنا بدأت المغامرة.

## الخطأ الأول: تعارض المنافذ

عندما حاولت إعادة تشغيل Apache، ظهر نص أحمر في الطرفية:

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

المنفذ 80 كان مستخدماً بالفعل. تحققت من يستخدمه:

\`\`\`bash
sudo lsof -i :80
\`\`\`

اتضح أن خادم ويب آخر كنت قد ثبته سابقاً للاختبار كان لا يزال يعمل. كان لدي خياران: إيقافه أو تغيير منفذ Apache. اخترت تغيير المنفذ - غيرت \`Listen 80\` إلى \`Listen 8080\` في \`/etc/apache2/ports.conf\`.

## الخطأ الثاني: خطأ مطبعي!

عندما شغلت Apache، خطأ جديد:

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

بالنظر بعناية، لاحظت: \`\${APACHE_LOG_DIR]\` - استخدمت قوس مربع بدلاً من قوس منحني! خطأ حرف واحد أخذ نصف ساعة من وقتي. تعلمت الأمر \`sudo apache2ctl configtest\` - فحص الصياغة بعد كل تغيير ضروري.

## إنشاء الموقع

بعد حل الأخطاء، حان وقت المحتوى. أنشأت مجلد \`/var/www/mysite\` وكتبت ملف HTML بسيط. ثم تكوين Virtual Host:

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

فعّلت الموقع بـ \`a2ensite mysite.conf\`، وأوقفت الافتراضي بـ \`a2dissite 000-default.conf\`. \`sudo systemctl reload apache2\` ثم...

فتحت \`http://192.0.2.100:8080\` في متصفح Windows. عندما رأيت "مرحباً بالعالم!"، كنت سعيداً حقاً. صفحة HTML بسيطة لكنها خطوة كبيرة بالنسبة لي.

## الدروس المستفادة

دروس من هذه التجربة:
- قراءة رسائل الخطأ **فعلياً** مهم
- استخدم دائماً \`apache2ctl configtest\`
- تحقق من المنافذ بـ \`lsof -i :port\`
- لا تنس جدار الحماية: \`sudo ufw allow 8080/tcp\`

التالي هو Nginx. يقولون أنه أخف وأسرع. لنرى.

**روابط مفيدة:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
      `,
      es: `
Después de aprender los fundamentos de Linux, era hora de hacer algo real: configurar un servidor web. Mi objetivo era simple - tener un sitio web funcionando en Ubuntu VM y acceder desde Windows. Suena fácil, ¿verdad? No lo fue.

## Instalación de Apache: La parte fácil

La instalación de [Apache](https://httpd.apache.org/) fue realmente simple:

\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
\`\`\`

Me alegré cuando vi \`active (running)\`. Abrí la IP de la VM en el navegador y... nada. Ahí es donde comenzó la aventura.

## Primer error: Conflicto de puertos

Cuando intenté reiniciar Apache, apareció texto rojo en la terminal:

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

El puerto 80 ya estaba en uso. Comprobé quién lo estaba usando:

\`\`\`bash
sudo lsof -i :80
\`\`\`

Resulta que otro servidor web que había instalado antes para pruebas todavía estaba ejecutándose. Tenía dos opciones: detenerlo o cambiar el puerto de Apache. Elegí cambiar el puerto - cambié \`Listen 80\` a \`Listen 8080\` en \`/etc/apache2/ports.conf\`.

## Segundo error: ¡Error tipográfico!

Cuando inicié Apache, un nuevo error:

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

Mirando cuidadosamente, noté: \`\${APACHE_LOG_DIR]\` - ¡había usado un corchete en lugar de una llave! Un error de un carácter me tomó media hora. Aprendí el comando \`sudo apache2ctl configtest\` - la verificación de sintaxis después de cada cambio es imprescindible.

## Creando el sitio web

Una vez resueltos los errores, era hora del contenido. Creé la carpeta \`/var/www/mysite\` y escribí un archivo HTML simple. Luego la configuración de Virtual Host:

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

Activé el sitio con \`a2ensite mysite.conf\`, desactivé el predeterminado con \`a2dissite 000-default.conf\`. \`sudo systemctl reload apache2\` y...

Abrí \`http://192.0.2.100:8080\` en el navegador de Windows. Cuando vi "¡Hola Mundo!", estaba realmente feliz. Una simple página HTML pero un gran paso para mí.

## Lecciones aprendidas

Lecciones de esta experiencia:
- Leer **realmente** los mensajes de error es importante
- Siempre usa \`apache2ctl configtest\`
- Verifica puertos con \`lsof -i :port\`
- No olvides el firewall: \`sudo ufw allow 8080/tcp\`

El siguiente es Nginx. Dicen que es más ligero y rápido. Veamos.

**Enlaces útiles:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
      `,
    },
  },
  // More posts will be added - for now using Turkish content as fallback
];

// Helper function to get localized post
function getLocalizedPost(post: BlogPostData, locale: Locale): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title[locale] || post.title.en || post.title.tr,
    excerpt: post.excerpt[locale] || post.excerpt.en || post.excerpt.tr,
    content: post.content[locale] || post.content.en || post.content.tr,
    date: post.date,
    readTime: post.readTime[locale] || post.readTime.en || post.readTime.tr,
    tags: post.tags,
    author: post.author,
  };
}

// Get all posts for a specific locale
export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPostsData.map((post) => getLocalizedPost(post, locale));
}

// Get post by slug for a specific locale
export function getPostBySlug(
  slug: string,
  locale: Locale
): BlogPost | undefined {
  const post = blogPostsData.find((p) => p.slug === slug);
  return post ? getLocalizedPost(post, locale) : undefined;
}

// Get posts by tag for a specific locale
export function getPostsByTag(tag: string, locale: Locale): BlogPost[] {
  return blogPostsData
    .filter((post) => post.tags.includes(tag))
    .map((post) => getLocalizedPost(post, locale));
}

// Get all unique tags
export const allTags = Array.from(
  new Set(blogPostsData.flatMap((post) => post.tags))
);

// For backward compatibility - get posts in Turkish by default
export const blogPosts = getBlogPosts("tr");
