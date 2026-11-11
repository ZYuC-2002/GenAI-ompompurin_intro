(() => {
  const FIELDS = [
    ["生日", "birthday"],
    ["個性與喜好", "personality_hobbies"],
    ["與布丁狗的關係", "relation_to_purin"],
    ["特徵", "features"]
  ];
  const HERO_ID = "purin";

  const el = (tag, props = {}, children = []) => {
    const node = Object.assign(document.createElement(tag), props);
    children.forEach(c => node.append(c));
    return node;
  };

  const image = (c, cls) => {
    const img = el("img", { className: cls, src: c.image_url, alt: `${c.name_zh} ${c.name_en}`, loading: "lazy" });
    // 找不到 .png 時改試 .jpg（規範允許），仍失敗則隱藏
    img.addEventListener("error", () => {
      if (!img.dataset.retried) { img.dataset.retried = "1"; img.src = c.image_url.replace(/\.png$/, ".jpg"); }
      else { img.style.visibility = "hidden"; }
    });
    return img;
  };

  const details = (c) => {
    const dl = el("dl");
    FIELDS.forEach(([label, key]) => dl.append(el("dt", { textContent: label }), el("dd", { textContent: c[key] })));
    return dl;
  };

  const renderHero = (c) => {
    document.getElementById("hero").replaceChildren(
      image(c, "hero-img"),
      el("div", {}, [
        el("h1", { textContent: c.name_zh }),
        el("p", { className: "en", textContent: c.name_en }),
        details(c)
      ])
    );
  };

  const renderCards = (list) => {
    document.getElementById("card-grid").replaceChildren(...list.map(c =>
      el("article", { className: "card" }, [
        image(c, "card-img"),
        el("h3", { textContent: c.name_zh }),
        el("p", { className: "en", textContent: c.name_en }),
        details(c)
      ])
    ));
  };

  fetch("data/friends.json")
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => {
      const main = data.find(c => c.id === HERO_ID);
      if (main) renderHero(main);
      renderCards(data.filter(c => c.id !== HERO_ID));
    })
    .catch(() => {
      document.getElementById("hero").replaceChildren(
        el("p", { className: "status", textContent: "資料載入失敗，請透過本機伺服器或 GitHub Pages 開啟（直接開啟檔案無法讀取 JSON）。" })
      );
    });
})();
