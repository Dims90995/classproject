enum Player {
    X = "X",
    O = "O",
  }
  
  class TicTacToe {
    private board: (Player | null)[];
    private currentPlayer: Player;
    private gameOver: boolean;
    private boardElement: HTMLElement;
    private messageElement: HTMLElement;
  
    constructor(boardElementId: string, messageElementId: string) {
      this.board = new Array(9).fill(null);
      this.currentPlayer = Player.X;
      this.gameOver = false;
  
      const boardEl = document.getElementById(boardElementId);
      const messageEl = document.getElementById(messageElementId);
      if (!boardEl || !messageEl) {
        throw new Error("Board or message element not found");
      }
      this.boardElement = boardEl;
      this.messageElement = messageEl;
      this.renderBoard();
      this.updateMessage(`Player ${this.currentPlayer}'s turn`);
    }
  
    private renderBoard(): void {
      // Clear the board and recreate each cell
      this.boardElement.innerHTML = "";
      this.board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index.toString();
        cellElement.textContent = cell ? cell : "";
        cellElement.addEventListener("click", () => this.handleCellClick(index));
        this.boardElement.appendChild(cellElement);
      });
    }
  
    private handleCellClick(index: number): void {
      if (this.gameOver || this.board[index] !== null) {
        return;
      }
      // Set the current player's move on the board
      this.board[index] = this.currentPlayer;
      this.renderBoard();
  
      // Check for a win or draw
      if (this.checkWin(this.currentPlayer)) {
        this.updateMessage(`Player ${this.currentPlayer} wins!`);
        this.gameOver = true;
        return;
      }
      if (this.board.every((cell) => cell !== null)) {
        this.updateMessage("It's a draw!");
        this.gameOver = true;
        return;
      }
  
      // Switch the player
      this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
      this.updateMessage(`Player ${this.currentPlayer}'s turn`);
    }
  
    private updateMessage(message: string): void {
      this.messageElement.textContent = message;
    }
  
    private checkWin(player: Player): boolean {
      const winningCombos: number[][] = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal from top-left
        [2, 4, 6], // diagonal from top-right
      ];
  
      return winningCombos.some((combo) =>
        combo.every((index) => this.board[index] === player)
      );
    }
  
    public reset(): void {
      this.board = new Array(9).fill(null);
      this.currentPlayer = Player.X;
      this.gameOver = false;
      this.renderBoard();
      this.updateMessage(`Player ${this.currentPlayer}'s turn`);
    }
  }
  
  // Initialize the game when the window loads
  window.addEventListener("load", () => {
    const game = new TicTacToe("board", "message");
  
    // Create and add a reset button to the document
    const resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.textContent = "Reset Game";
    resetButton.addEventListener("click", () => game.reset());
    document.body.appendChild(resetButton);
  });
  
  