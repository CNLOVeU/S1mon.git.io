# 个人网站

这是一个通过GitHub Pages部署的个人网站，用于展示个人成果和项目。

## 如何部署到GitHub Pages

### 步骤1：在GitHub上创建仓库
1. 登录GitHub账号
2. 点击右上角的「+」号，选择「New repository」
3. 仓库名称设置为：`yourusername.github.io`（将yourusername替换为你的GitHub用户名）
4. 选择「Public」
5. 点击「Create repository」

### 步骤2：上传文件
1. 克隆仓库到本地：
   ```bash
   git clone https://github.com/yourusername/yourusername.github.io.git
   ```
2. 将本项目的所有文件复制到克隆的仓库目录中
3. 提交并推送更改：
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

### 步骤3：启用GitHub Pages
1. 进入仓库的「Settings」页面
2. 点击左侧的「Pages」选项
3. 在「Source」部分，选择「main」分支，然后点击「Save」
4. 等待几分钟，GitHub Pages就会部署你的网站

### 访问网站
部署完成后，你可以通过以下地址访问你的个人网站：
`https://yourusername.github.io`

## 网站结构
- `index.html` - 网站主页
- `style.css` - 样式文件
- `script.js` - 交互脚本

## 自定义内容
你可以修改以下内容来个性化你的网站：
1. 在`index.html`中更新个人信息和项目描述
2. 在`style.css`中修改颜色和布局
3. 在`script.js`中添加更多交互功能

## 技术栈
- HTML5
- CSS3
- JavaScript
- GitHub Pages