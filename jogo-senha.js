document.addEventListener('DOMContentLoaded', function() {
    // Gerar um número secreto de 4 dígitos sem repetições
    let secretNumber = generateSecretNumber();
    let attempts = 0;
    const maxAttempts = 10;
    
    // Elementos do DOM
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const guessesList = document.getElementById('guessesList');
    const attemptsCount = document.getElementById('attemptsCount');
    const revealButton = document.getElementById('revealButton');
    
    // Event listeners
    guessButton.addEventListener('click', handleGuess);
    guessInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleGuess();
        }
    });
    revealButton.addEventListener('click', revealSecret);
    
    // Função para gerar número secreto
    function generateSecretNumber() {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let number = '';
        
        // Embaralhar array
        for (let i = digits.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [digits[i], digits[j]] = [digits[j], digits[i]];
        }
        
        // Pegar os 4 primeiros dígitos
        for (let i = 0; i < 4; i++) {
            number += digits[i];
        }
        
        return number;
    }
    
    // Função para validar o palpite
    function validateGuess(guess) {
        // Verificar se tem 4 dígitos
        if (guess.length !== 4) {
            alert('Por favor, digite um número de 4 dígitos.');
            return false;
        }
        
        // Verificar se são apenas números
        if (!/^\d+$/.test(guess)) {
            alert('Por favor, digite apenas números.');
            return false;
        }
        
        // Verificar dígitos repetidos
        const uniqueDigits = new Set(guess.split(''));
        if (uniqueDigits.size !== 4) {
            alert('O número não pode ter dígitos repetidos.');
            return false;
        }
        
        return true;
    }
    
    // Função para calcular touros e vacas
    function calculateBullsAndCows(guess) {
        let bulls = 0;
        let cows = 0;
        
        for (let i = 0; i < 4; i++) {
            if (guess[i] === secretNumber[i]) {
                bulls++;
            } else if (secretNumber.includes(guess[i])) {
                cows++;
            }
        }
        
        return { bulls, cows };
    }
    
    // Função para lidar com o palpite
    function handleGuess() {
        const guess = guessInput.value.trim();
        
        if (!validateGuess(guess)) {
            return;
        }
        
        attempts++;
        const { bulls, cows } = calculateBullsAndCows(guess);
        
        // Adicionar à lista de palpites
        addGuessToList(guess, bulls, cows);
        
        // Atualizar contador de tentativas
        attemptsCount.textContent = `Tentativas: ${attempts}`;
        
        // Limpar input
        guessInput.value = '';
        
        // Verificar vitória
        if (bulls === 4) {
            setTimeout(() => {
                alert(`Parabéns! Você acertou em ${attempts} tentativas!`);
                resetGame();
            }, 100);
            return;
        }
        
        // Verificar derrota
        if (attempts >= maxAttempts) {
            setTimeout(() => {
                alert(`Game over! O número era ${secretNumber}.`);
                resetGame();
            }, 100);
        }
    }
    
    // Função para adicionar palpite à lista
    function addGuessToList(guess, bulls, cows) {
        const guessItem = document.createElement('li');
        guessItem.className = 'guess-item';
        
        const guessNumber = document.createElement('span');
        guessNumber.className = 'guess-number';
        guessNumber.textContent = guess;
        
        const guessResult = document.createElement('span');
        guessResult.className = 'guess-result';
        guessResult.innerHTML = `<span class="bull">${bulls} Touro(s)</span>, <span class="cow">${cows} Vaca(s)</span>`;
        
        guessItem.appendChild(guessNumber);
        guessItem.appendChild(guessResult);
        
        // Adicionar no início da lista para manter as tentativas mais recentes no topo
        guessesList.insertBefore(guessItem, guessesList.firstChild);
    }
    
    // Função para revelar o número secreto
    function revealSecret() {
        alert(`O número secreto é: ${secretNumber}`);
    }
    
    // Função para resetar o jogo
    function resetGame() {
        secretNumber = generateSecretNumber();
        attempts = 0;
        guessesList.innerHTML = '';
        attemptsCount.textContent = 'Tentativas: 0';
    }
});