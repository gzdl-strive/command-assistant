## 目录和文件
>文件系统——树，树干是/(根)目录，树枝是子目录，树枝的最后是树叶(文件)

严谨的说，文件名是由**目录+文件名**组成的
对于目录和文件，有一些约定的表述，以`/usr/local/nginx/conf/nginx.conf`为例

1. **全路径文件名**包含了完整的目录名和文件名，即`/usr/local/nginx/conf/nginx.conf`，还有一个称呼是“**绝对路径文件名**”
2. `nginx.conf`是文件名，它在`/usr/local/nginx/conf`目录中
3. **目录和文件的绝对路径是从根(/)**开始算起，在任何时候都不会有歧义
4. 登录Linux后，一定处在目录树的某一个目录中，这个目录称为“**当前工作目录**”，简称“**当前目录**”
5. 目录和文件的**相对路径**是**从当前目录算起**
6. linux命令操作目录和文件时，采用绝对路径和相对路径都可以
7. 一个圆点`.`表示当前工作目录
8. 两个圆点`..`当前当前工作目录的上一级目录

- 清除命令: `clear`
- 查看IP: `ip addr`
- 查看日期: `date` 
- 查看当前工作目录: `pwd`
- 改变目录: `cd`
  - 进入指定目录: `cd /usr`
  - 进入上一级目录: `cd ..`
  - 进入用户主目录: `cd`

## 查看
```bash
# 列出当前目录下的目录或文件
ls
# 列出当前目录下的目录或文件的详细信息
ls -l
# 列出指定目录下的目录或文件
ls /usr
# 列出指定目录下的目录或文件的详细信息
ls -l /usr
```

**`ll`结果解析**
1. 第一列表示文件类型加权限
    - 第一个字符为文件类型：(**d表示目录**、**-表示文件**、l表示软连接、c表示字符设备文件)
    - 后面的字符分为三组，每三个一组
       - 所有者u (r表示可读、w表示可写、x表示可执行)
       - 所属组g (r表示可读、w表示可写、x表示可执行)
       - 其他人o (r表示可读、w表示可写、x表示可执行)
2. 第二列为硬链接的引用次数
3. 第三列是文件的拥有者账户。只能有一个
4. 第四列是文件的拥有者账户所在组，只能有一个
5. 第五列表示文件所占有的字节数
6. 第六列是文件的最后修改时间
7. 第七列是文件名

## 删除
```bash
rm [-rf] 目录或文件列表
```
- 选项`-r`可以删除目录，如果没有`-r`选项就只能删除文件
- 选项`-f`表示强制删除，无需确认

```bash
# 使用正则来模糊匹配
# *任意字符，?表示一个字符
ls -l *.txt

# 按时间降序显示
ls -lt

# 删除文件命令
rm aaa.txt

# 删除目录/文件命令
rm -r xxx

# 直接删除，目录/文件，无需二次确认
rm -rf xxx

# 显示当前路径
pwd
```

## 移动
```bash
mv 旧目录或文件名 新目录或文件名
```
>如果第二个参数是已经存在的目录，则把第一个参数(旧目录/文件名)移动到该目录中

```bash
# 重命名文件
mv a.txt a2.txt

# 重命名目录
mv aaa bbb

# 已存在目录bbb，移动文件到该目录中
mv a.txt bbb/a2.txt

# 不存在目录bbb，将当前文件修改为bbb/a2.txt
mv a.txt bbb/a2.txt
```

## 拷贝
```bash
cp [-r] 旧目录或文件名 新目录或文件名
```
>选项`-r`可以复制目录，如果没有`-r`只能复制文件

```bash
# 将当前工作目录下的a.html复制一份，命名为a_bak.html
cp a.html a_bak.html

# 将当前工作目录下的aaa目录复制一份，命名为bbb
cp -r aaa bbb

# 将当前工作目录下的a.html复制一份，存放到指定目录bbb中，并命名为a_bak.html
cp a.html bbb/a_bak.html
cp a.html bbb # 等同于上一条命令，不同的是上一条可以重新命名文件名

# 将当前工作目录下的aaa目录复制一份，存放到bbb中
cp -r aaa bbb/aaa_bak
cp -r aaa bbb # 等同于上一条命令，不同的是上一条可以重新命名目录
```

## 打包压缩/解压
>`tar`命令用来打包压缩和解压文件

>**压缩语法**: `tar zcvf 压缩包文件名 目录或文件名列表`


```bash
# 将当前工作目录中的aaa、bbb和ccc目录打包压缩成abc.tgz文件。
tar zcvf abc.tgz aaa bbb ccc

# 将/home/web/vite、/home/web/react、/home/web/vue目录打包压缩成/data/tmp/web.tgz
tar zcvf /data/tmp/web.tgz /home/web/vite /home/web/react /home/web/vue
```

