## FTP服务介绍
>`ftp(File Transfer Protocol——文件传输协议)`是基于`TCP/IP`协议的应用层协议，用于文件的传输，包括ftp服务端和ftp客户端.

FTP客户端于服务器创建网络连接，请求登录服务器，登录成功后，就可以进行文件传输，主要包括**下载文件**和**上传文件**两种操作。

### FTP两种模式

- `port模式(主动模式)`和`pasv模式(被动模式)`
  - 主动模式：FTP请求是由客户端发起TCP连接的；传输数据时，TCP连接却是由服务端发起的；
  - 被动模式：FTP请求和传输数据，都是由客户端向服务端发起TCP连接的；
- 共享上网环境下，只能使用被动模式，不能使用主动模式

## vsftpd和ftp
>`vsftpd(very secure FTP daemon)`是众多Linux发行版中默认的FTP服务器。

**在云服务器(centos7.6)中搭建FTP服务器——vsftpd**
1. 登录云服务器(使用服务器提供商提供的方法或者使用SHH登录都行、或者使用远程软件登录)
2. 安装vsftpd => `yum install -y vsftpd`
3. 设置vsftpd开机自启用 => `systemctl enable vsftpd`
4. 启动vsftpd => `systemctl start vsftpd`
5. 检查服务是否启用 => `netstat -antup | grep ftp`

>备注：`vsftpd`默认开启匿名访问模式，无需通过用户名和密码即可登录FTP服务器。使用此方式登录FTP服务器的用户没有修改或上传文件的权限。

### 配置`vsftpd`
1. 为FTP服务创建一个Linux用户 => `useradd ftpuser`
2. 设置Linux用户的密码 => `passwd ftpuser`
3. 创建FTP服务使用的文件目录 => `mkdir /data_file/ftp`
4. 修改目录权限 => `chown -R ftpuser:ftpuser /data_file/ftp`
5. 编辑`vsftpd.conf`配置文件 => `vim /etc/vsftpd/vsftpd.conf` => **配置被动模式**
6. 设置匿名用户和本地用户的登录权限，设置指定例外用户列表文件的路径，并开启监听`IPV4 sockets`
7. 关闭监听`IPV6 sockets`
8. 添加配置，开启被动模式，设置本地用户登录后所在目录，以及云服务其建立数据传输可使用的端口范围值
9. 创建chroot_list文件 => `vim /etc/vsftpd/chroot_list`
10. 编辑chroot_list文件，输入用户名，**一个用户名占据一行**，设置完成退出并保存
11. 重启`vsftpd` => `systemctl restart vsftpd`
```bash
# 步骤6
anonymous_enable=NO
local_enable=YES
write_enable=YES
chroot_local_user=YES
chroot_list_enable=YES
chroot_list_file=/etc/vsftpd/chroot_list
listen=YES

# 步骤7
# listen_ipv6=YES

# 步骤8
local_root=/data_file/ftp
allow_writeable_chroot=YES
pasv_enable=YES
pasv_address=xxx.xx.xxx.xx # Linux云服务器公网IP
pasv_min_port=40000 # 可用端口最小值
pasv_max_port=45000 # 可用端口最大值
```

>设置的用户将会被锁定在主目录，如果没有设置例外用户的需求，可跳过此步骤.

### 设置安全组
  * 主动模式：放通端口21
  * 被动模式：放通端口21，以及配置文件中设置的`pasv_min_port`到`pasv_max_port`之间的所有端口
### 验证FTP服务
  * 客户端`IE浏览器`
  * 客户端计算机，路径栏访问`fpt://云服务器公网IP:21`
在弹出的登录身份窗口输入配置的用户名和密码，登录成功后，即可上传和下载文件

### `vsftpd`服务命令
- 启动服务：`systemctl start vsftpd`
- 停止服务：`systemctl stop vsftpd`
- 重启服务：`systemctl restart vsftpd`
- 查看服务状态：`systemctl status vsftpd`
- 启用开启自启动服务：`systemctl enable vsftpd`
- 禁用开机子启用服务：`systemctl disable vsftpd`

## 登录服务器
* `ftp 服务器ip地址`，回车后输入用户名和密码`ftp xx.xxx.xx.xx`
* 输入`ftp`，用`open 服务器ip地址`，脸上服务器后在输入用户名和密码

```bash
ftp
open xx.xxx.xx.xx
```

* `ftp -n 服务器ip地址`，再输入`user 用户名 密码`登录
```bash
ftp -n xx.xxx.xxx.xx
user ftpuser xxxxxx
```

## 切换工作目录
1. 查看工作目录——`pwd`
2. 切换工作目录——`cd 目录名`
3. 切换本地工作目录——`lcd 目录名`

## 查看服务器上的目录和文件
1. 列出目录或文件名的详细信息 => `ls 目录或文件名`或`dir 目录或文件名`
2. 仅列出目录和文件名 => `nlist 目录或文件名 [本地文件名]`
3. 查看文件内容 => `cat 文件名`

## 文件的上传与下载
**文件传输的模式**
>ftp的传输模式分为**二进制**和**ASCII码**两种模式，二进制可以传输任何文件，包括压缩包、可执行程序、图片、视频、音视频等，而ASCII模式只能传输`.txt、.html`等ASCII码文件(文本文件)。

- 查看当前传输模式 => `type`
- 设定传输模式为二进制 => `bin`
- 设定传输模式为ASCII => `ascii`

**下载文件**
- 下载单个文件：`get|recv 服务器文件名 [本地文件名]`
a) 下载文件使用get或recv均可
b) 文件名不允许使用通配符
c) 服务器文件名和本地文件名可以用绝对路径，如果不写路径，表示当前工作目录
d) 如果本地文件名省略不写，表示将服务器文件下载到本地的当前工作目录，文件名与服务器文件名相同
**本地文件名表示下载到本地时的文件名字**

- 下载多个文件：`mget 服务器文件1 服务器文件2 服务器文件3 ... 服务器文件n`
a) 多下载的文件名，可以一一列出来(用空格分隔)，也可以使用通配符
b) 下载的文件，存在在本地工作目录中
c) 下载文件时，回一一提示，如果向关闭都显示信息，先输入prompt命令
```bash
prompt
mget src/*
```

## 其它FTP命令
- 重命名服务器上的文件 => `rename 旧文件名 新文件名`
- 删除ftp服务器上单个文件 => `delete 文件名`
- 删除多个文件 => `mdelete 文件名1 文件名2 ... 文件名n`
- 在服务器上创建目录 => `mkdir pathname`
- 删除服务器上的目录 => `rmdir pathname`
- 切换传输模式 => `passive` => 被动模式和主动模式的切换
- 显示帮助信息 => `help [命令名]`
- 退出fpt => `bye`