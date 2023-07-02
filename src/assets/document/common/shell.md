## Shell简介
>Shell是一个**命令解释器**，位于操作系统和应用程序之间，作为他们二者的接口，负责**解释并执行用户输入的命令**.

- Shell可以用于交互式输入和执行命令，也可以用于运行脚本
- 在Linux系统中，Shell是一个常见的命令解释器，可以通过命令行界面（如bash）来访问

>`Shell`是一块包裹着系统核心的壳，处理操作系统的最外层，与用户直接对话，将用户的输入，**解释**给操作系统，然后处理操作系统的输出结果，输出到屏幕与用户看到结果。

## Shell脚本
>Shell脚本是一种可执行文件，它可以包含一组命令和语句(多条Linux命令以及循环控制语句)，以便自动执行一系列任务.

通过使用Shell脚本，可以批量处理任务，自动化执行命令，节省时间和精力

**Shebang**
>出现在文件的第一行的前两个字符`#!`
>作用：告诉操作系统使用哪个解释器来执行脚本

- 如果未指定`shebang`, 脚本执行时，默认用当前shell去解释脚本，即`$SHELL`
- 如果`#!`指定的解释程序没有可执行权限，则会报错`"bad interpreter: Permission denied"`
- 如果`#!`指定的解释程序不是一个可执行文件，那么指定的可执行权限就会被忽略，转而交给当前的SHELL去执行这个脚本
- 如果`#!`指定的解释程序不存在，那么会报错`"bad interpreter: No such file or directory"`
- `#!`后面的解释程序，需要写**绝对路径**，不是不会自动到$PATH中去寻找解释器的.
- 如果直接使用`bash test.sh`这样的命令来执行脚本，那么`#!`这一行会被忽略掉.

>使用`#`来注释，可以单独一行，也可以跟在数据后面，最好使用英文来进行注释。

>Shell语言(弱类型语言)定义的变量，默认都是字符串类型

**`Shell`的优势**
对于Linux操作系统而言，shell时最好的工具，linux底层命令都支持shell语句，以及结合三剑客(`grep`、`sed`、`awk`)进行高级用法.
  - 擅长系统管理脚本开发，如软件启停、监控报警脚本、日志分析脚本

### Bash命令历史
```bash
# 查看命令历史
history

# 设置历史命令记录的条数，即历史命令记录文件中的命令数据
echo $HISTSIZE

# 指定了存放历史命令的文件
echo $HISTFILE

# 清除历史
history -c

# 恢复历史
history -r

# !历史id,快速执行历史命令
!124

# !! 执行上次命令(可以通过方向键来选择)
!!
```

### bash特性汇总
1. 命令补全(文件路径、命令)
2. 快捷键(`ctrl + a, e, u, k, l`)
  - `ctrl + l`: 快速清屏
3. 通配符
4. 命令历史
5. 命令别名
6. 命令行展开

## Shell变量
>变量是暂时存储数据的地方，是一种数据标记，数据存储在内容空间，通过调用正确的名字，即可取出对应的值

- 变量定义与赋值，注意变量与值之间不能有空格
- 变量类型都为字符串

- 单引号变量，不识别特殊语法
- 双引号变量，可以识别特殊语法
```bash
[root@VM-4-11-centos ~]# name="张三"
[root@VM-4-11-centos ~]# echo $name
张三
[root@VM-4-11-centos ~]# name2='${name}'
[root@VM-4-11-centos ~]# echo $name2
${name}
[root@VM-4-11-centos ~]# name3="${name}"
[root@VM-4-11-centos ~]# echo $name3
张三
```
**变量名规则**
- 名称定义要做到见名知意，不得引用保留关键字(help检查保留字)
- 只能包含数字、字母、下划线
- 不能以数字开头
- 不能用标点符号
- 变量名严格区分大小写

**变量的作用域**
>本地变量：只针对当前的Shell进程
```bash
# 显示进程树
pstree

# sshd进程的主要作用是在服务器上监听SSH连接请求

# exit可以退出当前进程(如果当前进程是bash可以退出当前bash，如果当前进程是sshd,那么会直接断开连接)

# 建立一个新的bash进程
bash

# 退出当前进程
exit
```

