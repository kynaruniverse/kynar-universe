/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: CLEARVIEW SHOP LOGIC (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages the digital product catalog, handles search/filtering,
 * and renders the product grid dynamically.
 */

const ArchiveSystem = (() => {
  // #region [ 1. THE PRODUCT CATALOG ]

  const PRODUCTS = [
    {
      id: "art_001",
      title: "Ultimate Notion OS",
      collection: "productivity",
      price: 24.00,
      image: "images/1/notion-os.webp",
      icon: "⚡", 
      tag: "Notion System",
      downloadLink: "#",
    },
    {
      id: "art_002",
      title: "Kids Activity Pack",
      collection: "family",
      price: 0.0,
      image: "images/1/kids-pack.webp",
      icon: "🎨",
      tag: "Printable PDF",
      downloadLink: "assets/kids-activity-pack.pdf",
    },
    {
      id: "art_003",
      title: "Startup Launch Kit",
      collection: "productivity",
      price: 15.00,
      image: "images/1/startup-kit.webp",
      icon: "🚀",
      tag: "Business Guide",
      downloadLink: "#",
    },
    {
      id: "art_004",
      title: "AI Master Prompts",
      collection: "creative",
      price: 0.0,
      image: "images/1/ai-prompts.webp",
      icon: "🤖",
      tag: "AI Tool",
      downloadLink: "assets/ai-prompts.pdf",
    },
    {
      id: "art_005",
      title: "Home School Planner",
      collection: "family",
      price: 12.00,
      image: "images/1/homeschool.webp",
      icon: "🏠",
      tag: "Digital Planner",
      downloadLink: "#",
    }
  ];

  const DOM = {
    grid: document.getElementById("artifact-grid"),
    search: document.getElementById("archive-search"),
    filters: document.querySelectorAll("#filter-stream button"),
  };

  // #endregion

  // #region [ 2. THE RENDERER ]

  const Renderer = {
    buildGrid(items) {
      if (!DOM.grid) return;

      DOM.grid.style.opacity = "0";
      DOM.grid.style.transform = "translateY(10px)";
      DOM.grid.style.transition = "opacity 0.3s ease, transform 0.3s ease";

      setTimeout(() => {
        DOM.grid.innerHTML = "";

        if (items.length === 0) {
          DOM.grid.innerHTML = `
                <div class="stream-card" style="width: 100%; height: 200px; grid-column: 1 / -1; align-items: center; justify-content: center; opacity: 0.7; pointer-events: none;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🌫️</div>
                    <div style="font-family: 'Bantayog'; font-size: 1.2rem;">No Products Found</div>
                    <div style="font-size: 0.9rem;">Try a different search term or category.</div>
                </div>`;
        } else {
          items.forEach((item) => {
            const html = this.createCard(item);
            DOM.grid.insertAdjacentHTML("beforeend", html);
          });
        }

        DOM.grid.style.opacity = "1";
        DOM.grid.style.transform = "translateY(0)";
      }, 300);
    },

    createCard(item) {
      const formattedPrice = item.price === 0 ? "Free" : `£${item.price.toFixed(2)}`;
      
      // Link to product detail page
      const detailLink = `product.html?id=${item.id}`;

      const visualBlock = item.image
        ? `<a href="${detailLink}" style="display:block; width:100%; height:100%;">
             <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 3rem; background: var(--grad-silver); color: var(--ink-muted);">${item.icon || "📦"}</div>
           </a>`
        : `<a href="${detailLink}" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; background: var(--grad-silver); color: var(--ink-muted); text-decoration:none;">${item.icon || "📦"}</a>`;

      const actionBtn = item.price === 0
          ? `<button onclick="window.Satchel.directDownload('${item.downloadLink}')" class="dock-btn" style="height: 32px; padding: 0 1rem; font-size: 0.75rem; border: 1px solid var(--ink-muted); background: transparent; color: var(--ink-body);">Download</button>`
          : `<button onclick="window.Satchel.add('${item.id}')" class="dock-btn" style="height: 32px; padding: 0 1rem; font-size: 0.75rem; background: var(--grad-gold); color: white; border: none;">+ Add to Cart</button>`;

      return `
            <div class="stream-card" style="height: auto; min-height: 260px; overflow: hidden; padding: 0;">
                <div class="stream-visual" style="width: 100%; height: 140px; border-radius: 0; margin-bottom: 0; position: relative; overflow: hidden;">
                    ${visualBlock}
                    <span style="position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.9); backdrop-filter: blur(4px); padding: 2px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: bold; text-transform: uppercase; color: var(--ink-display);">
                        ${item.collection}
                    </span>
                </div>
                <div style="padding: 1rem; display: flex; flex-direction: column; flex: 1;">
                    <div class="stream-title" style="font-size: 1rem; margin-bottom: 0.25rem;">${item.title}</div>
                    <div class="stream-meta" style="margin-bottom: 1rem;">${item.tag}</div>
                    <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: var(--ink-display); font-family: 'Glacial Indifference';">${formattedPrice}</span>
                        ${actionBtn}
                    </div>
                </div>
            </div>`;
    },
  };

  // #endregion

  // #region [ 3. CONTROLLER ]

  const Controller = {
    init() {
      if (DOM.grid) {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get("filter") || urlParams.get("tag");

        if (filterParam) {
          this.applyFilter(filterParam);
          this.highlightFilter(filterParam);
        } else {
          Renderer.buildGrid(PRODUCTS);
        }
        this.bindEvents();
      }
      console.log("Kynar Shop: Active");
    },

    bindEvents() {
      if (DOM.search) {
        DOM.search.addEventListener("input", (e) => {
          const term = e.target.value.toLowerCase();
          const filtered = PRODUCTS.filter(
            (i) =>
              i.title.toLowerCase().includes(term) ||
              i.collection.includes(term) ||
              i.tag.toLowerCase().includes(term)
          );
          Renderer.buildGrid(filtered);
        });
      }

      if (DOM.filters) {
        DOM.filters.forEach((btn) => {
          btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            this.highlightFilter(filter);
            this.applyFilter(filter);
          });
        });
      }
    },

    applyFilter(filter) {
      let result = filter === "all"
          ? PRODUCTS
          : PRODUCTS.filter(
              (i) => i.collection.toLowerCase() === filter.toLowerCase()
            );
      Renderer.buildGrid(result);
    },

    highlightFilter(filterName) {
      DOM.filters.forEach((b) => {
        b.style.background = "white";
        b.style.color = "var(--ink-body)";
        b.style.border = "1px solid rgba(0,0,0,0.1)";

        if (b.dataset.filter === filterName) {
          b.style.background = "var(--grad-gold)";
          b.style.color = "white";
          b.style.border = "none";
        }
      });
    },
  };

  // #endregion

  return {
    init: Controller.init,
    getDb: () => PRODUCTS,
  };
})();

document.addEventListener("DOMContentLoaded", ArchiveSystem.init);
