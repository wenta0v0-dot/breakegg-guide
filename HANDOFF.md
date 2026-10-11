# Break and Steal an Egg 指导站 — 项目简报(HANDOFF)

> 本文件是站点工作的完整交接文档。任何新会话读完此文件即可继续建站,无需回翻聊天记录。

## 0. 已上线(2026-10-12,AnvilWiki 版)

- **线上地址**:https://wenta0v0-dot.github.io/breakegg-guide/
- **GitHub 仓库**:https://github.com/wenta0v0-dot/breakegg-guide(公开仓,main 分支根目录部署,GitHub Pages)
- **架构(v2,2026-10-12 重建)**:基于 E 盘 `E:\anvilwiki` 的 AnvilWiki 模板(Astro 7 + Tailwind + MDX + Pagefind),用 `pnpm apply-template --answers breakegg-answers.json` 完成换皮。旧的手写 HTML 版已被整体替换(git 历史可查)。
- **发布方式**:仓库根目录 = Astro 源码 + 构建产物(dist 镜像)。发布 = `node scripts/ship.mjs`(构建并把 dist/ 镜像到仓库根)→ `git add -A` → commit → push → 约 1 分钟生效。**直接改源码不跑 ship 不会改变线上**。

## 1. 站点定位

- **主题**:Roblox 游戏《Break and Steal an Egg》的玩家指导站(非官方 fan site)
- **语言**:英语(目标流量是英语玩家),单语言(en-only)
- **选品依据**(拍板日 2026-10-12):
  - 需求:同时在线 31.8 万(10-11,4 天 6 倍);Google Trends 官方标「暴增」
  - 竞争:wiki 词有 4-6 个两周内赶出来的薄站 + IGN;**codes 词存在「意图错位空位」——游戏没有文本兑换码,但搜索的人不知道,现有页面没把真答案讲清楚**
  - 打分:85/100(第 6 课口径),拍板「做」

## 2. 已验证事实(写内容只能用这些,标注核实日期)

| 事实 | 来源/核实日 |
|---|---|
| 游戏无传统文本兑换码;奖励走 Discord 关联(商店内输入 Discord 用户名验证→领 Saber-tooth Egg) | Google AI Overview + GameBoost 页,10-11 |
| 点赞游戏 + 加入官方群组 → 免费奖励 | 游戏 Roblox 官方描述,10-05;API 复核 10-12 |
| 核心循环:打破鸡蛋→孵化稀有动物→偷别人的动物并躲开守卫→放到自己基地→赚现金→升级速度和镐子→图鉴(index)全收集 | Roblox 官方描述,10-05;API 复核 10-12 |
| 已知区域:Forest、Desert、Galaxy(还有更多) | 搜索 PAA,10-11 |
| 成长系统:Speed、Pickaxes、Trails、Pen capacity、carry timer、hatching | 竞品 wiki 摘要,10-11 |
| 宠物总数 78 只,按 biome 分布 | IGN 攻略(10-09 前后),10-11 |
| **开发商:ILGames x Eggs**(认证群组,groupId 187288153) | Roblox API,10-12 |
| 游戏数据:placeId 114326934417838 / universeId 10765288803 / 上线 2026-09-05 / 98% 好评 / 累计访问 7890 万 | Roblox API,10-05~10-12 |
| 10-12 实时在线 99,185(峰值为 10-11 的 31.8 万,日常波动大) | Roblox API,10-12 |

**红线**:不编造宠物名、数值、码。未核实的数据标 "unverified" 或不写。官方 Discord 邀请链接拿不到(Roblox social-links API 不公开),站点里不写具体链接,只写「从游戏页进」。

## 3. 信息架构(v2,AnvilWiki)

- **分类(navigation.ts)**:`codes`(免费奖励真相,主攻页)+ `guides`(攻略)。pets 分类等数据核实后再加。
- **文章**(`src/content/wiki/en/<分类>/<slug>.mdx`):
  - `codes/all-codes.mdx` — 主攻页:标题吃 "codes" 搜索意图,首段直答「没有文本码」,Discord 关联步骤、假码鉴别、核验日志表、FAQ(FAQPage JSON-LD 自动生成)
  - `guides/beginner-guide.mdx` — 新手指南:核心循环、区域表、升级顺序表、五个新手错误、FAQ
- **自动生成**:首页(hero/start/explore/faq 模块,文案在 `src/locales/en.json`)、分类列表页、tags、/recent、搜索(Pagefind)、RSS、sitemap(sitemap-index.xml!)、llms.txt、robots.txt、404、about/contact/faq/privacy-policy/terms-of-service/copyright 法务页
- **首页文案**:全部在 `src/locales/en.json` 的 `home.*` 和 `nav.*` / `overview.*`;hero 主 CTA 固定指向 Roblox 游戏页(site.social.official)

## 4. 关键工程事实(改代码前必读)

