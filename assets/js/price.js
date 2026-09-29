(function () {
        const API_URL = "https://App.sheria360.com/modules/central/api/publicSubscriptionCatalog";
        let catalogData = null;
        let isYearly = false; // Default set to monthly

        async function loadCatalog() {
          const container = document.getElementById("pricingCards");
          try {
            const res = await fetch(API_URL);
            const json = await res.json();
            if (!json.success || !json.success.data) throw new Error("Invalid API response");
            catalogData = json.success.data;
            renderCards(catalogData);
            updateSaveBadge(catalogData.annual_discount_percent);
          } catch (err) {
            console.error("Pricing catalog load failed:", err);
            container.innerHTML = '<div style="text-align:center; width:100%; padding: 40px; color: #5c6980;">Unable to load pricing. Please refresh or <a href="contact.html">contact us</a>.</div>';
          }
        }

        function renderCards(data) {
          const container = document.getElementById("pricingCards");
          const currency = data.currency || "KES";
          const discount = data.annual_discount_percent || 0;
          const packages = (data.packages || [])
            .filter((p) => p.price_per_user > 1) 
            .filter((p) => p.code !== "standard"); 

          let html = "";

          packages.forEach((pkg) => {
            const isCustomPrice = pkg.code === "enterprise" || pkg.code === "professional";
            const isPopular = pkg.code === "professional";
            
            const monthlyPrice = pkg.price_per_user;
            const yearlyPrice = Math.round(monthlyPrice * (1 - discount / 100));
            const displayPrice = isYearly ? yearlyPrice : monthlyPrice;

            let cardClass = "card";
            if (isPopular) cardClass += " standard";

            const badge = isPopular ? '<div class="badge">Most Popular</div>' : "";
            const btnText = isCustomPrice ? "Contact Sales" : "Subscribe";
            const btnHref = "contact.html";

            const feats = pkg.features_preview || pkg.features || [];
            const featuresHtml = feats.map((f) => `<li><i class="fas fa-check"></i> <span>${f}</span></li>`).join("");
            
            const minUsersNote = pkg.min_users ? `<li><i class="fas fa-info-circle"></i> <span>Minimum ${pkg.min_users} users</span></li>` : "";

            let priceHtml = "";

            if (isCustomPrice) {
              priceHtml = `
                <div class="price-tag" style="margin-top:14px;">
                  <span class="amount" style="font-size:2rem;">Custom Pricing</span>
                </div>
                <div class="billing-note">Tailored for your firm</div>`;
            } else {
              const prefixHtml = pkg.code === "core" ? `<span style="font-size:1.1rem; font-weight:500; color:var(--p-slate-light); margin-right:6px; margin-top:8px;">From</span>` : "";
              priceHtml = `
                <div class="price-tag" data-monthly="${monthlyPrice}" data-yearly="${yearlyPrice}">
                   ${prefixHtml}
                   <span class="currency">${currency}</span>
                   <span class="amount">${displayPrice.toLocaleString("en-KE")}</span>
                 </div>
                 <div class="billing-note">/user/month ${isYearly ? 'billed annually' : 'billed monthly'}</div>`;
            }

            // CLIO-STYLE HTML STRUCTURE
            html += `
              <div class="${cardClass}" data-code="${pkg.code}">
                ${badge}
                <div class="plan-name">${pkg.name}</div>
                <div class="desc">${pkg.tagline || pkg.description || "Essential tools to manage your firm."}</div>
                
                ${priceHtml}
                
                <a href="${btnHref}" class="btn-plan">${btnText}</a>
                
                <div class="features-title">${pkg.name} Includes:</div>
                <ul class="features">
                  ${featuresHtml}
                  ${minUsersNote}
                </ul>
              </div>
            `;
          });

          container.innerHTML = html;
          container.classList.remove("loading");
        }

        function updateSaveBadge(percent) {
          const badge = document.getElementById("saveBadge");
          if (badge && percent) badge.textContent = `Save ${percent}%`;
        }

        const toggle = document.getElementById("billingToggle");
        const labelMonthly = document.getElementById("labelMonthly");
        const labelYearly = document.getElementById("labelYearly");

        function setBilling(year) {
          isYearly = year;
          toggle.classList.toggle("active", isYearly);
          labelMonthly.classList.toggle("active", !isYearly);
          labelYearly.classList.toggle("active", isYearly);

          document.querySelectorAll(".card .price-tag[data-monthly]").forEach((el) => {
            const monthly = parseInt(el.dataset.monthly, 10);
            const yearly = parseInt(el.dataset.yearly, 10);
            const price = isYearly ? yearly : monthly;
            const amountEl = el.querySelector(".amount");
            if(amountEl) {
                amountEl.textContent = price.toLocaleString("en-KE");
            }
          });

          document.querySelectorAll(".card .billing-note").forEach((el) => {
            const card = el.closest(".card");
            if (card && card.dataset.code !== "enterprise" && card.dataset.code !== "professional") {
              el.textContent = `/user/month ${isYearly ? 'billed annually' : 'billed monthly'}`;
            }
          });
        }

        if (toggle) {
          toggle.addEventListener("click", function () {
            setBilling(!this.classList.contains("active"));
          });
        }

        window.toggleFaq = function (el) {
          const item = el.closest(".faq-item");
          const answer = item.querySelector(".a");
          document.querySelectorAll(".faq-item .a.open").forEach((a) => {
            if (a !== answer) {
              a.classList.remove("open");
              a.closest(".faq-item").querySelector(".q").classList.remove("open");
            }
          });
          answer.classList.toggle("open");
          el.classList.toggle("open");
        };

        document.addEventListener("DOMContentLoaded", function () {
          loadCatalog();
          const firstQ = document.querySelector(".faq-item .q");
          if (firstQ) {
            const answer = firstQ.closest(".faq-item").querySelector(".a");
            answer.classList.add("open");
            firstQ.classList.add("open");
          }
        });
      })();