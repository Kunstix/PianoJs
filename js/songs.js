export const happyBirthday = `G4,G4,A4,,G4,,C5,,B4,,,,
                       G4,G4,A4,,G4,,D5,,C5,,,,,
                       G4,G4,G5,,E5,,C5,,B4,,A4,,
                       F5,F5,E5,,C5,,D5,,C5`;
export const jingleBells = `B3,,B3,,B3,,,,B3,,B3,,B3,,,,
                       B3,,D4,,G3,,A3,B3,,,,,,
                       C4,,C4,,C4,,,,C4,C4,,B3,,B3,,,,
                       B3,B3,B3,,A3,,A3,,B3,,A3,,,,D4`;

export const play = (song, tempo, cb) => {
  const notes = song.replaceAll(/\s/g, '').split(',');
  const mousedown = new Event('mousedown');
  const mouseup = new Event('mouseup');
  let currentNote = 0;
  let button;
  const interval = setInterval(() => {
    if (currentNote < notes.length) {
      if (notes[currentNote].trim() !== '') {
        if (button) {
          button.dispatchEvent(mouseup);
        }
        button = document.querySelector(
          `[data-letter-note="${notes[currentNote]}"]`
        );
        button.dispatchEvent(mousedown);
      }
      currentNote++;
    } else {
      button.dispatchEvent(mouseup);
      clearInterval(interval);
      cb();
    }
  }, 300 / tempo);
};
