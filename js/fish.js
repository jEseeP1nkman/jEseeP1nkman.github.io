function addFish() {
    const container = document.createElement('div');
    container.classList.add('fish-container');
    document.body.appendChild(container);
  
    const fish = document.createElement('div');
    fish.classList.add('fish');
    container.appendChild(fish);
  }
  
  addFish();