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
1、新建本地仓库、远程库并将主分支推送到远程库上
```bash
# 本地文件夹
git init # 初始化本地仓库
# 修改项目内容后
git add . # 提交到暂存区
git commit -m "xxx" # 提交到本地仓库
git branch -M main #将主分支名从master改为main

# github上新建仓库

# 创建远程库别名
# git remote add 别名 远程地址
git remote add origin git@github.com:gzdl-strive/xxxx.git
# 将本地主分支推送到远程库上
git push -u origin main
```

2、创建开发主分支并将开发主分支推送到远程库上
```bash
# 本地仓库中创建develop分支
# 从main主分支中拉出develop分支
# git branch -v => 查看分支
# git checkout 分支名 => 切换分支
# git checkout -b 分支名 => 创建并切换至新建分支
git checkout -b develop main # 从main分支中拉出develop分支，并切换到develop分支上

# 发布develop分支到远程库
git push -u origin develop
```

3、创建feature开发分支
```bash
# 本地仓库
# 从develop拉出feature_v1.0_xxx功能分支
git checkout -b feature_v1.0_xxx develop
# 发布feature_v1.0_xxx分支到远程库
git push -u origin feature_v1.0_xxx

# 在feature_v1.0_xxx上开发功能
# 完成feature_v1.0_xxx的开发

# 合并到develop分支
# 先从develop上获取最新
git pull origin develop
# 切换到develop分支
git checkout develop
# 从feature_v1.0_xxx分支合并到develop分支
git merge --no-ff feature_v1.0_xxx
# 删除feature_v1.0_xxx分支
git branch -d feature_v1.0_xxx
# 推送develop最新内容到远程develop分支上
git push -u origin develop
# 删除远程库上的feature_v1.0_xxx分支
# 直接在界面上点击branches,点击删除
```

**`--no-ff`作用**
>merge默认使用的“快进”(`fast-forward`)模式合并，所以`git merge <=> git merge -ff`

- `fast-forward`: Git合并分支时，如果顺着一个分支走下去可以到达另一个分支的话，那么 Git 在合并两者时，只会简单地把指针右移，叫做“快进”（fast-forward）
- `--no-ff`: 指的是强行关闭fast-forward方式
- `--no-ff`: 会生成一个新的提交，然后指向新的提交 ==>这样会造成两个合并操作“回退版本的区别”

```bash
# 未合并前分支情况
          A---B---C => feature
         /
D---E---F => main

# 1、fast-forward模式
git checkout main
git merge feature

# 结果会变成
          A---B---C => feature
         /             main
D---E---F 

# 2、--no-ff模式
git checkout main
git merge --no-ff feature

# 结果会变成
          A---B---C => feature
         /         \
D---E---F-----------G => min
#由于 --no-ff 禁止了快进，所以会生成一个新的提交，main 指向 G
```

4、开始release预发布分支
```bash
# 从develop拉出一release分支
# 可选，获取最新版本。git pull origin develop
git checkout -b release_v1.0 develop
```

5、完成release，合并到main分支和develop分支，在`main`打上`tag标记`
```bash
# 合并到main
git checkout main
git merge --no-ff release_v1.0

# 在 main打tag标记
git tag release1.0 main
git push --tags

# 合并到develop
git checkout develop
git merge -no-ff release_v1.0
```

6、开始hotfix修复分支
```bash
# 从主线master拉出一个hotfix分支
#可选，获取最新版本 git pull origin main
git checkout -b hotfix_v1.0.1 main
```

7、完成hotfix，合并到main和develop，并在main上打tag
```bash
# 合并hotfix_v1.0.1到master和develop，并在main上打tag
git checkout main
git merge --no-ff hotfix_v1.0.1
# 在master上打tag
git tag hotfix1.0.1 main
git push --tags
# 合并hotfix_v1.0.1到develop
git checkout develop
git merge --no-ff hotfix_v1.0.1
```

## Git分支命名规范
- 开发分支: 以`feature_`开头
- 预发布分支: 以`release_`开头
- 修复分支: 以`hotfix_`开头
- tag标记
    - `release`分支合并，以`release_`开头
    - `hotfix`分支合并, 以`hotfix_`开头
- main分支每次提交都需要打tag

## commit提交规范
