gsap.registerPlugin(ScrollTrigger);


let tl = gsap.timeline({

    scrollTrigger: {
        trigger: '.trigger_1',
        start: "top 60%",
        end: "top 30%",
        toggleActions: "play none none reverse",
        
        
      },
  })
  
  let tl2 = gsap.timeline({
       scrollTrigger: {
        trigger: '.hero',
        start: "top 60%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
        
        
      },
  })
  let tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: '.clip',
        start: "top 90%",
        end: "bottom 90%",
        toggleActions: "play none none reverse",
        
        
        
        
      },
  })
   
    
    let tl4 = gsap.timeline({
        scrollTrigger: {
            trigger: '.promotion',
            start: "top 90%",
            end: "bottom 100%",
            toggleActions: "play none none reverse",
            
            
            
          },
    })

    tl.fromTo('.trigger_1', { opacity: '0%', x: -100}, {opacity: '100%', x : 0, duration: 0.6,});
    tl2.fromTo('.hero', { opacity: 0, scale:0.10}, {opacity: 1, scale:1, duration: 0.5,});
    tl3.fromTo('.clip', {opacity: 0, scale:0.10}, {opacity: 1, scale:1, duration: 0.5,});
    tl4.fromTo('.promotion', {opacity: '0%', scale:0.10}, {opacity: '100%', scale:1});

    ScrollTrigger.create({
      onUpdate: ({progress, direction, isActive}) => {
        console.log(isActive);
        if (direction == 1) {
          document.querySelector('.animation').classList.add('scroll-down');
          document.querySelector('.animation').classList.remove('idle');
          document.querySelector('.animation').classList.remove('scroll-up');
        } if (direction == -1 ) {
          document.querySelector('.animation').classList.add('scroll-up');
          document.querySelector('.animation').classList.remove('scroll-down');
          document.querySelector('.animation').classList.remove('idle');
        } 
        let isScrolling;
        const animation = document.querySelector('.animation');

window.addEventListener('scroll', function() {
	window.clearTimeout( isScrolling );
  
	isScrolling = setTimeout(function() {
    animation.classList.remove("scroll-up", "scroll-down");
    animation.classList.add("idle");
	}, 250);
});
          
        
      }

    });

    let divParoles = document.querySelector('.paroles');
    let chargement = document.querySelector('.chargement');
    let formSubmit = document.querySelector('.formSubmit');
    let formInputText = document.querySelector('.formInputText')
    
    
    chargement.style.display = 'none';
    
    formSubmit.addEventListener("click", function(e) {
        e.preventDefault();
        chargement.style.display = 'block';
        if(formInputText.value != ""){
            fetch(`https://api.lyrics.ovh/v1/silent planet/${formInputText.value}`)
                .then(parolesChanson => parolesChanson.json()) 
                .then(dataParoles => { 
                    let paroles = newLineToBr(dataParoles.lyrics);
                    chargement.style.display = 'none';
                    divParoles.innerHTML = `<br><h2> Paroles de: ${formInputText.value} </h2><br> ${paroles}`;
                    console.log(fetch(`https://api.lyrics.ovh/v1/silent planet/${formInputText.value}`));
                })
            .catch(error => {
              chargement.style.display = 'none';
            divParoles.innerHTML = `Désolé, les paroles n'ont pu être trouvées. En voici la raison: ${error}`;
            });
        }
    })
    
    const newLineToBr = function(str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }
    