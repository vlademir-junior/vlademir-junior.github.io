// Função para gerar uma cor aleatória em formato hexadecimal
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Função para criar um elemento de cor
const createColorDiv = (color) => {
  const colorDiv = document.createElement('div');
  colorDiv.classList.add('color');
  colorDiv.style.backgroundColor = color;
  colorDiv.style.border = '1px solid black';

  if (color === '#000000') {
    colorDiv.classList.add('selected');
  }

  return colorDiv;
};

// Função para atualizar a paleta de cores
const updateColorPalette = (colorPalette) => {
  const colors = ['#000000', ...Array.from({ length: 3 }, generateRandomColor)];
  colorPalette.innerHTML = '';

  const blackDiv = createColorDiv('#000000');
  colorPalette.appendChild(blackDiv);

  colors
    .filter((color) => color !== '#000000')
    .map(createColorDiv)
    .forEach((colorDiv) => colorPalette.appendChild(colorDiv));

  blackDiv.classList.add('selected');

  localStorage.setItem('colorPalette', JSON.stringify(colors));
};

// Função para criar a paleta de cores
const createColorPalette = (colors) => {
  const colorPalette = document.createElement('div');
  colorPalette.id = 'color-palette';

  colors.forEach((color) => {
    const colorDiv = createColorDiv(color);
    colorPalette.appendChild(colorDiv);
  });

  return colorPalette;
};

// Função para inserir um elemento após o título
const insertElementAfterTitle = (element) => {
  const title = document.getElementById('title');
  title.insertAdjacentElement('afterend', element);
};

// Função para criar o quadro de pixels
const createPixelBoard = () => {
  const pixelBoard = document.createElement('div');
  pixelBoard.id = 'pixel-board';

  Array.from({ length: 25 }).forEach((_, index) => {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.classList.add(`pixel-${index}`);
    pixel.style.backgroundColor = 'white';
    pixelBoard.appendChild(pixel);
  });

  return pixelBoard;
};

// Função para inserir o quadro de pixels após a paleta de cores
const insertPixelBoardAfterColorPalette = (pixelBoard) => {
  const colorPalette = document.getElementById('color-palette');
  colorPalette.insertAdjacentElement('afterend', pixelBoard);
};

// Função para criar o botão "Limpar"
const createClearButton = () => {
  const clearButton = document.createElement('button');
  clearButton.id = 'clear-board';
  clearButton.textContent = 'Limpar';
  clearButton.classList.add('clear-button');

  clearButton.addEventListener('click', clearPixelBoard);

  return clearButton;
};

// Função para inserir o botão "Limpar" antes do quadro de pixels
const insertClearButton = (clearButton) => {
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.insertAdjacentElement('beforebegin', clearButton);
};

// Função para limpar o quadro de pixels
const clearPixelBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  });
  savePixels();
};


// Função para selecionar uma cor da paleta
const selectColor = () => {
  const colorPalette = document.getElementById('color-palette');
  colorPalette.addEventListener('click', (event) => {
    if (event.target.classList.contains('color')) {
      const selectedColor = event.target.style.backgroundColor;
      const pixels = document.querySelectorAll('.pixel');
      pixels.forEach((pixel) => {
        pixel.removeEventListener('click', paintPixel);
        pixel.addEventListener('click', () => {
          pixel.style.backgroundColor = selectedColor;
          savePixels();
        });
      });
      colorPalette.querySelectorAll('.color').forEach((div) => {
        div.classList.remove('selected');
      });
      event.target.classList.add('selected');
      savePixels();
    }
  });
};
// Função para pintar um pixel com a cor selecionada
const paintPixel = (pixel) => {
  const selectedColorDiv = document.querySelector('.color.selected');
  const selectedColor = selectedColorDiv.style.backgroundColor;
  pixel.style.backgroundColor = selectedColor;
  savePixels(); // Salva os pixels pintados no localStorage
};

// Função para carregar as cores dos pixels nas posições corretas ao recarregar a página
const loadPixels = () => {
  const savedPixels = localStorage.getItem('pixelBoard');
  if (savedPixels) {
    const parsedPixels = JSON.parse(savedPixels);
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel, index) => {
      pixel.style.backgroundColor = parsedPixels[index];
    });
  }
};

// Função para preencher o quadro de pixels com a cor selecionada
const fillPixelWithSelectedColor = () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.addEventListener('click', () => {
      const selectedColorDiv = document.querySelector('.color.selected');
      const selectedColor = selectedColorDiv.style.backgroundColor;
      pixel.style.backgroundColor = selectedColor;
      savePixels();
    });
  });
};


// Função para salvar os pixels pintados no localStorage
const savePixels = () => {
  const pixels = document.querySelectorAll('.pixel');
  const paintedPixels = Array.from(pixels).map((pixel) => pixel.style.backgroundColor);
  localStorage.setItem('pixelBoard', JSON.stringify(paintedPixels));
};

// Função principal para criar todas as paletas de cores e o quadro de pixels
const createPalettes = () => {
  const storedPalette = localStorage.getItem('colorPalette');
  const initialColors = storedPalette ? JSON.parse(storedPalette) : ['#000000', ...Array.from({ length: 3 }, generateRandomColor)];

  const colorPalette = createColorPalette(initialColors);
  insertElementAfterTitle(colorPalette);

  const randomColorButton = document.createElement('button');
  randomColorButton.id = 'button-random-color';
  randomColorButton.textContent = 'Cores aleatórias';
  randomColorButton.addEventListener('click', () => {
    updateColorPalette(colorPalette);
  });
  insertElementAfterTitle(randomColorButton);

  const pixelBoard = createPixelBoard();
  insertPixelBoardAfterColorPalette(pixelBoard);

  const clearButton = createClearButton();
  insertClearButton(clearButton);

  selectColor();
  fillPixelWithSelectedColor();
  loadPixels(); // Carrega as cores dos pixels ao recarregar a página
};

// Chama a função para criar todas as paletas de cores e o quadro de pixels
createPalettes();
