# S1mon | 许成葳 个人网站

> [🌐 cnloveu.github.io/S1mon.git.io](https://cnloveu.github.io/S1mon.git.io/)

许成葳的个人展示网站，用于展示个人信息、工作经历、作品集和兴趣爱好。

## 🚀 特性

- 🎨 现代设计，紫色渐变主题
- 🌙 自动深色模式
- ✨ 粒子动画 + 打字机效果
- 📱 完全响应式，移动端友好
- 🎯 作品集展示区
- ⚡ 纯 HTML + CSS + JS，零依赖

## 📁 结构

```
├── index.html      # 主页
├── style.css       # 样式表
├── script.js       # 交互脚本
├── CHANGELOG.md    # 更新日志
└── README.md       # 说明文件
```

## 🛠 部署到 GitHub Pages

### 方法1：GitHub Desktop
1. 克隆本仓库到本地
2. 将 `personal-site/` 下的文件复制到仓库根目录
3. 提交并推送

### 方法2：命令行
```bash
git clone https://github.com/CNLOVeU/S1mon.git.io.git
cd S1mon.git.io
# 复制 personal-site 下的文件到当前目录
git add .
git commit -m "v2.0.0: 完全重写个人网站"
git push origin main
```

### 启用 GitHub Pages
1. 进入仓库 → Settings → Pages
2. Source 选择 `main` 分支
3. 等待几分钟即可访问

## 📝 自定义

### 替换头像
在 `index.html` 中找到 `.image-placeholder`，替换为：
```html
<img src="your-photo.jpg" alt="许成葳" class="w-full h-full object-cover">
```

### 添加作品图片
在 `index.html` 的 Portfolio 区域，将 `.placeholder-img` 替换为实际图片：
```html
<img src="your-project.jpg" alt="项目名称" class="w-full h-full object-cover">
```

## 📜 更新日志

详见 [CHANGELOG.md](CHANGELOG.md)

## 📄 许可

© 2026 许成葳. All rights reserved.