>环境变量(全局变量): 针对当前shell以及任意子进程(例如: `echo $PATH`)
>位置参数变量: 用于shell脚本中传递的参数(`ls -l /data`中的-l就是位置参数变量)
>特殊变量: shell内置的特殊功效变量(例如：`$?`(`0：成功`,`1-255: 错误码`))

- 每次调用bash都会开启一个子shell，因此不保留当前shell变量
- 通过调用source是在当前shell环境加载脚本，因此保留变量

- `whoami`: 显示当前用户名
- 反引号`linux命令`: 将结果写入变量
**小案例**
```bash
[root@VM-4-11-centos shell]# cat test.sh
user1=`whoami`
[root@VM-4-11-centos shell]# sh test.sh
[root@VM-4-11-centos shell]# echo $user1

A. 当前用户
B. 空(✔) # sh/bash会开启子进程，不保存变量
```

## Shell环境变量
>环境变量一般指的是export内置命令导出的变量
>环境变量可以在命令行中临时创建，但是用户退出shell终端，变量即丢失，如果需要永久生效，需要修改环境配置文件
- 用户个人配置文件`~/.bash_profile`、`~/.bashrc`远程登录用户特有文件
- 全局配置文件`/etc/profile`、`/etc/bashrc`，系统建议最好创建在`/etc/profile.d/`，而非直接修改主文件，修改全局配置文件，影响所有登录系统的用户

>每个用户都有自己的环境变量配置文件，以个人配置文件优先加载、读取并生效

**检查系统环境变量的命令**
- `set`: 输出(当前shell环境中)所有变量，包括全局变量、局部变量
- `env`: 只显示全局变量
- `declare`: 输出所有变量，如同set
- `export`: 显示和设置环境变量值

**撤销变量**
`unset 变量名`: 删除变量/函数

**设置只读变量**
`readonly`: 只有shell结束，只读变量失效
```bash
[root@VM-4-11-centos shell]# readonly name="张三"
[root@VM-4-11-centos shell]# name="李四"
-bash: name: readonly variable
```

>**`bash`**支持多命令执行
```bash
[root@VM-4-11-centos shell]# ls /data; cd/data
```

## Shell特殊参数变量
shell的特殊变量，用在如脚本、函数传递参数使用，有如下特殊的，位置参数变量
- `$0`: 获取shell脚本名字,以及脚本路径
- `$n`: 获取shell脚本的第n个参数，n在1~9之间，如$1,$2....$9,大于9则需要写${10}，参数空格分开
- `$#`: 获取执行的shell脚本后面的参数总个数
- `$*`: 获取shell脚本所有参数，不加引号等同于$@作用，加上引号"$@"作用是接受所有参数为单个字符串`"$1 $2 ..."`
- `$@`: 不加引号，效果同上，加引号，接收所有参数为独立字符串如`"$1" "$2" ...`空格保留

**例子1**
```bash
# /bin/sh
# 特殊变量的案例
echo '特殊变量 $0 $1 $2 ...的实践'
echo '结果: ' $0 $1 $2
echo '##########################'
echo '特殊变量 $#——获取参数总个数'
echo '结果: ' $#
echo '##########################'
echo '特殊变量 $*——获取所有参数'
echo '结果: ' $*
echo '##########################'
echo '特殊变量 $@——获取所有参数'
echo '结果: ' $@

[root@VM-4-11-centos shell]# ./special_var.sh arg1 arg2 arg3
特殊变量 $0 $1 $2 ...的实践
结果:  ./special_var.sh arg1 arg2
##########################
特殊变量 $#——获取参数总个数
结果:  3
##########################
特殊变量 $*——获取所有参数
结果:  arg1 arg2 arg3
##########################
特殊变量 $@——获取所有参数
结果:  arg1 arg2 arg3
```

反斜杠是转义符
**例子2**
```bash
[root@VM-4-11-centos shell]# cat ./special_var_difference.sh 
# /bin/bash
# 特殊变量$*和$@引号的区别
echo "print each param from \"\$*\""
for var in "$*"
do
  echo "$var"
done

echo "##########################"

echo "print each param from \"\$@\""
for var in "$@"
do
  echo "$var"
done
[root@VM-4-11-centos shell]# ./special_var_difference.sh arg1 arg2 arg3
print each param from "$*"
arg1 arg2 arg3
##########################
print each param from "$@"
arg1
arg2
arg3
```

