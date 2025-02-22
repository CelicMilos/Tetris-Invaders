console.log("Hello");
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let kvadrati = grid.querySelectorAll("div");
  const width = 12;
  const height = 20;
  let trenutnaPozicija = Math.floor(Math.random() * (width - 2));
  upucaniBlokovi = [];
  //console.log(trenutnaPozicija)

  //Tetrominosi

  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];
  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  //Random biranje Tetrominosa

  const Tetrominosi = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let random = Math.floor(Math.random() * Tetrominosi.length);
  let currentRotation = Math.floor(Math.random() * 4);
  let trenutniTetromino = Tetrominosi[random][currentRotation];
  //console.log(trenutnoStanje)

  //oblikovanje Tetraminosa
  function Oblikovanje() {
    trenutniTetromino.forEach((index) => {
      // Proveravamo da li se blok nalazi u upucanim blokovima
      if (!upucaniBlokovi.includes(trenutnaPozicija + index)) {
        kvadrati[trenutnaPozicija + index].classList.add("blok");
      }
    });
  }

  //  function Oblikovanje(){
  //      for(i=0;i<trenutniTetromino.length;i++){
  //          if(!upucaniBlokovi.includes(i)){

  //              kvadrati[trenutnaPozicija + index].classList.add('blok')
  //          }
  //         }
  //  }

  // function Oblikovanje(){
  //     trenutniTetromino.forEach(index => (
  //         kvadrati[trenutnaPozicija + index].classList.add('blok')
  //         ))
  //     }

  //brisanje Tetrominosa

  function Brisanje() {
    trenutniTetromino.forEach((index) =>
      kvadrati[trenutnaPozicija + index].classList.remove("blok")
    );
    upucaniBlokovi = [];
    // console.log(trenutniTetromino )
  }

  //Pomeranje Tetromnisa na dole
  let timerId = setInterval(naDole, 250);

  function naDole() {
    //Brisanje()
    trenutniTetromino.forEach((index) =>
      kvadrati[trenutnaPozicija + index].classList.remove("blok")
    );
    trenutnaPozicija = trenutnaPozicija += width;
    trenutniTetromino.forEach((index) =>
      kvadrati[trenutnaPozicija + index].classList.add("blok")
    );

    if (trenutnaPozicija + Tetrominosi[random].length - 1 > 192) {
      clearInterval(timerId);
      Brisanje();
      trenutnaPozicija = Math.floor(Math.random() * (width - 2));
      random = Math.floor(Math.random() * Tetrominosi.length);
      trenutniTetromino = Tetrominosi[random][currentRotation];
      timerId = setInterval(naDole, 250);
    }
  }

  //Svemirski Brod
  let svemirskiBrodIndex = 209;

  const svemirskiBrod = [1, width, width + 1, width + 2];
  function crtanjeBroda() {
    svemirskiBrod.forEach((index) =>
      kvadrati[svemirskiBrodIndex + index].classList.add("brod")
    );
  }
  crtanjeBroda();
  function brisanjeBroda() {
    svemirskiBrod.forEach((index) =>
      kvadrati[svemirskiBrodIndex + index].classList.remove("brod")
    );
  }
  function Desno() {
    if (svemirskiBrodIndex <= 213) {
      brisanjeBroda();
      svemirskiBrodIndex += 1;
      crtanjeBroda();
    }
  }
  function Levo() {
    if (svemirskiBrodIndex >= 203) {
      brisanjeBroda();
      svemirskiBrodIndex -= 1;
      crtanjeBroda();
    }
    // if(svemirskiBrodIndex==203){
    //     svemirskiBrod=[ width, width+1, width+2]
    // }
  }

  function levoDesno(e) {
    switch (e.keyCode) {
      case 37:
        Levo();
        break;
      // console.log(svemirskiBrodIndex)
      case 39:
        Desno();
        //console.log(svemirskiBrodIndex)
        break;
    }
  }

  document.addEventListener("keydown", levoDesno);

  //Pucanje
  function Pucanje(e) {
    let metakId;
    let metakIndex = svemirskiBrodIndex + 1;
    function kretanjeMetka() {
      kvadrati[metakIndex].classList.remove("metak");
      metakIndex -= width;
      kvadrati[metakIndex].classList.add("metak");

      if (kvadrati[metakIndex].classList.contains("blok")) {
        kvadrati[metakIndex].classList.remove("blok");
        kvadrati[metakIndex].classList.remove("metak");
        //Brisanje()
        clearInterval(metakId);
        let upucaniBlok =
          trenutnaPozicija +
          trenutniTetromino.indexOf(metakIndex - trenutnaPozicija);
        if (upucaniBlok !== -1) {
          upucaniBlokovi.push(metakIndex); // Sačuvaj apsolutnu poziciju pogođenog bloka
          trenutniTetromino.splice(
            trenutniTetromino.indexOf(metakIndex - trenutnaPozicija),
            1
          );
        }
      }
      // console.log(upucaniBlokovi)
      //  console.log(upucaniBlok)

      if (metakIndex < width + 1) {
        kvadrati[metakIndex].classList.remove("metak");
        clearInterval(metakId);
      }
    }
    switch (e.keyCode) {
      case 32:
        metakId = setInterval(kretanjeMetka, 100);
        break;
    }
    // document.addEventListener('keyup',e =>{
    //     if(e.keyCode ===32){
    //         metakId=setInterval(kretanjeMetka,100)
    //     }
    // })
  }

  document.addEventListener("keydown", Pucanje);
});
