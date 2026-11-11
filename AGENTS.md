```markdown
# 專案開發規範與 AI 指引 (AGENTS.md)

## 1. 專案簡介 (Project Overview)
本專案為一個介紹「布丁狗（Pompompurin）與他的家人及好友們」的單頁式（Single-Page）展示網站。
專案旨在展示完整角色資訊，透過標準化的 JSON 資料結構與模組化渲染機制，讓後續新增或修改角色時能夠快速擴充。網站最終發布於 **GitHub Pages**。

---

## 2. 技術棧與技術限制 (Tech Stack & Constraints)
* **前端技術**：原生 HTML5、CSS3、JavaScript (ES6+)
* **資料儲存**：獨立 JSON 檔案 (`data/friends.json`)
* **部署平台**：GitHub Pages (靜態網頁託管)
* **設計原則**：無須使用額外前端框架（如 React/Vue），維持輕量、載入迅速且易於維護。

---

## 3. 視覺風格與 UI 規範 (Design System & Styling)

### 3.1 視覺氛圍
* 日系可愛風（Kawaii Style）、暖色調、高親和力、採用圓角邊框與卡片式設計。

### 3.2 色彩定義 (CSS Global Variables)
所有顏色必須嚴格使用 `style.css` 中定義的 CSS 變數，**AI 禁止任意修改全局變數或寫死色碼**：

```css
:root {
  --bg-pudding-yellow: #FFF59D;  /* 網頁背景：布丁黃 */
  --card-cream-white: #FFFDE7;   /* 卡片背景：奶油白 */
  --caramel-brown: #5D4037;      /* 框框與文字：焦糖棕 */
  --border-radius-lg: 20px;      /* 大圓角（容器/Hero） */
  --border-radius-md: 16px;      /* 中圓角（卡片） */
}

```

### 3.3 元件視覺要求

* **卡片外框**：焦糖棕實線邊框 (`2px solid var(--caramel-brown)`)。
* **文字顏色**：全站主要文字統一採用焦糖棕 (`color: var(--caramel-brown)`)。
* **圓角設計**：卡片與容器均需套用圓角效果 (`border-radius`)。

---

## 4. 頁面結構與佈局 (Page Architecture)

頁面採用單頁式結構 (Single-Page Layout)，從上至下分為兩大區塊：

1. **頂部 Hero 主視覺區 (Hero Section)**：
* 突出介紹主角「布丁狗 (Pompompurin)」。
* 包含布丁狗大圖、中英文名與重點介紹。


2. **好友與家人卡片列表區 (Friends & Family Card Grid)**：
* 使用 CSS Grid 或 Flexbox 排版。
* 由 JS 動態讀取 `data/friends.json` 並渲染每個角色的介紹卡片。



---

## 5. 資料規格與 JSON Schema (Data Schema)

所有角色資料必須統一放在 `data/friends.json` 檔案中。新增或修改角色時，必須完全符合以下欄位結構：

```json
[
  {
    "id": "muffin",
    "name_zh": "瑪芬",
    "name_en": "Muffin",
    "birthday": "9月16日",
    "personality_hobbies": "喜歡吃東西、藏東西，個性大膽直率",
    "relation_to_purin": "布丁狗的好朋友（黃金倉鼠）",
    "features": "頭上常常戴著帽帽，個子小巧可愛",
    "image_url": "assets/images/muffin.png"
  }
]

```

### 欄位說明表

| 欄位名稱 (`Key`) | 型態 | 說明 |
| --- | --- | --- |
| `id` | String | 角色唯一識別碼（全小寫英文字母，如 `muffin`） |
| `name_zh` | String | 角色中文名稱 |
| `name_en` | String | 角色英文名稱 |
| `birthday` | String | 生日資訊 |
| `personality_hobbies` | String | 個性與喜好描述 |
| `relation_to_purin` | String | 與布丁狗的關係描述 |
| `features` | String | 外觀或性格特徵 |
| `image_url` | String | 角色圖片相對路徑 (`assets/images/{id}.png`) |

---

## 6. 檔案結構 (Directory Structure)

```text
pompompurin-friends/
├── AGENTS.md             # 本規範文件
├── index.html            # 網站主頁面
├── css/
│   └── style.css         # 主樣式表 (包含配色變數與 RWD)
├── js/
│   └── main.js           # 動態讀取 JSON 並渲染卡片的邏輯
├── data/
│   └── friends.json      # 角色資料庫
└── assets/
    └── images/           # 角色圖片資料夾

```

---

## 7. AI 協作與自動開發規則 (Strict AI Rules)

AI 在執行本專案相關的程式碼撰寫、資料搜集或內容擴充時，**必須嚴格遵守以下規則**：

1. **自動聯網檢索與資料擴充 (Automated Data Gathering)**：
* 在建立或更新 `data/friends.json` 時，**AI 必須主動使用搜尋工具查詢 Sanrio 官方或布丁狗（Pompompurin）相關網站**。
* 搜尋範圍必須涵蓋：
1. **布丁狗本尊**
2. **家人**：爸爸 (Papa/George)、媽媽 (Mama/Noriko)、爺爺 (Grandpa)、奶奶 (Grandma) 等。
3. **好友夥伴**：瑪芬 (Muffin)、瑪卡蘿 (Macaron)、拿鐵 (Latté)、司康 (Scone)、貝果 (Bagel)、卡士達 (Custard)、蜜糖/粉紅 (Powder)、椰子 (Mint/Coconut)、泡芙 (Chiffon/Puff) 等 Sanrio 官方好友角色。


* **禁止僅使用內建示範範例**，必須將搜尋到的完整角色資料填入 `data/friends.json` 中。


2. **資料與邏輯分離**：
* **所有角色資料必須放在 `data/friends.json**`，絕不可寫死 (Hardcode) 在 HTML 中。


3. **禁止擅自修改 CSS 全局變數**：
* 全局主題色（焦糖棕、奶油白、布丁黃）為網站核心視覺，**AI 不得任意更改 `:root` 中的 CSS 變數設定**。


4. **維護 RWD 響應式排版**：
* 確保網頁在 Desktop、Tablet 與 Mobile 裝置上皆能正常瀏覽。
* 卡片網格必須隨著螢幕寬度彈性伸縮（如桌面 3~4 欄、平板 2 欄、手機 1 欄）。


5. **圖片路徑規範**：
* 所有角色的圖片路徑統一設定為 `assets/images/{id}.png`（或 `.jpg`）。