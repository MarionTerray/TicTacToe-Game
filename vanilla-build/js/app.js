import View from './view.js';
import Store from './store.js';

//const App = {
    //All of our selected HTML elements
 //   $: {
  //     menu: document.querySelector('[data-id="menu"]'),
  //     menuItems: document.querySelector(".items"),
  //     resetBtn: document.querySelector('[data-id="reset-btn"]'),
  //     newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
  //     squares: document.querySelectorAll('[data-id="square"]'),
  //     modal: document.querySelector('[data-id="modal"]'),
  //     modalText: document.querySelector('[data-id="modal-text"]'),
  //     modalBtn: document.querySelector('[data-id="modal-btn"]'),
  //     turn: document.querySelector('[data-id="turn"]'),
  // },

  // state: {
  //     moves: [],
  // },

  // getGameStatus(moves) {

  //     const p1Moves = moves.filter(move => move.playerId === 1).map(move => +move.squareId)
  //     const p2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId)

  //     const winningPatterns = [
  //         [1, 2, 3],
  //         [1, 5, 9],
  //         [1, 4, 7],
  //         [2, 5, 8],
  //         [3, 5, 7],
  //         [3, 6, 9],
  //         [4, 5, 6],
  //         [7, 8, 9],
  //     ];

  //     let winner = null

  //     winningPatterns.forEach(pattern => {
  //          const p1wins = pattern.every(value => p1Moves.includes(value))
  //          const p2wins = pattern.every(value => p2Moves.includes(value))
//
  //          if (p1wins) winner = 1
  //          if (p2wins) winner = 2
//
  //      })
//
  //      return {
  //          status :  moves.length === 9 || winner != null ? 'complete' : 'in-progress',    //in-progress | complet
  //          winner    // 1 | 2  | null
  //      }
  //  },
//
  //  init() {
  //      App.registerEventListener()
  //  },
//
  //  registerEventListener() {
  //      App.$.menu.addEventListener("click", (event) => {
  //          App.$.menuItems.classList.toggle("hidden");
  //      });
//
  //      App.$.resetBtn.addEventListener('click', event => {
  //          console.log('Reset the game');
  //      });
//
  //      App.$.newRoundBtn.addEventListener('click', event => {
  //          console.log('Add a new round');
  //      });
//
  //      App.$.modalBtn.addEventListener('click', event => {
  //          App.state.moves = [];
  //          App.$.squares.forEach((square) => square.replaceChildren());
  //          App.$.modal.classList.add('hidden');
  //      });
//
//       //Event Listener of players moves
//       App.$.squares.forEach((square) => {
//           square.addEventListener('click', (event) => {
//               console.log(`Square with id ${event.target.id} was clicked`);
//               console.log(`Current player is ${App.state.currentPlayer} `);
//
//               // Check if there is already a play, if so, return early
//               const hasMove = (squareId) => {
//                   const existingMove = App.state.moves.find(
//                       (move) => move.squareId === squareId
//                       );
//                   return existingMove !== undefined
//               };
//
//                if(hasMove(+square.id)) {
//                   return;
//               };
//
//               //Determine which player icon to add to the square
//               const lastMove = App.state.moves.at(-1);
//               const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
//               const currentPlayer = 
//                   App.state.moves.length === 0 
//                   ? 1 
//                   : getOppositePlayer(lastMove.playerId);
//
//               const nextPlayer = getOppositePlayer(currentPlayer);    
//
 //               const squareIcon = document.createElement('i');
 //               const turnIcon = document.createElement('i');
 //               const turnLabel = document.createElement('p');
 //               turnLabel.innerText = `Player ${nextPlayer}, you are up !`;
 //               
//
 //               if (currentPlayer === 1) {
 //                   squareIcon.classList.add('fa-solid', 'fa-x', 'yellow');
 //                   turnIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
 //                   turnLabel.classList = 'turquoise';
 //               } else {
 //                   squareIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
 //                   turnIcon.classList.add('fa-solid', 'fa-x', 'yellow');
 //                   turnLabel.classList = 'yellow';
 //               }
//
 //               App.$.turn.replaceChildren(turnIcon, turnLabel);
//
 //               App.state.moves.push({
 //                   squareId: +square.id,
 //                   playerId: currentPlayer
 //               })
//
 //               App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;
//
 //               square.replaceChildren(squareIcon);
//
 //               //Check if there is a winner or a tie game
 //               const game = App.getGameStatus(App.state.moves)
//
//
 //               if (game.status === 'complete') {
 //                   App.$.modal.classList.remove('hidden');
//
 //                   let message = ''
 //                   if (game.winner) {
 //                       message = `Player ${game.winner} wins !`
 //                   } else {
 //                       message = 'Tie game !'
 //                   }
//
 //                   App.$.modalText.textContent = message
 //               }
 //               
 //           });
 //       });
 //   }
  //  };

const players = [
    {
        id: 1,
        name: "Player 1",
        iconClass: "fa-x",
        colorClass: "turquoise",
    },
    {
        id: 2,
        name: "Player 2",
        iconClass: "fa-o",
        colorClass: "yellow",
    },
];

function init() {
    const view = new View();
    const store = new Store(players);

    console.log(store.game)

    view.bindGameResetEvent(event => {
        console.log('reset event')
        console.log(event)
    });

    view.bindNewRoundEvent(event => {
        console.log('new round')
        console.log(event)
    });

    view.bindPlayerMoveEvent(event => {
        const clickedSquare = event.target;

        view.handlePlayerMove(clickedSquare, store.game.currentPlayer);

        store.playerMove(+clickedSquare.id);

        view.setTurnIndicator(store.game.currentPlayer);
    });

}

window.addEventListener("load", init);
