# 个人作品集

一个使用 Next.js 16 构建的个人作品集站点，面向个人介绍、技能展示与项目案例陈列，最终以纯静态文件形式导出，可部署到任意静态托管平台。

## 技术栈

- **Next.js 16**（App Router）
- **TypeScript 5**
- **Tailwind CSS v4**（通过 `@tailwindcss/turbopack` 接入）
- **MDX**：项目内容以 `.mdx` 文件维护，使用 `gray-matter` 解析 frontmatter
- **静态导出**：`next.config.ts` 中配置 `output: "export"`，构建产物输出到 `out/`；同时开启 `images.unoptimized`，适配静态托管

## 数据来源

- **站点信息**：`site.config.ts` 中的 `siteConfig`，包含姓名、定位、邮箱、社交链接、简历地址、技能分组与自我介绍。首页的 Hero、Skills、About、Contact、Footer 均从此读取。
- **项目内容**：`content/projects/*.mdx`，由 `lib/projects.ts` 读取、解析并排序。首页「项目」区块会自动渲染项目卡片；没有项目时展示占位卡片。

## 本地开发

### 环境要求

- **Node.js 20.9.0 及以上**（Next.js 16 的 `engines` 要求；项目未额外声明 `engines`）
- npm（随 Node.js 安装）

### 安装与启动

```bash
npm install
npm run dev
```

开发服务器默认运行在 [http://localhost:3000](http://localhost:3000)。

### 构建静态产物

```bash
npm run build
```

构建完成后，纯静态文件位于 `out/`，可直接部署。

### 预览构建产物（可选）

项目未内置预览脚本，使用任意静态文件服务器指向 `out/` 即可。例如本机已安装 `serve`，或在允许临时下载的情况下：

```bash
npx serve out
```

> `serve` 不在本项目依赖中；也可以使用其他静态服务器，把根目录指向 `out/`。

### 其他脚本

```bash
npm run lint
```

## 新增一个项目

### 1. 从模板创建文件

```bash
cp content/projects/_template.mdx content/projects/your-slug.mdx
```

- 文件名（不含 `.mdx`）就是 **slug**，决定访问路径 `/projects/your-slug`
- 建议使用小写英文与连字符（kebab-case）
- 复制后删除文件内的 `_template` 相关提示，并移除或修改 `draft: true`

### 2. 填写 frontmatter

| 字段 | 必填 | 类型 | 说明 |
|---|---|---|---|
| `title` | 是 | `string` | 项目名称 |
| `summary` | 是 | `string` | 一句话简介（≤50 字） |
| `period` | 是 | `string` | 起止年月，如 `"2024.03–2024.08"` |
| `role` | 是 | `string` | 担任角色，如「独立开发」「前端负责人」 |
| `background` | 否 | `string` | 背景与目标，1~2 句 |
| `techStack` | 是 | `string[]` | 3~6 项技术 |
| `solutions` | 是 | `string[]` | 核心实现方案 2~4 条，每条包含「怎么做 + 为什么」 |
| `results` | 否 | `string[]` | 成果/数据，尽量量化 |
| `previewUrl` | 否 | `string` | 在线预览地址 |
| `repoUrl` | 否 | `string` | 源码地址 |
| `coverImage` | 是 | `string` | 封面图路径（站内绝对路径） |
| `gallery` | 否 | `string[]` | 细节截图/GIF 路径（站内绝对路径） |
| `order` | 否 | `number` | 排序权重，越小越靠前 |
| `draft` | 否 | `boolean` | 为 `true` 时不展示 |

内容约束：

- `summary` 不超过 50 字
- `techStack` 保持 3~6 项
- `solutions` 保持 2~4 条，明确写出「怎么做 + 为什么」
- 排序规则：有 `order` 的项目排在无 `order` 的项目之前；有 `order` 的按升序，无 `order` 的按 `period` 倒序

### 3. 放置图片

- 封面：放入 `public/images/cover/`
- 细节截图 / GIF：放入 `public/images/detail/`
- frontmatter 中引用**站内绝对路径**，例如：

```yaml
coverImage: "/images/cover/foo.webp"
gallery:
  - "/images/detail/foo-1.webp"
  - "/images/detail/foo-2.webp"
```

### 4. 提交

```bash
git add content/projects/your-slug.mdx public/images/cover/foo.webp public/images/detail/foo-1.webp
git commit -m "content: add project your-slug"
```

## 部署到 Vercel

仓库根目录已提供 `vercel.json`，显式指定静态托管：

```json
{
  "framework": null,
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "cleanUrls": true
}
```

- `framework: null`：关闭框架自动识别，让 Vercel 按静态站处理，不启用 Next.js 服务端运行时
- `buildCommand` / `outputDirectory`：执行 `npm run build`，把 `out/` 作为产物目录
- `cleanUrls`：让 `/projects/interview-system` 正确映射到静态文件 `projects/interview-system.html`

部署步骤：

1. 将仓库推送到 GitHub
2. 在 Vercel 中选择 **Add New Project**，导入该仓库
3. 框架预设选择 **Other**（或留空，由 `vercel.json` 覆盖）；构建命令 `npm run build`，输出目录 `out`
4. 导入后自动部署，后续推送自动触发重新构建
5. 首次部署完成后，把实际域名写回 `site.config.ts` 的 `siteUrl` 并重新部署

说明：

- `next.config.ts` 已固定 `output: "export"` 与 `images.unoptimized: true`，Vercel 构建时不会改变这两项配置
- `out/` 保持在 `.gitignore` 中；Vercel 会自行构建，不需要提交构建产物
- **不需要配置环境变量**；简历 PDF 等静态文件仍放在 `public/` 下随构建复制
- `siteConfig.siteUrl` 影响 Open Graph / canonical 的绝对 URL，首次部署后必须回填真实域名，否则分享信息仍指向占位域名

## 替换简历 PDF

1. 将 PDF 放入 `public/resume/`
2. 命名为 `resume.pdf`（完整路径为 `public/resume/resume.pdf`）
3. `siteConfig.resumeUrl` 已指向 `/resume/resume.pdf`，无需修改代码
4. 重新执行 `npm run build` 并部署；使用 Vercel 时推送后会自动重新构建

> 仓库当前未附带示例 PDF，`public/resume/` 为空；在放入文件前，「下载简历」链接会返回 404。

## 图片建议与常见问题

### 图片建议

- 封面保持 **16:10** 比例，推荐宽度 1200~1600px，使用 `.webp`，尽量控制在 200KB 以内
- 细节图按实际展示需要压缩，避免直接放入大尺寸原图
- GIF 体积通常较大，优先考虑视频或静态多图

### 常见问题

- **MDX 注释必须使用 `{/* ... */}`**：HTML 注释 `<!-- -->` 会导致 MDX 编译失败
- **`_` 开头的文件不会被当作项目**：如 `_template.mdx`，可用于存放模板或草稿；`draft: true` 的项目同样不会展示
- **图片路径要以 `/` 开头**：例如 `/images/cover/foo.webp`，而不是相对路径或带 `public` 前缀
- **新增内容后需要重新构建**：开发环境会自动刷新，静态产物需要重新执行 `npm run build`
