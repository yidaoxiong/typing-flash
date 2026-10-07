# typingflash.slashbro.top

节奏打字（Rhythm Typing）单文件网页游戏，零依赖、零构建。

- 生产域名：https://typingflash.slashbro.top
- Pages 源站：https://typing-flash.pages.dev
- 仓库：https://github.com/yidaoxiong/typing-flash

## 结构

- `index.html` — 全部逻辑与样式内联，Pages 直接以 `.` 为输出目录托管
- `edge/` — 自定义域转发 Worker（见下）

## 部署

推送到 `main` 即触发 Cloudflare Pages 自动构建。

## 为什么多一层 edge Worker

Cloudflare 的 OAuth 凭据没有 `dns_records:write` 权限，Pages 自定义域名无法自动创建
CNAME，会一直卡在 `pending`。`edge/` 是一个纯转发 Worker，通过 Workers 自定义域绑定
`typingflash.slashbro.top` —— Workers 自定义域会让 Cloudflare 自己创建 DNS 记录和证书。

`edge/wrangler.toml` 独立配置，不会与根目录的 Pages 配置冲突。

### 移除这一层（拿到 DNS 权限后）

1. 在 Cloudflare DNS 添加 `CNAME typingflash → typing-flash.pages.dev`
2. `wrangler deploy` 删除 edge Worker 及其自定义域
3. 删除 `edge/` 目录