>**解压语法**: `tar zxvf 压缩包文件名`
```bash
# 将abc.tgz压缩包解压在当前工作目录下解压
tar zxvf /tmp/abc.tgz

# 将/data/tmp/web.tgz压缩包在/test/tmp目录下解压
cd /test/tmp
tar zxvf /data/tmp/web.tgz
```

**注意**
- 用`tar`命令压缩和解压的目录和文件没有绝对路径的说法，都成了相对的，在包中相对的。
- 用`tar`命令打包的文件，用`winrar`可以解开
- 在`linux系统`中，还有其它打包/解压命令，例如`zip/unzip`和`gzip/gunzip`

## 判断网络是否连通
>`ping`用于确定本地主机是否能与另一台主机成功交换数据包，判断网络是否通畅

- window系统：`ping -n 包的个数 ip地址或域名`
- linux系统：`ping -c 包的个数 ip地址或域名`

```bash
# 向新浪(www.sina.com.cn)的服务器ping5个包
ping -c 5 www.sina.com.cn

# 向谷歌(www.google.com)服务器ping5个包
ping -c 5 www.google.com
```

## 文件操作
### 显示文件内容
>显示文本文件的内容由三个命令: cat、more和tail

- cat命令能一次显示整个文件的内容
```bash
cat 文件名
```

>为了方便阅读，more命令分页显示文件的内容，按空格键显示下一页，按b键显示上一页，按q键退出.
```bash
more 文件名
```

>`tail -f`用于显示文本文件的最后几行，如果文件的内容有增加，就实时的刷新。`tail -f`可以动态显示后台服务程序的日志，用于调试和跟踪程序的运行。
```bash
tail -f 文件名
```

### 统计文本文件的行数、单词数和行数
```bash
wc 文件名

# 统计当前工作目录下的c.html文件的行数、单词数和字节数
wc c.html
```

### 搜索文件中的内容
```bash
grep "内容" 文件名

# 在*.html文件中搜索title
grep title *.html
```
>如果内容中没有空格等特殊字符，可以不用双引号括起来

### 搜索文件
```bash
find 目录名 -name 文件名 -print
```

- 目录名: 待搜索目录，搜索文件时，除了目录名，还包括它的各级子目录
- 文件名：待搜索文件名匹配的规则

```bash
# 从/data目录开始搜索，将全部的c.html文件显示出来
find /data -name c.html -print
# 从当前工作目录开始搜索，将全部的c.html文件显示出来
find . -name c.html -print
```

## 用户/用户组
### 增加/删除用户组
```bash
# 新增用户组
groupadd 组名
# 删除用户组
groupdel 组名
```

### 增加/删除用户
```bash
# 新增用户
useradd -n 用户名 -g 组名 -d 用户的主目录
# 删除用户
userdel 用户名

# 新增一个用户，用户名为vvv, 属于vitv组，用户的主目录是/root/cs
useradd -n vvv -g vitv -d /root/cs
# 删除用户vvv
userdel vvv
```

### 修改用户的密码
>语法：`passwd [用户名]`

- 修改用户的密码，按提示两次输入新密码，如果两次输入一致就修改成功
- **普通用户**只能修改自己的密码，只输入passwd即可，不能指定用户名。
- 系统管理员可以修改任何用户的密码，passwd后需要指的用户名

### 切换用户
>语法：`su - 用户名`

- 从root用户切换到普通用户不需要输入密码
- 从普通用户切换到任何用户都需要输入密码

## 查看系统磁盘空间
```bash
df [-h] [-T]
```
- 选项`-h`以方便阅读的方式显示信息
- 选项`-T`列出文件系统类型

## 向文件写入或追加内容
```bash
# 在窗口输出指定内容
echo "xxx"
echo 'xxx'

# 向文件中写入内容(文件原先的内容会被覆盖掉)
echo "xxx" > 文件名

# 向文件追加内容
echo "xxx" >> 文件名
```

## 修改文件权限

>控制用户对文件的权限的命令`chmod(change mode)`

### 语法1-字母法: `chmod u/g/o/a +/-/= rwx 文件`

- `u/g/o/a` => 文件所有者/所有者所在用户组/其它人/三者都是
- `+/-/=` => 增加权限/撤销权限/设定权限

```bash
# 对b.txt，给所有者增加执行权限
chmod u+x b.txt

# 对b.txt，给用户组设定权限为可读，不可写，可执行
chmod g=rx b.txt
```

### 语法2-数字法: `chmod rwx 文件`(rwx用数字代替)

| 字符 | 描述 |
|:---:|:----:|
| r | 读取权限、"4" |
| w | 写入权限、"2" |
| x | 执行权限、"1" |
| - | 无权限、"0" |

```bash
# 对b.txt,给它添加权限为7 5 4
chmod 754 b.txt
```