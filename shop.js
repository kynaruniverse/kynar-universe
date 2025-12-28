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

                // --- Phase 8: Perceived Performance (Skeletons) ---
        if (items.length === 0) {
          DOM.grid.innerHTML = `
                <div class="stream-card" style="width: 100%; height: 200px; grid-column: 1 / -1; align-items: center; justify-content: center; opacity: 0.7; pointer-events: none;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🌫️</div>
                    <div style="font-family: 'Bantayog'; font-size: 1.2rem;">No Products Found</div>
                </div>`;
        } else {
          // Render Skeletons first for 400ms to ensure visual stability
          DOM.grid.innerHTML = Array(3).fill(0).map(() => `
            <div class="skeleton-card">
              <div class="skeleton" style="height: 160px; border-radius: 0;"></div>
              <div style="padding: 1.25rem;">
                <div class="skeleton" style="height: 12px; width: 40%; margin-bottom: 10px;"></div>
                <div class="skeleton" style="height: 20px; width: 80%; margin-bottom: 20px;"></div>
                <div style="display: flex; justify-content: space-between;">
                  <div class="skeleton" style="height: 24px; width: 30%;"></div>
                  <div class="skeleton" style="height: 32px; width: 40%; border-radius: 99px;"></div>
                </div>
              </div>
            </div>
          `).join('');

          // Smoothly replace skeletons with real products
          setTimeout(() => {
            DOM.grid.innerHTML = "";
            items.forEach((item, index) => {
              const html = this.createCard(item);
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = html;
              const cardElement = tempDiv.firstElementChild;
              
              cardElement.classList.add('artifact-card-reveal');
              cardElement.style.animationDelay = `${index * 0.08}s`;
              
              DOM.grid.appendChild(cardElement);
            });
          }, 400);
        }


      }, 300);
      
      // Ensure the grid container itself is visible once the skeletons appear
      DOM.grid.style.opacity = "1";
      DOM.grid.style.transform = "translateY(0)";

    },

    createCard(item) {
      const formattedPrice = item.price === 0 ? "Free" : `£${item.price.toFixed(2)}`;
      
      // Link to product detail page
      const detailLink = `product.html?id=${item.id}`;

      const visualBlock = item.image
        ? `<a href="${detailLink}" style="display:block; width:100%; height:100%;">
             <img src="${item.image}" 
     alt="${item.title}" 
     loading="lazy" 
     class="lazy-load" 
     style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" 
     onload="this.classList.add('loaded')"
     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 3rem; background: var(--grad-silver); color: var(--ink-muted);">${item.icon || "📦"}</div>
           </a>`
        : `<a href="${detailLink}" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; background: var(--grad-silver); color: var(--ink-muted); text-decoration:none;">${item.icon || "📦"}</a>`;

      const actionBtn = item.price === 0
          ? `<button onclick="window.Satchel.directDownload('${item.downloadLink}')" class="dock-btn" style="height: 32px; padding: 0 1rem; font-size: 0.75rem; border: 1px solid var(--ink-muted); background: transparent; color: var(--ink-body);">Download</button>`
          : `<button onclick="window.Satchel.add('${item.id}')" class="dock-btn" style="height: 32px; padding: 0 1rem; font-size: 0.75rem; background: var(--grad-gold); color: white; border: none;">+ Add to Cart</button>`;

            // Add 'glimmer-card' class if product is a paid asset
      const luxuryClass = item.price > 0 ? "glimmer-card" : "";

      return `
            <div class="stream-card ${luxuryClass}" style="height: auto; min-height: 280px; padding: 0; border: 1px solid rgba(0,0,0,0.05);">
                
                <div class="stream-visual" style="width: 100%; height: 160px; border-radius: 0; margin-bottom: 0; position: relative; overflow: hidden; background: #f0f0f0;">
                    ${visualBlock}
                    <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 6px;">
                        <span style="background: rgba(255,255,255,0.95); backdrop-filter: blur(4px); padding: 4px 10px; border-radius: 6px; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; color: var(--ink-display); letter-spacing: 0.05em; box-shadow: var(--shadow-soft);">
                            ${item.collection}
                        </span>
                    </div>
                </div>

                <div style="padding: 1.25rem; display: flex; flex-direction: column; flex: 1;">
                    <div style="font-size: 0.7rem; color: var(--accent-gold); font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">${item.tag}</div>
                    <div class="stream-title" style="font-size: 1.1rem; margin-bottom: 1rem; line-height: 1.3;">${item.title}</div>
                    
                    <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.03);">
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.65rem; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.05em;">Price</span>
                            <span style="font-weight: 800; color: var(--ink-display); font-family: 'Glacial Indifference'; font-size: 1.1rem;">${formattedPrice}</span>
                        </div>
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
