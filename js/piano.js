import { happyBirthday, jingleBells, play } from './songs.js';

const keyboard = document.querySelector('.piano__keyboard');
const controls = document.querySelectorAll('.piano__control__option');
const playButton = document.querySelector('.piano__play-btn');
const tempoSelect = document.querySelector('.piano__tempo');
const songSelect = document.querySelector('.piano__song-list');
const pianoNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const keyboardMap = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Z',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Y',
  'X',
  'C',
  'V',
  'B',
  'N'
];
const keys = [];

const init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < pianoNotes.length; j++) {
      const key = createKey('white', j, i);
      keyboard.appendChild(key);

      if (j != 2 && j != 6) {
        const key = createKey('black', j, i);
        const emptySpace = document.createElement('div');
        emptySpace.className = 'empty-space';
        emptySpace.appendChild(key);
        keyboard.appendChild(emptySpace);
      }
    }
  }
};

const pressKey = (mouseEvent, event) => {
  const currentLetter = event.code.substring(event.code.length - 1);
  const isShiftPressed = event.shiftKey;
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${currentLetter}"]`;
  } else {
    selector = `[data-keyboard="${currentLetter}"]`;
  }
  const key = document.querySelector(selector);
  if (key !== null) {
    let mouse = new Event(mouseEvent);
    key.dispatchEvent(mouse);
  }
};

const playSound = key => {
  const audio = document.createElement('audio');
  audio.src = `sounds/${key.dataset.letterNoteFileName}.mp3`;
  audio.play().then(() => audio.remove());
};

let createKey = (type, noteIndex, octave) => {
  const key = document.createElement('button');
  const note = pianoNotes[noteIndex];
  key.className = `piano__key piano__key--${type}`;
  key.dataset.keyboard = `${type == 'black' ? '⇧+' : ''}${
    keyboardMap[noteIndex + (octave - 1) * 7]
  }`;
  key.dataset.letterNote =
    type == 'white' ? note + octave : note + '#' + octave;
  key.dataset.letterNoteFileName =
    type == 'white' ? note + octave : note + 's' + octave;
  key.textContent = key.dataset.letterNote;
  keys.push(key);

  key.addEventListener('mousedown', () => {
    playSound(key);
    key.classList.add('piano__key--playing');
  });

  key.addEventListener('mouseup', () => {
    key.classList.remove('piano__key--playing');
  });

  key.addEventListener('mouseup', () => {
    key.classList.remove('piano__key--playing');
  });

  return key;
};

document.addEventListener('keydown', event => {
  if (event.repeat) {
    return;
  }
  pressKey('mousedown', event);
});

document.addEventListener('keyup', event => {
  pressKey('mouseup', event);
});

controls.forEach(input => {
  input.addEventListener('input', () => {
    const value = input.value;
    let type;
    switch (value) {
      case 'letterNotes':
        type = 'letterNote';
        break;
      case 'keyboard':
        type = 'keyboard';
        break;
      case 'none':
        type = 'none';
        break;
    }
    keys.forEach(key => {
      key.textContent = key.dataset[type];
    });
  });
});

playButton.addEventListener('mousedown', () => {
  const songChoice = +songSelect.value;
  const tempo = +tempoSelect.value;
  playButton.disabled = true;
  const enablePlayButton = () => (playButton.disabled = false);
  switch (songChoice) {
    case 1:
      play(jingleBells, tempo, enablePlayButton);
      break;
    case 2:
      play(happyBirthday, tempo, enablePlayButton);
      break;
  }
});

init();
