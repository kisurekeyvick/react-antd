import * as React from 'react';

export default class GITUsing extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);
    }

    // | 工作区 | 写代码的地方 |
    // | 暂存区| git add 到的地方 |
    // | 版本库 | git commit 到的地方 |

    /* 
        初次使用Git前的配置
        这一步很重要，英文git每一次提交的时候，都会引用这两条信息，来说明是谁提交了更新，所以会随更新内容一起被永久纳入历史记录
        (1) 在命令行模式里输入一下命令：
            git config --global user.name '用户名'
            git config --global user.email '邮箱'

            步骤方式：cmd打开，直接配置  (需要注意的是，用户名都是英文)

            git config --list   用于查看配置信息
    */

    /* 
        git记录的是什么
        Git是将每个版本独立保存

        工作区域、暂存区域、GIT仓库
        工作区域：就是你平时写代码的地方，你肉眼能够看得到的
        暂存区：用于临时存放你的改动（其实它是一个文件），保存的是你即将提到仓库的列表信息，所以也叫index
        GIT仓库：是你安全存放版本数据的位置
    */
   
    /* 
        GIT的工作流程
        1.在工作目录中添加，修改文件
        2.将需要进行版本管理的文件放入暂存区域
        3.将暂存区域的文件提交到git仓库

        GIT的管理文件存在3种状态
        1.已修改 (modified)
        2.已暂存 (staged)
        3.已提交 (committed)
    */

    /*
        获取GIT仓库
        -   存在两种方法取得GIT项目仓库的方法：(1)在现有项目或目录下导入所有文件到 Git 中 
                                        (2)从一个服务器克隆一个现有的 Git 仓库

        在现有的目录中初始化仓库
        git init
            - 这个命令将创建一个.git的子目录，这个子目录含有你初始化的GIT仓库中所有的必须文件，这些文件是GIT仓库的骨干
             其作用就是git用来跟踪管理版本迭代的
        
        git add
            - 将你指定的文件添加到暂存区域  （这个是GIT的第二个步骤）
            例如：git add README.md

        git commit
            - 提交，并添加说明      (这个是GIT的第三个步骤)
            例如：git commit -m "....."
    */

    /* 
        git status
            - 用于查看当前文件的状态，查看哪些文件处于什么状态

        git reset
            - 代码回滚
            例如：git reset HEAD  作用就是将最近一次提交到GIT仓库的文件恢复回暂存区域，将暂存区域回复到先前的状态
            git reset HEAD README.md    // 这里我们指定README.md文件恢复到暂存区，如果我们不指定文件，那么就会将上一次提交的所有代码都恢复到暂存区域

            git reset主要用于3种情况
            (1)错误commit后，仅撤销commit，暂存区，工作区内容不变
                git reset --soft commit-id  // 这个commit-id是错误的commit之前的commit-id
                理解：移动HEAD的指向，将其指向上一个快照

            (2)错误commit后，仅撤销commit和暂存区，工作区内容不变
                git reset --mixed commit-id
                理解：移动HEAD的指向，将其指向上一个快照
                     将HEAD移动后指向的快照回滚到暂存区域

            (3)错误commit后，想要回复到某个版本库的代码（暂存区，工作去都会发生变化）
                git reset --hard commit-id
                理解：移动HEAD的指向，将其指向上一个快照
                     将HEAD移动后指向的快照回滚到暂存区域
                     将暂存区域的文件还原到工作目录

        git checkout
            - 
                例如： git checkout -- readme.txt 的意思就是：把readme.txt文件在工作区的修改全部撤销
                这里有2种情况： (1)readme.txt自修改以后还没有被放到暂存区，现在，撤销修改就会回到和版本库一模一样的状态
                                (2)readme.txt已经添加到暂存区后，又做修改，现在，撤销修改就会回到添加到暂存区后的状态

        git log
            - 查看历史提交记录
                你能看到黄颜色的commit-id 这个是git为每次提交计算出来的id
    */

    /* 
        回退版本
        reset 就是将GIT仓库中HEAD指向的版本回退到暂存区域
        checkout 就是将暂存区域的数据恢复到工作目录

        (1) git reset '这里是commit-id' 
            - 那么就会将代码回到你指定的快照ID。当然，这个快照ID不一定要全部写出来，但是必须要有5个以上字符才行
        
        (2) git reset 快照版本 文件名/路径
            - 那么就会将回滚个别文件 
 
        git reset HEAD~
            HEAD 指向的是最新的版本(最新的版本)，而添加了~(即：HEAD~)代表的是回滚到第二个版本
            执行到 git reset HEAD~ 中时候，就会将代码回滚到暂存区内

        checkout
    */

    /* 
        git diff 快照ID
        - 将仓库中对应快照ID中的代码和工作区作比较

        git diff HEAD
        - 最新仓库中的代码和工作区做比较

        git diff --cached
        - 最新仓库中的代码和暂存区域文件做比较

        git diff --cached 快照ID
        - 指定快照跟暂存区做对比
    */

    /* 
        修改最后一次提交
        - 场景：(1)版本刚一提交到(commit)仓库，突然想起漏掉2个文件还没有添加(add)
               (2)版本刚一提交到(commit)仓库，突然想起版本说明写的不够全面，无法彰显本次修改的内容

        -  执行带 --amend 选项的 commit 提交命令
            GIT就会’更正‘最近一次提交
    */

    /* 
        - git add *
          git add .
            .，* 表示的是所有，是一种正则表达式 ，意思是将所有修改添加到暂存区

        - git add Hello*
            将所有以Hello开头的文件的修改添加到暂存区 例如： HelloWorld.txt, Hello.js.....

        - git add *Hello
            将所有以Hello结尾的文件的所有修改添加到暂存区

        - git add Hello?
            将所有以Hello开头，后面只有一位的文件的修改提交到暂存区，例如： Hello1.js
            又或者如：Helloaa.js 是不能提交的，因为Hello后面有2位      
    */

    /* 
        - git rm 文件名
            这个命令删除的只是工作目录和暂存区域的文件，也就是取消跟踪，在下一次提交时候，不会纳入版本管理。
            到那时需要注意的是，这个命令是不会删除仓库快照里面的文件的。如果要删除快照里面的文件，那么需要修改HEAD指向

        - git rm -f 文件名
            这个命令代表的是强制删除，也就是说同时删除暂存区域和工作目录

        - git rm --cache
            这个命令就是只删除暂存区域(保留工作目录)
    */

    /* 
        重命名文件
        git mv 旧文件名 新文件名
            git mv 的操作其实包含了如下操作（简单了解就好）：
            - ren/mv 旧文件名 新文件名
            - git rm 旧文件名
            - git add 新文件名
    */

    /* 
        Git分支
        - 创建分支
            (1)git clone一个masterg
            (2)git branck 分支名字

            (3)我们可以查看一下本地分支情况：git log --decorate
                --decorate 就是让log显示指向这个提交的所以引用
            注意：刚创建分支的时候，HEAD还是默认的指向master分支的

        - 切换分支
            (1)git checkout 分支名

        - 推送远程分支
            (1)git push origin 本地分支
                - 这样就可以将本地的分支推送到远程分支(如果是新建的分支，那么也会推送到远程仓库)
    */

    /* 
        合并分支
        - git merge 分支名
            执行此命令，就会将指定的分支名合并到本分支来

            例如，你想合并到release分支 1.4.6
                (1)先将你的develop-kisure分支代码提交到本地仓库
                (2)其次，切换分支到release
                (3)基于release分支 敲打命令：git merge develop-kisure

        查看分支状况
        - git log --decorate -all --oneline --graph //以图表的形式显示出来

        删除分支
        - git branch -d 分支名
            删除你需要删除的分支名
    */

    /* 
        拉取分支
        - git fetch：相当于是从远程获取最新版本到本地，不会自动merge
            git fetch origin master             // 从远程的origin的master住分支下载最新的版本到本地分支
            git log -p master..origin/master    // 对比本地分支和远程分支区别
            git merge origin/master             // 进行合并

        - git pull：相当于是从远程获取最新版本并merge到本地
            git pull origin master
            这一步操作相当于 git petch 和 git merge

        实际使用中,git fetch会更安全一点，因为在merge之前，我们可以查看更新情况，然后再决定是否合并
    */

    public render() {
        return <div>
                    GIT使用
                </div>
    }
}
