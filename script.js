const game = {
    turn: 'green',
    canRoll: true,
    prankSeq: [6, 6, 1, 6], //
    prankIdx: 0,

    roll: function(color) {
        if (!this.canRoll || this.turn !== color) return;
        this.canRoll = false;
        const diceEl = document.getElementById(`dice-${color}`);
        diceEl.innerText = "...";

        setTimeout(() => {
            let result;
            // हरियोको लागि विशेष नियम
            if (this.turn === 'green' && this.prankIdx < this.prankSeq.length) {
                result = this.prankSeq[this.prankIdx];
                this.prankIdx++;
            } else {
                result = Math.floor(Math.random() * 6) + 1;
            }

            diceEl.innerText = result;

            // ६ वा १ (पोर) आउँदा फेरि पालो
            if (result === 6 || result === 1) {
                this.canRoll = true;
            } else {
                setTimeout(() => this.changeTurn(), 1000);
            }
        }, 600);
    },

    changeTurn: function() {
        const p = ['green', 'red', 'blue', 'yellow'];
        document.getElementById(`dice-${this.turn}`).classList.remove('active');
        document.getElementById(`dice-${this.turn}`).innerText = "?";
        
        this.turn = p[(p.indexOf(this.turn) + 1) % 4];
        this.prankIdx = 0; // अर्को पालोमा सुरुबाट प्र्याङ्क

        const nextDice = document.getElementById(`dice-${this.turn}`);
        nextDice.classList.add('active');
        document.getElementById('player-name').innerText = this.turn.toUpperCase();
        document.getElementById('player-name').style.color = `var(--${this.turn})`;
        this.canRoll = true;
    }
};

// बोर्डको ग्रिड बनाउने
const board = document.getElementById('ludo-board');
for (let i = 0; i < 225; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    board.appendChild(cell);
}

