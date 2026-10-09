document.addEventListener("DOMContentLoaded", function() {
        // 1. Typewriter Effect
        const words = ["Law Firms", "In-House Counsel", "HR Teams", "Procurement", "Every Legal Team"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typewriterElement = document.getElementById("typewriter-text");
        
        function typeEffect() {
          if(!typewriterElement) return;
          const currentWord = words[wordIndex];
          
          if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
          } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
          }
          
          let typeSpeed = isDeleting ? 50 : 100;
          
          if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
          }
          
          setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typewriter after a short delay
        setTimeout(typeEffect, 1000);

        // 2. Number Counter Animation
        const counters = document.querySelectorAll('.counter');
        const speed = 40; // The lower the slower

        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            // Calculate increment step
            const inc = target / speed;
            
            if (count < target) {
              // Use Math.ceil for whole numbers, toFixed for decimals
              if(target % 1 === 0) {
                  counter.innerText = Math.ceil(count + inc);
              } else {
                  counter.innerText = (count + inc).toFixed(1);
              }
              setTimeout(updateCount, 40);
            } else {
              counter.innerText = target;
            }
          };
          
          updateCount();
        });
      });