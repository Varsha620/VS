    document.addEventListener('DOMContentLoaded', () => {
      // Setup canvas
      const canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle="#e1525f";
      const dotSize = 5; // Diameter of each dot
      const spacing = 20; // Spacing between dots
      const maxDistance = 150; // Distance at which dots are affected by the cursor
      const dots = []; // Array to store dot positions and offsets

      // Generate grid of dots
      const generateDots = () => {
        const rows = Math.ceil(canvas.height / spacing);
        const cols = Math.ceil(canvas.width / spacing);
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            dots.push({ x: x * spacing, y: y * spacing, offsetX: 0, offsetY: 0 });
          }
        }
      };

      // Draw all dots on canvas
      const drawDots = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        dots.forEach(dot => {
          ctx.beginPath();
          ctx.arc(dot.x + dot.offsetX, dot.y + dot.offsetY, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        });
      };

      // Update dot positions based on mouse movement
      const updateDots = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        dots.forEach(dot => {
          const dx = dot.x - mouseX;
          const dy = dot.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const angle = Math.atan2(dy, dx);
            const moveDistance = (maxDistance - distance) / 10;

            dot.offsetX = Math.cos(angle) * moveDistance;
            dot.offsetY = Math.sin(angle) * moveDistance;
          } else {
            dot.offsetX = 0;
            dot.offsetY = 0;
          }
        });

        drawDots();
      };

      // Throttle mousemove events for better performance
      const throttle = (func, limit) => {
        let lastCall = 0;
        return function(...args) {
          const now = Date.now();
          if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
          }
        };
      };

      // Initialize
      generateDots();
      drawDots();
      document.addEventListener('mousemove', throttle(updateDots, 16)); // 16ms ~ 60 FPS

      // Adjust canvas on window resize
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        dots.length = 0; // Clear dots array
        generateDots(); // Regenerate grid
        drawDots(); // Redraw dots
      });
    })

    
//Skill
    document.addEventListener('DOMContentLoaded', () => {
      const circles = document.querySelectorAll('.progress-circle');
      
      circles.forEach(circle => {
        const percent = circle.getAttribute('data-percent'); // Get percentage
        const progress = percent; // Use percentage directly as progress
        circle.querySelector('.circle').style.setProperty('--progress', progress);
      });
    });
    


//Back to top button
let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

