const App = {
    //All of our selected HTML elements
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector(".items"),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        squares: document.querySelectorAll('[data-id="square"]'),
    },

    state: {
        moves: [],
    },

    init() {
        App.registerEventListener()
    },

    registerEventListener() {
        App.$.menu.addEventListener("click", (event) => {
            App.$.menuItems.classList.toggle("hidden");
        });

        App.$.resetBtn.addEventListener('click', event => {
            console.log('Reset the game');
        });

        App.$.newRoundBtn.addEventListener('click', event => {
            console.log('Add a new round');
        });

        App.$.squares.forEach((square) => {
            square.addEventListener('click', (event) => {
                console.log(`Square with id ${event.target.id} was clicked`);
                console.log(`Current player is ${App.state.currentPlayer} `);

                // Check if there is already a play, if so, return early
                const hasMove = (squareId) => {
                    const existingMove = App.state.moves.find(
                        (move) => move.squareId === squareId
                        );
                    return existingMove !== undefined
                };

                 if(hasMove(+square.id)) {
                    return;
                };

                //Determine which player icon to add to the square
                const lastMove = App.state.moves.at(-1);
                const getOppositePlayer = (playerId) => playerId === 1 ? 2 : 1;
                const currentPlayer = 
                    App.state.moves.length === 0 
                    ? 1 
                    : getOppositePlayer(lastMove.playerId);

                const icon = document.createElement('i');

                if (currentPlayer === 1) {
                    icon.classList.add('fa-solid', 'fa-x', 'yellow')
                } else {
                    icon.classList.add('fa-solid', 'fa-o', 'turquoise')
                }

                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer
                })

                App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

                console.log(App.state);

                square.replaceChildren(icon);

                //Check if there is a winner or a tie game
                const winningPatterns = [
                    [1, 2, 3],
                    [1, 5, 9],
                    [1, 4, 7],
                    [2, 5, 8],
                    [3, 5, 7],
                    [3, 6, 9],
                    [4, 5, 6],
                    [7, 8, 9],
                ];
            });
        });
    }
};

window.addEventListener("load", App.init);

