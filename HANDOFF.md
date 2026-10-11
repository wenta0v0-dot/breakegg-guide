# Break and Steal an Egg 指导站 — 项目简报(HANDOFF)

> 本文件是站点工作的完整交接文档。任何新会话读完此文件即可继续建站,无需回翻聊天记录。

## 1. 站点定位

- **主题**:Roblox 游戏《Break and Steal an Egg》的玩家指导站(非官方 fan site)
- **语言**:英语(目标流量是英语玩家)
- **选品依据**(拍板日 2026-10-12):
  - 需求:同时在线 31.8 万(10-11,4 天 6 倍);Google Trends 官方标「暴增」——同比 >5,000%、环比 +110%,全周新高
  - 竞争:wiki 词有 4-6 个两周内赶出来的薄站 + IGN;**codes 词存在「意图错位空位」——游戏没有文本兑换码,但搜索的人不知道,现有页面没把真答案讲清楚**
  - 打分:85/100(第 6 课口径),拍板「做」

## 2. 已验证事实(写内容只能用这些,标注核实日期)

| 事实 | 来源/核实日 |
|---|---|
| 游戏无传统文本兑换码;奖励走 Discord 关联(商店内输入 Discord 用户名验证→领 Saber-tooth Egg) | Google AI Overview + GameBoost 页,10-11 |
| 点赞游戏 + 加入官方群组 → 免费奖励 | 游戏 Roblox 官方描述,10-05 |
| 核心循环:打破鸡蛋→孵化稀有动物→偷别人的动物并躲开守卫→放到自己基地→赚现金→升级速度和镐子→图鉴(index)全收集 | Roblox 官方游戏描述,10-05 |
| 已知区域:Forest、Desert、Galaxy(还有更多) | 搜索 PAA,10-11 |
| 成长系统:Speed、Pickaxes、Trails、Pen capacity、carry timer、hatching | 竞品 wiki 摘要,10-11 |
| 宠物总数 78 只,按 biome 分布 | IGN 攻略(10-09 前后),10-11 |
| 游戏数据:placeId 114326934417838 / universeId 10765288803 / 上线 2026-09-05 / 98% 好评 | Roblox API,10-05~10-11 |

**红线**:不编造宠物名、数值、码。未核实的数据标 "unverified" 或不写。

## 3. 信息架构(v1)

- `index.html` — 首页 hub:蛋裂开场动画 + 无码真相 callout + 页面卡片 + 游戏简介
- `codes.html` — 主攻页:标题吃 "codes" 搜索意图,首段直答「没有文本码」,然后给真答案(Discord 关联步骤)、假码鉴别、核验日志、FAQ(带 FAQPage JSON-LD)
- `guide.html` — 新手指南:核心循环(编号步骤)、区域、升级系统、新手技巧
- `css/style.css` — 全站样式(无 JS)

后续页面(下一迭代):`pets.html`(78 只宠物图鉴,需先采集数据)、`zones.html`、`updates.html`。

## 4. 设计规范

- **世界取材**:蛋壳、裂纹、蛋黄、巢、现金。分隔线用裂纹 SVG。
- **色板**:eggshell `#FBF3E2` / deep `#F3E6C8` / ink `#33241A` / ink-soft `#6B5138` / yolk `#FFB627` / yolk-deep `#E79B00` / rare teal `#2FA08D` / alert `#C4553B` / card `#FFFDF6`
- **字体**:Lilita One(标题,Google Fonts)+ Nunito(正文);断网时回退系统圆体
- **动效**:首屏蛋「晃动→裂纹描线→裂开」一次编排(纯 CSS),`prefers-reduced-motion` 时禁用
- **移动优先**:受众大量手机端;无 JS、单 CSS、系统字体回退,保证速度

## 5. 页面写作规范(第 5 课)

- 正文**第一段就直答**玩家的问题,不铺垫
- 每页带 "Last checked: October 12, 2026" 类核实时间戳——准确性是本站对假码站的差异化
- 页脚:非官方 fan site 声明,与 Roblox 及游戏开发商无隶属关系

## 6. 待办(按优先级)

1. 部署:Cloudflare Pages / GitHub Pages(静态直传);域名可用 breakstealegg 类(注意 breakstealegg.wiki 已被占)
2. `pets.html`:78 只宠物图鉴——数据采集需逐 biome 核实(游戏内截图或社区数据交叉验证),不抄竞品
3. Search Console 提交 + sitemap
4. 内容节奏:游戏每次更新后 24h 内更新 codes/guide 页(需求是事件驱动的)
5. 候选表欠账:拍板记录(决定=做,10-12)+ itch 复测 + 终末地放弃标签——等用户的 Excel 关闭后写入 `../游戏攻略站选品候选表.xlsx`
6. GK2(78 分)为第二候选:用户未拍板,若做则同款流程另立目录

## 7. 会话背景速览

- 工作流:选品(第 1 课)→ 趋势(第 2 课)→ 竞争(第 3 课)→ 意图(第 5 课)→ 打分拍板(第 6 课)→ 建站(本任务)
- 主会话负责每日三渠道扫描与候选表(`../游戏攻略站选品候选表.xlsx`,46+ 行);本目录只做站
- 用户节奏:更新日截图趋势图给主会话判读;峰值过基准一半(35-40)即全面投入
