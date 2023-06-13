>Git版本管理

## 用户签名
>签名的作用就是用于区分不同操作者的身份。

```bash
# 查看
git config user.name
git config user.email

# 设置用户签名
git config --global user.name 用户名
git config --global user.email 邮箱
```

## 常用命令
- 初始化本地仓库: `git init`
- 查看本地库状态: `git status`
- 添加至暂存区: `git add .(提交全部)`/`git add xxx(提交xxx文件)`
- 提交暂存区至本地仓库: `git commit -m "xxxx"`
- 查看引用日志信息: `git reflog`
- 查看日志信息: `git log`
  
**版本穿梭(回滚..)**
```bash
# 先使用git reflog查看各个版本的版本号
git reflog
# 然后使用git reset进行切换
git reset -- hard 版本号
```

## Git分支
>在版本控制过程中，同时推进多个任务，为每个任务，我们就可以创建每个任务的单独分支。使用分支意味着程序员可以把自己的工作从开发主线上分离开来，开发自己分支的时候，不会影响主线分支的运行。

### 核心分支(两种)
- 主分支：`main`分支
    - 有且仅有一个的分支
    - 所有提供给用户使用的正式版本，都应该在这个主分支上发布
    - 不能直接修改该分支的代码，只能从其它分支合并过来
    - 所有在主分支上的提交都应该标记`tag`
- 开发主分支：`develop`分支
    - 主要用于与其它分支合并
    - 仅进行一些优化和升级开发

### 临时分支
- 功能分支: `feature`分支 => 用于**开发新功能**，开发完成后合并回`develop`分支
- 预发布分支: `release`分支 => 
- 修复分支: `hotfix`分支

**分支操作**
- 创建分支: `git branch`
- 查看分支: `git branch -v`
- 切换分支: `git checkout 分支名`
- 创建并切换分支: `git checkout -b 分支名`
- 合并分支: `git merge 分支名`

## 远程库
- 查看当前远程地址别名: `git remote -v`
- 给远程库起别名: `git remote add 别名 远程地址`
- 推送本地分支上的内容到远程库: `git push 别名 分支名`
- 克隆代码: `git clone 远程地址`
- 拉取远程库上分支的内容: `git pull 远程库地址别名 远程分支名`

## SSH免密登录
`window下ssh路径: C:\Users\asus\.ssh`

1. 生成`.ssh目录`: `ssh-keygen -t rsa -C xxxxxxx@qq.com`
    - （ssh-keygen: 生成ssh公钥私钥免密登录的命令）
    - （-t: 指定用哪种加密算法来生成）
    - （rsa：使用rsa（非对称加密协议）算法）
    - （-C:一种描述）
2. 将该目录下的公钥(`.pub结尾`)复制一份
3. 登录`github -> settings -> SSH and GPG keys -> New SSH key`，把公钥添加进去

这样以后就可以通过SSH来拉取/推送内容到github仓库上

## 团队协作
当我们将别人的github代码拉取到本地并修改后，想要提交到远程库时，发现提交失败，因为我们没有权限进行修改。需要创建远程库的人，对该远程库进行设置，邀请需要提交代码的人，`github/xxx库`，`settings -> collaborators -> add people`

输入要邀请的github账号后，会生成一个地址，把地址发送给被邀请人，被邀请人在登录自己github账号后，复制该地址到地址栏，就可以看到创建远程库的人的要求，可以进行接收或拒绝

## 跨团队协作
- A(github仓库所有者)、 B(外界人员: 非团队成员)
- B在拉取到A仓库中代码，并想要修改A仓库中的代码(发现Bug、添加新功能等等)，那么需要`fork`该仓库到自己的`github`上
- B在自己的github上修改了代码(可以直接在github上修改，或者本地把项目克隆下去，修改后提交到github上)
- B想要把自己修改后的代码提交到A的仓库上，需要创建`Pull request`
    - B: `Pull requests -> New Pull reqeust -> Create pull request`
- A 就可以在自己的仓库中的`pull request`上看到B提交的`pull request`,可以对B修改的代码进行review, 后进行merge

## Git Flow