## Shell特殊状态变量
- `$?`: 上一次命令执行状态返回值，0正确，非0失败
- `$$`: 当前shell脚本的进程号
- `$!`: 上一次后台进程的PID
- `$_`: 取得上次执行命令的最后一个参数

>`man bash`: bash手册页

**例子1: 特殊状态变量脚本控制返回值**
```bash
[root@VM-4-11-centos shell]# cat special_status.sh 
# /bin/bash
# 特殊状态变量脚本控制返回值
# $#获取参数个数 
# -ne 整数比较 表示“不等于”
# && 布尔运算符 且

[ $# -ne 2 ] && {
  echo "must be two args"
  exit 119 # 终止程序运行；且返回119状态码,提供给当前shell的$?变量，若是在函数里可以使用return 119用法
}
echo "ok, 刚好两个参数"
[root@VM-4-11-centos shell]# ./special_status.sh arg1 arg2 arg3
must be two args
[root@VM-4-11-centos shell]# echo $?
119
[root@VM-4-11-centos shell]# ./special_status.sh arg1 arg2
ok, 刚好两个参数
[root@VM-4-11-centos shell]# echo $?
0
```

**例子2: 获取当前脚本的进程ID**
```bash
#! /bin/bash
echo "当前脚本进程ID是: $$"
当前脚本进程ID是: 15919
```

**例子3: 获取上次后台执行的程序PID. `$!`**
- `nohup`命令可以让命令在后台运行，并且可以在终端退出后继续运行。
- 使用`nohup命令`时，可以在命令前添加`&`符号，表示在后台运行该命令
```bash
[root@VM-4-11-centos shell]# nohup ping baidu.com & 1> /dev/null
[1] 16994
[root@VM-4-11-centos shell]# nohup: ignoring input and appending output to ‘nohup.out’
[root@VM-4-11-centos shell]# ps -ef | grep ping
root     16994 10699  0 17:23 pts/1    00:00:00 ping baidu.com
root     17114 10699  0 17:24 pts/1    00:00:00 grep --color=auto ping
[root@VM-4-11-centos shell]# echo $!
16994
```

## bash一些基础的内置命令
- `echo`: 用于将文本或字符串输出到终端或文件中
  - `-n`不换行输出
  - `-e`解析字符串中的特殊符号
    - `\n`: 换行
    - `\r`: 回车
    - `\t`: 制表符
    - `\b`: 退格
```bash
[root@VM-4-11-centos shell]# clear
[root@VM-4-11-centos shell]# echo "Hello";echo "world"
Hello
world
[root@VM-4-11-centos shell]# echo -n "Hello";echo "world"
Helloworld
[root@VM-4-11-centos shell]# echo -n "Hello";echo -n "world"
Helloworld[root@VM-4-11-centos shell]# 
```
- `printf`: 打印命令
```bash
[root@VM-4-11-centos shell]# printf "你好\t我是\t吴彦祖\n"
你好	我是	吴彦祖
[root@VM-4-11-centos shell]# 
```
- `eval`: 执行多个命令
- `exec`: 不创建子进程，执行后续命令，且执行完毕后，自动exit

## Shell子串
| 语法 | 描述 |
|:---:|:----:|
| `${变量名}` | 返回变量值 |
| `${#变量名}` | 返回变量值长度 |
| `${变量名:start}` | 返回变量值从start下标开始的字符，包含start |
| `${变量名:start:length}` | 返回变量从start下标开始的length长度的字符 |
| `${变量名#word}` | 从变量值开头删除最短匹配的word子串 |
| `${变量名##word}` | 从变量值开头删除最长匹配的word子串 |
| `${变量名%word}` | 从变量值结尾删除最短匹配的word子串 |
| `${变量名%%word}` | 从变量值结尾删除最长匹配的word子串 |
| `${变量名/pattern/string}` | 用string代替第一个匹配的pattern |
| `${变量名//pattern/string}` | 用string代替所有的pattern |

## 统计变量字符串长度命令
1. `wc`命令
  - `wc -l`用于统计行数
  - `wc -L`用于统计最长行的字符个数 => `echo $name | wc -L`
2. `expr`命令：利用数值计算 => `expr length "${name}"`
3. `awk`统计长度, `length函数` => `echo "${name}" | awk '{print length($0)}'`
4. 最快统计方式：`${#name}`

