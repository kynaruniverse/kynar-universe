/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR SHOP SYSTEM (V2.0 - MATRIX GRID)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Generates the 2-column product matrix and handles filtering.
 */

const ShopSystem = (() => {
  
  // 1. THE CENTRAL PRODUCT DATABASE
  // This matches the visual style of your new Product Page
  const PRODUCTS = [
    { 
      id: "prod_001", 
      title: "Ultimate Notion OS", 
      category: "systems", // Lowercase for filtering
      price: "£24.00", 
      icon: "⚡", 
      tag: "System", 
      bg: "var(--grad-gold)",
      desc: "The definitive workspace for digital creators."
    },
    { 
      id: "prod_002", 
      title: "Kids Activity Pack", 
      category: "creative", 
      price: "Free", 
      icon: "🎨", 
      tag: "Family", 
      bg: "var(--bg-canvas)",
      desc: "Printable assets for children."
    },
    { 
      id: "prod_003", 
      title: "Startup Launch Kit", 
      category: "business", 
      price: "£15.00", 
      icon: "🚀", 
      tag: "Business", 
      bg: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      desc: "Pitch decks and financial models."
    },
    { 
      id: "prod_004", 
      title: "AI Master Prompts", 
      category: "ai", 
      price: "Free", 
      icon: "🤖", 
      tag: "AI Tool", 
      bg: "#e0f2f1",
      desc: "Advanced prompt engineering guide."
    },
    { 
      id: "prod_005", 
      title: "Home School Planner", 
      category: "education", 
      price: "£12.00", 
      icon: "📅", 
      tag: "Planner", 
      bg: "#fff3e0",
      desc: "Digital curriculum organizer."
    }
  ];

  // DOM Elements
  const DOM = {
    grid: document.querySelector(".shop-grid"), // Targets the class we added in CSS
    search: document.querySelector(".search-input"),
    filters: document.querySelectorAll(".filter-pill")
  };

  // 2. THE RENDERER (Matrix Style)
  const Renderer = {
    
    buildGrid(items) {
      if (!DOM.grid) return;
      
      // Fade out for smooth transition
      DOM.grid.style.opacity = "0";
      DOM.grid.style.transform = "translateY(10px)";
      DOM.grid.style.transition = "all 0.3s ease";

      setTimeout(() => {
        DOM.grid.innerHTML = "";
        
        if (items.length === 0) {
          DOM.grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 4rem 1rem; opacity:0.5;">
                <div style="font-size:2rem; margin-bottom:1rem;">🔍</div>
                <div>No systems found.</div>
            </div>`;
        } else {
          items.forEach((item, index) => {
            DOM.grid.innerHTML += this.createNode(item);
          });
          
          // Re-attach listeners to new buttons
          Controller.attachCartListeners();
        }
        
        // Fade in
        DOM.grid.style.opacity = "1";
        DOM.grid.style.transform = "translateY(0)";
      }, 200);
    },

    // Generates the 2-Column "Product Node" HTML
    createNode(item) {
      // Determine button style
      const isFree = item.price === "Free" || item.price === 0;
      const btnClass = isFree ? "btn-ghost" : "btn-gold";
      const btnText = isFree ? "Download" : "Add to Cart";

      return `
        <div class="product-node">
            <a href="product.html?id=${item.id}" class="node-preview" style="text-decoration:none;">
                <div style="font-size: 2.5rem; transition:transform 0.3s ease;">${item.icon}</div>
                <span class="node-tag">${item.tag}</span>
            </a>
            <div class="node-details">
                <a href="product.html?id=${item.id}" class="node-title" style="text-decoration:none;">${item.title}</a>
                <div class="node-price">${item.price}</div>
                <button 
                    class="node-btn ${btnClass}" 
                    data-id="${item.id}"
                >${btnText}</button>
            </div>
        </div>`;
    }
  };

  // 3. THE CONTROLLER (Logic)
  const Controller = {
    init() {
      if (DOM.grid) Renderer.buildGrid(PRODUCTS);
      this.bindEvents();
    },

    bindEvents() {
      // A. Search Logic
      if (DOM.search) {
        DOM.search.addEventListener("input", (e) => {
          const term = e.target.value.toLowerCase();
          const filtered = PRODUCTS.filter(i => i.title.toLowerCase().includes(term));
          Renderer.buildGrid(filtered);
        });
      }

      // B. Filter Pills Logic
      if (DOM.filters) {
        DOM.filters.forEach(pill => {
          pill.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Visual Toggle
            DOM.filters.forEach(p => p.classList.remove("active"));
            e.target.classList.add("active");

            // Filter Logic
            const category = e.target.innerText.toLowerCase(); // "systems", "creative", "all products"
            
            if (category.includes("all")) {
                Renderer.buildGrid(PRODUCTS);
            } else {
                // Simple partial match for demo
                const filtered = PRODUCTS.filter(p => 
                    p.category.includes(category) || 
                    p.tag.toLowerCase().includes(category)
                );
                Renderer.buildGrid(filtered);
            }
          });
        });
      }
    },

    // Connects the generated buttons to KynarCart
    attachCartListeners() {
      const buttons = document.querySelectorAll(".node-btn");
      buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation(); // Don't trigger the link

          const id = btn.dataset.id;
          const product = PRODUCTS.find(p => p.id === id);

          if (product && window.KynarCart) {
            window.KynarCart.add({
                id: product.id,
                title: product.title,
                price: product.price,
                meta: product.tag,
                icon: product.icon,
                bg: product.bg
            });
          }
        });
      });
    }
  };

  // EXPOSE DATABASE GLOBALLY
  window.KynarDB = PRODUCTS;

  return { 
    init: Controller.init
  };
})();

// Initialize
document.addEventListener("DOMContentLoaded", () => ShopSystem.init());
