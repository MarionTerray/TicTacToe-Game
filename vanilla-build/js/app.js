import View from './view.js';
import Store from './store.js';


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
    const store = new Store('live-t3-storage-key', players);

    function initView() {
      view.closeAll();
      view.clearMoves();
      view.setTurnIndicator(store.game.currentPlayer);
      view.updateScoreboard(
        store.stats.playerWithStats[0].wins,
        store.stats.playerWithStats[1].wins,
        store.stats.ties,
        );
    view.initializeMoves(store.game.moves);
    }

    window.addEventListener('storage', () => {
      console.log('State change from another tab');
      initView()
    });

    initView();

    view.bindGameResetEvent((event) => {
        store.reset();
        initView();
    });

    view.bindNewRoundEvent((event) => {
        store.newRound();
        initView();
    });

    view.bindPlayerMoveEvent((square) => {

        const existingMove = store.game.moves.find(
          (move) => move.squareId === +square.id
          )

        if (existingMove) {
          return
        }

        //place an icon of the current player 
        view.handlePlayerMove(square, store.game.currentPlayer);

        //advance to the next state by pushing a move to the moves array
        store.playerMove(+square.id);

        if (store.game.status.isComplete) {
          view.opendModal(store.game.status.winner 
          ? `${store.game.status.winner.name} wins !`
          : `Tie !`
          );

          return;
        }

        //set the next player's turn indicator
        view.setTurnIndicator(store.game.currentPlayer);
    });

}

window.addEventListener("load", init);
