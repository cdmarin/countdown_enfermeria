/**
 * CONFIGURACIÓN POR DEFECTO
 * =========================
 * Puedes modificar esta variable a mano para establecer la fecha y hora de finalización
 * por defecto en formato ISO: YYYY-MM-DDTHH:MM:SS
 * El inicio de la guardia se calculará automáticamente 24 horas antes.
 */
const DEFAULT_END   = "2026-07-20T08:00:00";


// Elementos del DOM
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const progressPercentEl = document.getElementById('progress-percent');
const progressTextEl = document.getElementById('progress-text');
const progressBarEl = document.getElementById('progress-bar');
const progressHeartEl = document.getElementById('progress-heart');

const motivationalMessageEl = document.getElementById('motivational-message');
const messageEmojiEl = document.getElementById('message-emoji');

const displayStartEl = document.getElementById('display-start');
const displayEndEl = document.getElementById('display-end');

const settingsToggleBtn = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const btnSave = document.getElementById('btn-save');
const btnReset = document.getElementById('btn-reset');
const btnClose = document.getElementById('btn-close');

const inputEnd = document.getElementById('input-end');

// Variables de estado
let startTime, endTime;
let intervalId = null;

/**
 * Inicializa las fechas según la prioridad:
 * 1. Parámetros URL (?end=...)
 * 2. LocalStorage (guardados desde el panel)
 * 3. Valores por defecto hardcodeados
 * El inicio de la guardia siempre se calcula como 24h antes del fin de la misma.
 */
function initDates() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlEnd = urlParams.get('end');
    const storageEnd = localStorage.getItem('guardia_end');

    if (urlEnd) {
        endTime = new Date(urlEnd);
    } else if (storageEnd) {
        endTime = new Date(storageEnd);
    } else {
        endTime = new Date(DEFAULT_END);
    }

    // Si la fecha no es válida por algún motivo, reestablecer al default
    if (isNaN(endTime.getTime())) {
        endTime = new Date(DEFAULT_END);
    }

    // Calcular el inicio automáticamente 24 horas antes
    startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

    // Rellenar valores en el panel de configuración
    inputEnd.value = formatDateToInput(endTime);

    // Actualizar visualización en el footer
    displayStartEl.textContent = formatDisplayDate(startTime);
    displayEndEl.textContent = formatDisplayDate(endTime);
}

/**
 * Formatea un objeto Date para usarlo en un input de tipo datetime-local (YYYY-MM-DDTHH:MM)
 */
function formatDateToInput(date) {
    const tzOffset = date.getTimezoneOffset() * 60000; // offset en ms
    const localISOTime = (new Date(date - tzOffset)).toISOString().slice(0, 16);
    return localISOTime;
}

/**
 * Formatea un objeto Date para mostrarlo en pantalla (DD/MM HH:MM)
 */
function formatDisplayDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
}

/**
 * Lógica principal del contador y la barra de progreso
 */
function updateCountdown() {
    const now = new Date();
    
    // Si la guardia no ha empezado aún
    if (now < startTime) {
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        
        progressBarEl.style.width = "0%";
        progressHeartEl.style.left = "0%";
        progressPercentEl.textContent = "0% Completado";
        progressTextEl.textContent = "Guardia futura";
        
        messageEmojiEl.textContent = "⏱️";
        motivationalMessageEl.textContent = `¡Falta poco! Tu guardia comienza el ${formatDisplayDate(startTime)}.`;
        return;
    }

    // Si la guardia ya ha terminado
    if (now >= endTime) {
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        
        progressBarEl.style.width = "100%";
        progressHeartEl.style.left = "100%";
        progressPercentEl.textContent = "100% Completado";
        progressTextEl.textContent = "Guardia finalizada";
        
        messageEmojiEl.textContent = "🎉";
        motivationalMessageEl.textContent = "¡GUARDIA TERMINADA! A descansar, te lo has súper ganado. 😴✨🛏️";
        
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        return;
    }

    // Guardia en progreso
    const totalDuration = endTime - startTime;
    const elapsed = now - startTime;
    const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);

    // Calcular tiempo restante
    const timeLeft = endTime - now;
    const totalSecondsLeft = Math.floor(timeLeft / 1000);
    
    const hours = Math.floor(totalSecondsLeft / 3600);
    const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
    const seconds = totalSecondsLeft % 60;

    // Actualizar números en pantalla
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');

    // Actualizar barra de progreso y el corazón flotante
    progressBarEl.style.width = `${progressPercent}%`;
    progressHeartEl.style.left = `${progressPercent}%`;
    progressPercentEl.textContent = `${progressPercent.toFixed(1)}% Completado`;
    progressTextEl.textContent = "Guardia activa";

    // Actualizar mensajes motivacionales y emojis según progreso
    let message = "";
    let emoji = "🩺";

    if (progressPercent < 15) {
        message = "¡Guardia iniciada! Mucha fuerza para estas primeras horas. 💪🏥";
        emoji = "🩺";
    } else if (progressPercent < 40) {
        message = "Poco a poco se avanza. ¡Estás haciendo un trabajo increíble! ✨❤️";
        emoji = "🩹";
    } else if (progressPercent < 60) {
        message = "¡Mitad de guardia superada! Hora de un café y a por el resto. ☕🍕";
        emoji = "☕";
    } else if (progressPercent < 80) {
        message = "El turno avanza rápido. ¡Ya queda menos de la mitad! ¡Ánimo! 🌅🎒";
        emoji = "💊";
    } else if (progressPercent < 95) {
        message = "¡Entrando en la recta final! Se siente el calor de casita muy cerca. 🏠💖";
        emoji = "🧸";
    } else {
        message = "¡Últimos minutos! No queda absolutamente nada. ¡Prepárate para salir corriendo! 🛌💤";
        emoji = "🏃‍♀️";
    }

    motivationalMessageEl.textContent = message;
    messageEmojiEl.textContent = emoji;
}

// Iniciar contador
function startApp() {
    initDates();
    updateCountdown();
    
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(updateCountdown, 1000);
}

// Gestión del panel de configuración (Modal)
settingsToggleBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('hidden');
});

btnClose.addEventListener('click', () => {
    settingsPanel.classList.add('hidden');
});

btnSave.addEventListener('click', () => {
    const newEnd = new Date(inputEnd.value);

    if (isNaN(newEnd.getTime())) {
        alert("Por favor, introduce una fecha y hora de finalización válida.");
        return;
    }

    // Guardar en local storage
    localStorage.setItem('guardia_end', newEnd.toISOString());

    settingsPanel.classList.add('hidden');
    
    // Limpiar query params de la URL si los hubiera para priorizar el guardado local
    if (window.location.search) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    startApp();
});

btnReset.addEventListener('click', () => {
    if (confirm("¿Quieres restablecer la fecha a los valores por defecto del código?")) {
        localStorage.removeItem('guardia_end');
        settingsPanel.classList.add('hidden');
        
        // Limpiar URL params
        if (window.location.search) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        startApp();
    }
});

// Arrancar la aplicación al cargar
window.addEventListener('DOMContentLoaded', startApp);
