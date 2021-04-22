'use strict';

let praveHraje = 'circle';

const fieldButton = document.querySelector('.policko');

const game = (event) => {
  if (praveHraje === 'circle') {
    event.target.classList.add('board__field--circle'); // přidej třídu
    event.target.disabled = true; // zakaž tlačítko
    document.querySelector('.hrac').src = 'obrazky2/cross.svg'; //zmen obrázek na třídě hráč
    praveHraje = 'cross'; //hraje druhý hráč
  } else if (praveHraje === 'cross') {
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
    document.querySelector('.hrac').src = 'obrazky2/circle.svg';
    praveHraje = 'circle';
  }

  //-------------------------------- UKOL 5 ---------------------------------//

  if (isWinningMove(event.target)) {
    //Pokud vrátí is Winning true, zobraz alert s hláškou, který hráč vyhrál.
    const vyhra = confirm(
      `Výhra patří${
        getSymbol(event.target) === 'circle' ? ' kolečku' : ' křížku'
      }`,
    );
    if (vyhra === true) {
      return window.location.reload(); //aktualizace stránky
    }
  }
};

const field = document.querySelectorAll('.policko'); //vyber tlacitko do promenne field
for (let i = 0; i < field.length; i++) {
  field[i].addEventListener('click', game); // na kliknuti zavolej funkci game
}

// i = getPosition(field) pro dané políčko vrátí objekt s číslem řádku a sloupce

const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.policko');

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

// ii = (row, column) pro číslo řádku a sloupce vrátí příslušný prvek
const getField = (row, column) => fields[row * boardSize + column];

// iii = getSymbol(field) políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined.

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

//  4i =  isWinningMove(field) se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci za sebou 5. Pak vrátí true / false.

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni doprava
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
