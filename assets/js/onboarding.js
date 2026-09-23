(function () {
        /* --- Scroll Reveal (Intersection Observer) --- */
        const revealEls = document.querySelectorAll(".sr-reveal");
        if ("IntersectionObserver" in window) {
          const revealObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("sr-visible");
                  revealObserver.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
          );
          revealEls.forEach((el) => revealObserver.observe(el));
        } else {
          revealEls.forEach((el) => el.classList.add("sr-visible"));
        }

        /* --- FAQ Accordion --- */
        document.querySelectorAll(".sheria-faq-question").forEach((btn) => {
          btn.addEventListener("click", function () {
            const item = this.closest(".sheria-faq-item");
            const isActive = item.classList.contains("active");
            document
              .querySelectorAll(".sheria-faq-item")
              .forEach((i) => i.classList.remove("active"));
            if (!isActive) item.classList.add("active");
          });
        });

        /* --- Onboarding Modal --- */
        const overlay = document.getElementById("onboardingOverlay");
        const closeBtn = document.getElementById("closeModalBtn");
        const tryBtn = document.getElementById("tryFreeBtn");
        const tryBtnHero = document.getElementById("tryFreeBtnHero");
        const progressDots = document.querySelectorAll("#modalProgress span");
        const steps = {
          step0: document.getElementById("step0"),
          step1: document.getElementById("step1"),
          step2: document.getElementById("step2"),
          step3: document.getElementById("step3"),
          stepFinal: document.getElementById("stepFinal"),
        };
        let userType = null,
          area = null,
          size = null,
          role = null;
        let currentStepIndex = 0;
        const stepOrderLegal = ["step0", "step1", "step2", "stepFinal"];
        const stepOrderNonLegal = ["step0", "step3", "stepFinal"];
        let activeOrder = stepOrderLegal;

        function updateProgress() {
          const idx = activeOrder.indexOf(currentStepId);
          progressDots.forEach((dot, i) =>
            dot.classList.toggle("active", i <= idx && i < 3),
          );
        }
        let currentStepId = "step0";

        function showStep(stepId) {
          Object.values(steps).forEach((s) => s.classList.remove("active"));
          if (steps[stepId]) steps[stepId].classList.add("active");
          currentStepId = stepId;
          updateProgress();
        }

        function openModal() {
          overlay.classList.add("active");
          document.body.style.overflow = "hidden";
          showStep("step0");
          userType = null;
          area = null;
          size = null;
          role = null;
          document
            .querySelectorAll(".option-btn.selected")
            .forEach((b) => b.classList.remove("selected"));
          document.getElementById("nextAreaBtn").disabled = true;
          document.getElementById("nextSizeBtn").disabled = true;
          document.getElementById("nextRoleBtn").disabled = true;
          currentStepIndex = 0;
          activeOrder = stepOrderLegal;
        }

        function closeModal() {
          overlay.classList.remove("active");
          document.body.style.overflow = "";
        }

        if (tryBtn)
          tryBtn.addEventListener("click", function (e) {
            e.preventDefault();
            openModal();
          });
        if (tryBtnHero)
          tryBtnHero.addEventListener("click", function (e) {
            e.preventDefault();
            openModal();
          });
        closeBtn.addEventListener("click", closeModal);
        overlay.addEventListener("click", function (e) {
          if (e.target === overlay) closeModal();
        });

        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && overlay.classList.contains("active"))
            closeModal();
        });

        document
          .getElementById("yesBtn")
          .addEventListener("click", function () {
            userType = "legal";
            activeOrder = stepOrderLegal;
            currentStepIndex = 1;
            showStep("step1");
          });
        document.getElementById("noBtn").addEventListener("click", function () {
          userType = "non-legal";
          activeOrder = stepOrderNonLegal;
          currentStepIndex = 1;
          showStep("step3");
        });

        const areaOptions = document.querySelectorAll(
          "#areaOptions .option-btn",
        );
        areaOptions.forEach((btn) => {
          btn.addEventListener("click", function () {
            areaOptions.forEach((b) => b.classList.remove("selected"));
            this.classList.add("selected");
            area = this.dataset.value;
            document.getElementById("nextAreaBtn").disabled = false;
          });
        });
        document
          .getElementById("nextAreaBtn")
          .addEventListener("click", function () {
            currentStepIndex = 2;
            showStep("step2");
          });

        const sizeOptions = document.querySelectorAll(
          "#sizeOptions .option-btn",
        );
        sizeOptions.forEach((btn) => {
          btn.addEventListener("click", function () {
            sizeOptions.forEach((b) => b.classList.remove("selected"));
            this.classList.add("selected");
            size = this.dataset.value;
            document.getElementById("nextSizeBtn").disabled = false;
          });
        });
        document
          .getElementById("nextSizeBtn")
          .addEventListener("click", function () {
            currentStepIndex = 3;
            showStep("stepFinal");
            redirectToTrial();
          });

        const roleOptions = document.querySelectorAll(
          "#roleOptions .option-btn",
        );
        roleOptions.forEach((btn) => {
          btn.addEventListener("click", function () {
            roleOptions.forEach((b) => b.classList.remove("selected"));
            this.classList.add("selected");
            role = this.dataset.value;
            document.getElementById("nextRoleBtn").disabled = false;
          });
        });
        document
          .getElementById("nextRoleBtn")
          .addEventListener("click", function () {
            currentStepIndex = 2;
            showStep("stepFinal");
            redirectToTrial();
          });

        function redirectToTrial() {
          let baseUrl =
            "https://demo.sheria360.com/modules/central/start-trial";
          let params = [];
          if (userType === "legal") {
            params.push("type=legal");
            if (area) params.push("area=" + encodeURIComponent(area));
            if (size) params.push("size=" + encodeURIComponent(size));
          } else {
            params.push("type=non-legal");
            if (role) params.push("role=" + encodeURIComponent(role));
          }
          if (params.length > 0) baseUrl += "?" + params.join("&");
          setTimeout(function () {
            window.open(baseUrl, "_blank");
            closeModal();
          }, 1500);
        }
      })();