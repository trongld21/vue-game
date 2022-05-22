new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startNewGame: function() {
            this.gameIsRunning = true
            this.playerHealth = 100,
                this.monsterHealth = 100,
                this.turns = []
        },
        attack: function() {
            if (this.checkPlayerOptions()) {
                return;
            }
            var damagePlayer = this.inputDame(4, 10);
            this.monsterHealth -= damagePlayer;
            this.turns.unshift({
                isPlayer: true,
                textLog: 'Player hits Monster for ' + damagePlayer
            })
            this.monsterAttack(5, 12);

        },
        specialAttack: function() {
            if (this.checkPlayerOptions()) {
                return;
            }

            var damagePlayer = this.inputDame(10, 20);
            this.monsterHealth -= damagePlayer;
            this.turns.unshift({
                isPlayer: true,
                textLog: 'Player hits Monster for ' + damagePlayer
            })
            this.monsterAttack(10, 20);
        },
        heal: function() {
            if (this.playerHealth > 70) {
                return;
            } else if (this.playerHealth <= 60) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 70;
            }
            this.turns.unshift({
                isPlayer: true,
                textLog: 'Player heals for 10'
            })
            this.monsterAttack(5, 12);
        },
        giveUp: function() {
            this.gameIsRunning = false;
            this.turns = []
            this.playerHealth = 100;
            this.monsterHealth = 100;
            alert('You lost!')
        },
        monsterAttack: function(minDame, maxDame) {
            var damageMonster = this.inputDame(minDame, maxDame);
            this.playerHealth -= damageMonster;
            this.turns.unshift({
                isPlayer: false,
                textLog: 'Monster hits Player for ' + damageMonster
            })
        },
        inputDame: function(minDame, maxDame) {
            return Math.max(Math.floor(Math.random() * maxDame) + 1, minDame);
        },
        checkPlayerOptions: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startNewGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startNewGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true
            }
            return;
        },

    }
})