```bash
[root@VM-4-11-centos shell]# echo $name
HelloWorld
[root@VM-4-11-centos shell]# echo $name | wc -L
10
[root@VM-4-11-centos shell]# expr length "${name}"
10
[root@VM-4-11-centos shell]# echo $name | awk '{print length($0)}'
10
[root@VM-4-11-centos shell]# echo ${#name}
10
```

## 统计命令执行的时长
- 反引号：将结果写入变量
- `time`: 计算命令的执行时长
- for循环语法
```bash
# 循环从1~3, 定义一个str1变量，将seq语句里的内容写入str1, 打印str1
[root@VM-4-11-centos shell]# for n in {1..3}; do str1=`seq -s ":" 10`; echo $str1; done;
1:2:3:4:5:6:7:8:9:10
1:2:3:4:5:6:7:8:9:10
1:2:3:4:5:6:7:8:9:10
```

**例子**
```bash
[root@VM-4-11-centos shell]# cat statistics_time.sh 
#! /bin/bash
# 统计命令时长脚本
echo -n '1、${#name}的方式'
time for n in {1..10000}
do
  char=`seq -s ":" 100`
  echo ${#char} &>/dev/null;
done
echo "#########################"
echo -n '2、wc -L的方式'
time for n in {1..10000}
do
  char=`seq -s ":" 100`
  echo ${char} | wc -L &>/dev/null;
done
echo "#########################"
echo -n '3、expr length函数的方式'
time for n in {1..10000}
do
  char=`seq -s ":" 100`
  expr length $char &>/dev/null;
done
echo "#########################"
echo -n '4、awk统计长度的方式'
time for n in {1..10000}
do
  char=`seq -s ":" 100`
  echo $char | awk '{printf length($0)}' &>/dev/null;
done
[root@VM-4-11-centos shell]# ./statistics_time.sh 
1、${#name}的方式
real	0m12.937s
user	0m4.324s
sys	0m9.081s
#########################
2、wc -L的方式
real	0m29.062s
user	0m12.915s
sys	0m23.421s
#########################
3、expr length函数的方式
real	0m26.243s
user	0m9.641s
sys	0m18.410s
#########################
4、awk统计长度的方式
real	0m34.009s
user	0m14.702s
sys	0m28.349s
```

**time执行结果分析**
- `real`: 实际运行的时间
- `user`: 用户态执行的时间
- `sys`: 内核态执行的时间

>shell编程，尽量使用linux内置的命令，内置的操作，内置的函数，效率最高(C语言开发)，尽可能减少管道符的操作

## 字符串截取、替换
```bash
[root@VM-4-11-centos shell]# cat string_intercept_replace.sh 
#! /bin/bash
# 字符串截取、替换脚本
name="HelloWorld"
echo "name: ${name}"
echo -n '1、${name:2}: '
echo ${name:2}
echo -n '2、${name:2:4}: '
echo ${name:2:4}
echo "#####################"

str="abcAbc123Abcabc"
echo "str: $str"
echo -n '3、${str#a*c}: '
echo ${str#a*c}
echo -n '4、${str##a*c}: '
echo ${str##a*c}
echo -n '5、${str%a*c}: '
echo ${str%a*c}
echo -n '6、${str%%a*c}: '
echo ${str%%a*c}
echo "#######################"

str2="Hello everyone, I'm your friend."
echo "str2: $str2"
echo -n '7、${str2/everyone/man}: '
echo ${str2/everyone/man}
echo '8、${str2//o/O}: '
echo ${str2/o/O}
echo ${str2//o/O}
[root@VM-4-11-centos shell]# ./string_intercept_replace.sh 
name: HelloWorld
1、${name:2}: lloWorld
2、${name:2:4}: lloW
#####################
str: abcAbc123Abcabc
3、${str#a*c}: Abc123Abcabc
4、${str##a*c}: 
5、${str%a*c}: abcAbc123Abc
6、${str%%a*c}: 
#######################
str2: Hello everyone, I'm your friend.
7、${str2/everyone/man}: Hello man, I'm your friend.
8、${str2//o/O}: 
HellO everyone, I'm your friend.
```

## 批量修改文件名
- mv 文件名 新文件名
- 反引号
- 循环
- 字符串替换

