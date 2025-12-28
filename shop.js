/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR SHOP SYSTEM (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Master catalog controller. Handles dynamic product rendering,
 * real-time filtering, and perceived performance via shimmer skeletons.
 */

const ShopSystem = (() => {
  // 1. THE PRODUCT CATALOG
  const PRODUCTS = [
    {
      id: "prod_001",
      title: "Ultimate Notion OS",
      collection: "productivity",
      price: 24.00,
      image: "images/1/notion-os.webp",
      icon: "⚡", 
      tag: "Notion System",
      downloadLink: "#",
    },
    {
      id: "prod_002",
      title: "Kids Activity Pack",
      collection: "family",
      price: 0.0,
      image: "images/1/kids-pack.webp",
      icon: "🎨",
      tag: "Printable PDF",
      downloadLink: "assets/kids-activity-pack.pdf",
    },
    {
      id: "prod_003",
      title: "Startup Launch Kit",
      collection: "productivity",
      price: 15.00,
      image: "images/1/startup-kit.webp",
      icon: "🚀",
      tag: "Business Guide",
      downloadLink: "#",
    },
    {
      id: "prod_004",
      title: "AI Master Prompts",
      collection: "creative",
      price: 0.0,
      image: "images/1/ai-prompts.webp",
      icon: "🤖",
      tag: "AI Tool",
      downloadLink: "assets/ai-prompts.pdf",
    },
    {
      id: "prod_005",
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
    grid: document.getElementById("product-grid"),
    search: document.getElementById("shop-search"),
    filters: document.querySelectorAll("#filter-stream button"),
  };

  // 2. THE RENDERER
  const Renderer = {
    buildGrid(items) {
      if (!DOM.grid) return;

      // Initial visual reset
      DOM.grid.style.opacity = "0";
      DOM.grid.style.transform = "translateY(10px)";

      setTimeout(() => {
        DOM.grid.innerHTML = "";

        if (items.length === 0) {
          DOM.grid.innerHTML = `
            <div class="stream-card" style="width: 100%; height: 240px; grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.6;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
              <div style="font-family: var(--font-display); font-size: 1.2rem;">No Products Found</div>
            </div>`;
        } else {
          // Render Shimmer Skeletons
          DOM.grid.innerHTML = Array(3).fill(0).map(() => `
            <div class="skeleton-card">
              <div class="skeleton" style="height: 160px; border-radius: 0;"></div>
              <div style="padding: 1.5rem;">
                <div class="skeleton" style="height: 12px; width: 40%; margin-bottom: 10px;"></div>
                <div class="skeleton" style="height: 20px; width: 80%; margin-bottom: 20px;"></div>
                <div style="display: flex; justify-content: space-between;">
                  <div class="skeleton" style="height: 24px; width: 30%;"></div>
                  <div class="skeleton" style="height: 32px; width: 40%; border-radius: 99px;"></div>
                </div>
              </div>
            </div>
          `).join('');

          // Switch to real products
          setTimeout(() => {
            DOM.grid.innerHTML = "";
            items.forEach((item, index) => {
              const html = this.createCard(item);
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = html;
              const cardElement = tempDiv.firstElementChild;
              
              cardElement.classList.add('product-card-reveal');
              cardElement.style.animationDelay = `${index * 0.08}s`;
              
              DOM.grid.appendChild(cardElement);
            });
          }, 450);
        }

        DOM.grid.style.opacity = "1";
        DOM.grid.style.transform = "translateY(0)";
      }, 300);
    },

    createCard(item) {
      const isFree = item.price === 0;
      const formattedPrice = isFree ? "Free" : `£${item.price.toFixed(2)}`;
      const detailLink = `product.html?id=${item.id}`;

      const visualBlock = item.image
        ? `<a href="${detailLink}" style="display:block; width:100%; height:100%;">
             <img src="${item.image}" alt="${item.title}" loading="lazy" class="lazy-load" 
                  style="width: 100%; height: 100%; object-fit: cover;" 
                  onload="this.classList.add('loaded')">
           </a>`
        : `<a href="${detailLink}" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; background: var(--grad-silver); text-decoration:none;">${item.icon || "📦"}</a>`;

            const actionBtn = isFree
          ? `<button onclick="KynarCart.directDownload('${item.downloadLink}')" class="dock-btn" style="height: 34px; padding: 0 1.25rem; font-size: 0.75rem; background: var(--bg-canvas); color: var(--ink-display); border: 1px solid var(--ink-border);">Get Free</button>`
          : `<button onclick="KynarCart.add('${item.id}')" class="dock-btn" style="height: 34px; padding: 0 1.25rem; font-size: 0.75rem; background: var(--grad-gold); color: white; border: none;">+ Add to Cart</button>`;


      return `
        <div class="stream-card ${!isFree ? 'glimmer-card' : ''}" style="height: auto; min-height: 290px; padding: 0;">
            <div class="stream-visual" style="width: 100%; height: 160px; position: relative; overflow: hidden; background: var(--bg-canvas);">
                ${visualBlock}
                <div style="position: absolute; top: 12px; left: 12px;">
                    <span style="background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); padding: 4px 10px; border-radius: 6px; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; color: var(--ink-display); letter-spacing: 0.05em;">
                        ${item.collection}
                    </span>
                </div>
            </div>

            <div style="padding: 1.25rem; display: flex; flex-direction: column; flex: 1;">
                <div style="font-size: 0.7rem; color: var(--accent-gold); font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">${item.tag}</div>
                <div class="stream-title" style="font-size: 1.1rem; margin-bottom: 1.2rem; line-height: 1.3;">${item.title}</div>
                
                <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--ink-border);">
                    <div style="display: flex; flex-direction: column;">
                        <span style="font-size: 0.6rem; color: var(--ink-muted); text-transform: uppercase; font-weight: 700;">Price</span>
                        <span style="font-weight: 800; color: var(--ink-display); font-size: 1.1rem;">${formattedPrice}</span>
                    </div>
                    ${actionBtn}
                </div>
            </div>
        </div>`;
    },
  };

  // 3. CONTROLLER
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
      console.log("Kynar Shop: System Active");
    },

    bindEvents() {
      if (DOM.search) {
        DOM.search.addEventListener("input", (e) => {
          const term = e.target.value.toLowerCase();
          const filtered = PRODUCTS.filter(i => 
            i.title.toLowerCase().includes(term) || 
            i.collection.toLowerCase().includes(term) || 
            i.tag.toLowerCase().includes(term)
          );
          Renderer.buildGrid(filtered);
        });
      }

      if (DOM.filters) {
        DOM.filters.forEach(btn => {
          btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            this.highlightFilter(filter);
            this.applyFilter(filter);
          });
        });
      }
    },

    applyFilter(filter) {
      let result = filter === "all" ? PRODUCTS : PRODUCTS.filter(i => i.collection.toLowerCase() === filter.toLowerCase());
      Renderer.buildGrid(result);
    },

    highlightFilter(filterName) {
      DOM.filters.forEach(b => {
        const isActive = b.dataset.filter === filterName;
        b.style.background = isActive ? "var(--grad-gold)" : "white";
        b.style.color = isActive ? "white" : "var(--ink-display)";
        b.style.border = isActive ? "none" : "1px solid var(--ink-border)";
      });
    },
  };

  return {
    init: Controller.init,
    getDb: () => PRODUCTS,
  };
})();

document.addEventListener("DOMContentLoaded", ShopSystem.init);
