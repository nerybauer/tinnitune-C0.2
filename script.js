// Inicializa a variável do contexto de áudio fora do evento de clique para ter um escopo mais amplo
let audioContext;
let oscillator;

document.addEventListener('DOMContentLoaded', function() {
    // Obter referências para os elementos da página
    const frequencySlider = document.getElementById('frequencySlider');
    const playSoundButton = document.getElementById('playSound');
    const setFrequencyButton = document.getElementById('setFrequency');

    // Evento de alteração do slider de frequência
    frequencySlider.addEventListener('input', function() {
        if (audioContext && oscillator) {
            // Atualiza a frequência do oscillator em tempo real
            oscillator.frequency.setValueAtTime(this.value, audioContext.currentTime);
        }
    });

    // Evento de clique para tocar o som
    playSoundButton.addEventListener('click', function() {
        // Inicializa o contexto de áudio após a interação do usuário
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Retoma o contexto de áudio se necessário
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // Chama a função para tocar o som
        playSound(frequencySlider.value);
    });

    // Evento de clique para definir a frequência
    setFrequencyButton.addEventListener('click', function() {
        setFrequencyAndOpenNewPage(frequencySlider.value);
    });
});

function playSound(frequency) {
    // Para o oscillator se ele já estiver tocando
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
    }
    
    // Cria um novo oscillator
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
}

function setFrequencyAndOpenNewPage(frequency) {
    // Para o som e desconecta o oscillator
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
    }
    
    // Armazena a frequência escolhida
    localStorage.setItem('selectedFrequency', frequency);
    
    // Redireciona para a segunda página
    window.location.href = 'second_page.html';
}