- **子路径部署**:站点在 `/breakegg-guide/` 子路径。`SITE_URL=https://wenta0v0-dot.github.io/breakegg-guide`(写在 site.ts domain;Cloudflare 配置 wrangler.toml/_headers 已删,本站只走 GitHub Pages),Astro `base` 从 SITE_URL 派生(astro.config.ts),内链统一走 `src/lib/url.ts` 的 `localizePath`(带 base),canonical/JSON-LD/RSS 走 `absoluteLocalized`/`canonicalUrl`(剥 base,防双重前缀)。**sitemap 的 URL 形如 /sitemap-index.xml,提交 Search Console 用这个**。
- **Pagefind 搜索**:三处子路径适配缺一不可——①SearchButton 内联脚本 `bundlePath` 选项;②`transpile-pagefind.mjs` 的 base-path 改写步骤(bundle 内默认 `"/pagefind/"` 回退会被改写);③HTML 里 UI 脚本 URL。搜索坏了先查这三处 + performance 面板里 pagefind-entry.json 的请求路径。
- **发布产物追踪**:`.ship-manifest.json` 记录上次镜像的顶层条目(ship 脚本用它清过期产物),要提交。
- **本机构建注意**: ancestor 目录 `C:\Users\勿忘\node_modules` 有个 CJS cookie@0.7.2 会污染向上解析,故 package.json 把 cookie@2.0.1 声明为直接依赖——别删。
- **质量门**(push 后 GitHub Actions 会跑,本地也能跑):`pnpm check-content / check-links / check-i18n / check-config / typecheck / test`。内容规范:正文无 H1、内链带尾斜杠、≥3 条内链、description 40-165 字符、summary 40-60 词。
- **测试套件**:删了 5 个模板 demo 自检测试(apply-template/changelog/codes-consistency/community-digest/landing-paths/redirects),其余适配了 en-only;AGENTS.md 的 suites 数由 `tests/agents-consistency.test.ts` 钉住,增删测试文件要同步 AGENTS.md 的 `pnpm test # Vitest — N suites (…)` 行。

## 5. 设计规范

- **模板主题**:蛋黄 `#FFB627`(apply-template 生成 globals.css 的 HSL 变量,globals 里落为 #ffb829);默认跟随系统深浅色,Lilita One + 系统字体回退(字体资产由 `pnpm gen-assets` 生成)。
- **品牌资产**:`public/favicon.*`、`public/images/hero.webp` 由 `pnpm gen-assets` 生成(品牌色 + 首字母 B);换品牌 = 改 globals.css 主题色 + 重跑 gen-assets。
- **文章封面**:可选(frontmatter `image`),未配则 og:image 回退 hero.webp;批量生成 `pnpm gen-covers`。
- **manifest.json**:start_url 和图标是**相对路径**(子路径自适应);gen-assets 会同步 theme_color,别手改成根绝对路径。

## 6. 页面写作规范(不变)

- 正文**第一段就直答**玩家的问题,不铺垫
- 每页带核实时间戳(frontmatter `date` + `lastModified`)——准确性是本站对假码站的差异化
- 页脚法务声明在 `src/config/site.ts` 的 legalNotice + `src/locales/en.json` footer

## 7. 本地开发

```bash
pnpm install
pnpm dev                # http://localhost:4321/breakegg-guide/(dev 自带 base 前缀)
node scripts/ship.mjs   # 构建 + 镜像 dist → 仓库根(发布前必跑)
pnpm test               # 单测;pnpm check-content 等内容门
```

浏览器验证子路径(astro preview 不带 base 挂载 dist,不适用):建一个 junction 把仓库根映射为 `.preview-root/breakegg-guide`,再 `python -m http.server 8900 -d .preview-root`,访问 http://127.0.0.1:8900/breakegg-guide/ 即为生产等效。

## 8. 待办(按优先级)

1. ~~部署~~ ✅ 2026-10-12 AnvilWiki 版上线(同 URL);换自定义域名时:改 site.ts domain(及 SITE_URL 环境),重跑 ship
2. ~~Search Console 提交~~ ✅ 已做(用户操作);sitemap 地址:`/sitemap-index.xml`(已提交版本指向旧 sitemap.xml 的话,在 Search Console 里补提交一次 sitemap-index.xml 即可)
3. `pets` 分类 + 宠物图鉴:78 只需逐 biome 核实(游戏内截图或社区数据交叉验证),不抄竞品;加分类要同步 navigation.ts + en.json nav/overview + 目录
4. 内容节奏:游戏每次更新后 24h 内更新 codes/guide 页(frontmatter lastModified + 核验日志加一行),需求是事件驱动的
5. 候选表欠账:拍板记录(决定=做,10-12)+ itch 复测 + 终末地放弃标签——等用户的 Excel 关闭后写入 `../游戏攻略站选品候选表.xlsx`
6. GK2(78 分)为第二候选:用户未拍板,若做则同款流程另立目录

## 9. 会话背景速览

- 工作流:选品(第 1 课)→ 趋势(第 2 课)→ 竞争(第 3 课)→ 意图(第 5 课)→ 打分拍板(第 6 课)→ 建站(本目录;站点本身基于 AnvilWiki 模板,其学习手册在 `docs/handbook/`)
- 主会话负责每日三渠道扫描与候选表(`../游戏攻略站选品候选表.xlsx`,46+ 行);本目录只做站
- 用户节奏:更新日截图趋势图给主会话判读;峰值过基准一半(35-40)即全面投入
- AI 写内容:仓库自带 `.agent/skills/`(anvil-new-article 等),AGENTS.md 是给 agent 的操作规范
