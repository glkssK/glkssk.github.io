# 个人主页模板（GitHub Pages 可直接上线）

这是一个静态 HTML/CSS 版本的个人主页模板，适合：

- 学术主页
- 求职主页
- 作品集主页
- GitHub Pages 快速上线

## 文件说明

- `index.html`：主页内容
- `styles.css`：样式文件
- `avatar.svg`：头像占位图（可替换成你的照片）
- `files/`：放 CV、PDF、附件

## 你只需要改这几处

### 1. 改个人信息
打开 `index.html`，修改：

- 你的名字
- 身份标题
- 城市
- 邮箱
- GitHub 链接
- Google Scholar 链接
- CV 链接

### 2. 改头像
把你的照片放到根目录，命名为 `avatar.jpg` 或 `avatar.png`，然后把 `index.html` 里这行：

```html
<img src="avatar.svg" alt="你的头像" class="avatar" />
```

改成：

```html
<img src="avatar.jpg" alt="你的头像" class="avatar" />
```

### 3. 改内容区
按你的经历修改：

- `About Me`
- `News`
- `Selected Publications / Projects`
- `Experience & Education`

## 上传到 GitHub Pages

### 方式一：网页上传
1. 新建一个 GitHub 仓库，名字必须是：`你的用户名.github.io`
2. 把本目录所有文件上传到仓库根目录
3. 到仓库 `Settings -> Pages`
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main`，文件夹选择 `/(root)`
6. 保存后，访问：`https://你的用户名.github.io`

### 方式二：Git 命令行
```bash
git init
git add .
git commit -m "Initial homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

然后同样去 `Settings -> Pages` 开启发布。

## 想做得更像学术主页
可以继续增加：

- 更多论文条目
- Awards / Services / Teaching
- 项目页
- 博客页
- 中英文切换
- 深色模式

## 建议
如果你想“完全像 Academic Pages 那种风格”，后续可以把这个静态版再迁移到 Jekyll / Academic Pages。
这个版本的优点是：简单、容易改、马上能上线。
