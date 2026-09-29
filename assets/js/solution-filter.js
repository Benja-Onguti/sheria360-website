 (function () {
        //  Filter Functionality
        const filterTabs = document.querySelectorAll(
          "#solution-filters .tp-filter-tab",
        );
        const solutionItems = document.querySelectorAll(
          "#solutions-grid .tp-solution-item",
        );
        const noResults = document.getElementById("no-results");

        filterTabs.forEach(function (tab) {
          tab.addEventListener("click", function () {
            filterTabs.forEach(function (t) {
              t.classList.remove("active");
            });
            tab.classList.add("active");

            const filter = tab.getAttribute("data-filter");
            let visibleCount = 0;

            solutionItems.forEach(function (item) {
              const category = item.getAttribute("data-category");
              if (filter === "all" || category === filter) {
                item.style.display = "";
                visibleCount++;
                const card = item.querySelector(".tp-solution-card");
                if (card) {
                  card.style.animation = "none";
                  card.offsetHeight;
                  card.style.animation = "";
                }
              } else {
                item.style.display = "none";
              }
            });

            if (noResults) {
              noResults.style.display = visibleCount === 0 ? "block" : "none";
            }
          });
        });

        //  Intersection Observer for scroll animations
        if ("IntersectionObserver" in window) {
          const observerOptions = {
            root: null,
            rootMargin: "0px 0px -60px 0px",
            threshold: 0.1,
          };

          const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                const card = entry.target;
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
                observer.unobserve(card);
              }
            });
          }, observerOptions);

          document
            .querySelectorAll(".tp-solution-card")
            .forEach(function (card) {
              card.style.opacity = "0";
              card.style.transform = "translateY(30px)";
              card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
              observer.observe(card);
            });

          setTimeout(function () {
            document
              .querySelectorAll(".tp-solution-card")
              .forEach(function (card) {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                  card.style.opacity = "1";
                  card.style.transform = "translateY(0)";
                }
              });
          }, 200);
        } else {
          document
            .querySelectorAll(".tp-solution-card")
            .forEach(function (card) {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
        }

        //  Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
          anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });
        });
      })();