```bash
[root@VM-4-11-centos sub_str]# ll
total 0
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_1_finished.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_1_finished.png
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_2_finished.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_2_finished.png
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_3_finished.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_3_finished.png

1、单个文件去掉`_finished`字符
[root@VM-4-11-centos sub_str]# mv zs_1_finished.jpg zs_1.jpg
[root@VM-4-11-centos sub_str]# ll
total 0
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_1_finished.png
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_1.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_2_finished.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_2_finished.png
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_3_finished.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_3_finished.png
[root@VM-4-11-centos sub_str]# clear

2、利用变量子串替换功能+反引号，去掉字符信息
[root@VM-4-11-centos sub_str]# f="zs_1_finished.png"
[root@VM-4-11-centos sub_str]# echo $f
zs_1_finished.png
[root@VM-4-11-centos sub_str]# mv `echo $f` `echo ${f//_finished/}`
[root@VM-4-11-centos sub_str]# ll
total 0
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_1.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_1.png
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_2_finished.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_2_finished.png
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_3_finished.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_3_finished.png
[root@VM-4-11-centos sub_str]# ls *fin*.jpg
zs_2_finished.jpg  zs_3_finished.jpg

3、ls打印文件名+for循环依次输出
[root@VM-4-11-centos sub_str]# for file_name in `ls *fin*.jpg`; do echo ${file_name}; done;
zs_2_finished.jpg
zs_3_finished.jpg

4、批量文件名替换
[root@VM-4-11-centos sub_str]# for file_name in `ls *fin*.jpg`; do mv `echo $file_name` `echo ${file_name//_finished/}`; done;
[root@VM-4-11-centos sub_str]# ll
total 0
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_1.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_1.png
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_2_finished.png
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_2.jpg
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_3_finished.png
-rw-r--r-- 1 root root 0 Jul  1 16:44 zs_3.jpg
```

## Shell扩展变量
- `result=${param:-word}`: 如果param变量值为空，返回word字符串，赋值给result变量
```bash
[root@VM-4-11-centos shell]# echo $param1 $result1

[root@VM-4-11-centos shell]# result1=${param1:-测试字符}
[root@VM-4-11-centos shell]# echo $param1; echo $result1

测试字符
[root@VM-4-11-centos shell]# param1="aaa"
[root@VM-4-11-centos shell]# unset result1
[root@VM-4-11-centos shell]# echo $param1 $result1
aaa
[root@VM-4-11-centos shell]# result1=${param1:-测试字符}
[root@VM-4-11-centos shell]# echo $param1; echo $result1
aaa
aaa
```
- `result=${param:=word}`: 如果param变量值为空, word赋值给变量param，且返回其值
```bash
[root@VM-4-11-centos shell]# result1=${param1:=测试字符}
[root@VM-4-11-centos shell]# echo $param1;echo $result1
测试字符
测试字符
```
- `${param:?word}`: 如果param变量值为空，word当作`stderr`输出，否则输出变量值.(用于设置变量为空导致错误时，返回的错误信息)
```bash
[root@VM-4-11-centos shell]# result1=${param1:?我是错误信息}
-bash: param1: 我是错误信息
[root@VM-4-11-centos shell]# echo $result1

[root@VM-4-11-centos shell]# echo $param1

```
- `${param:+word}`: 如果param变量值为空，什么都不做，否则word返回
```bash
[root@VM-4-11-centos shell]# result1=${param1:+测试字符}
[root@VM-4-11-centos shell]# echo $param1; echo $result1


[root@VM-4-11-centos shell]# param1="aaa"
[root@VM-4-11-centos shell]# result1=${param1:+测试字符}
[root@VM-4-11-centos shell]# echo $param1; echo $result1
aaa
测试字符
```

**实例应用**
数据备份，输出过期数据的脚本
- `find 需要搜索的目录 -name 文件名字 -type 文件类型 -mtime +n`
  - `-mtime +n`: 找到在最近n天以内被修改过的文件
  - `-mtime -n`: 找到在最近n天以前被修改过的文件
  - `-mmin n`: 找到最近n分钟以内被修改过的文件
  - `-mmin +n`: 找到最近n分钟以内被修改过的文件
- `xargs`: 读取标准输入中的数据，并将这些数据作为参数传递给其他命令

>删除7天以上的过期数据
```bash
find ${dir_path:=/data/mysql_data} -name '*.tar.gz' -type f -mtime -7|xargs rm -f
```
