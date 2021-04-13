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
  if (isWinningMove(event.target)) {
    //Pokud vrátí is Winning true, zobraz alert s hláškou, který hráč vyhrál.
    const vyhra = confirm(
      `Výhra patří${getSymbol(event.target) === 'circle' ? ' kolečku' : ' křížku'
      }`,
    );
    if (vyhra === true) {
      return window.location.reload(); //aktualizace stránky
    }
  }
};

const field = document.querySelectorAll('.policko'); //vyber tlacitko do promenne field
for (let i = 0; i < field.length; i++) {
  //cyklus
  field[i].addEventListener('click', game); // na kliknuti zavolej funkci game
}



