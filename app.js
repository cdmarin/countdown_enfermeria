/**
 * CONFIGURACIÓN POR DEFECTO
 * =========================
 * Puedes modificar esta variable a mano para establecer la fecha y hora de finalización
 * por defecto en formato ISO: YYYY-MM-DDTHH:MM:SS
 * El inicio de la guardia se calculará automáticamente 24 horas antes.
 */
const DEFAULT_END   = "2026-07-20T08:00:00";

// Banco de frases motivacionales de enfermería (15 opciones por cada rango de 4 horas y fin de guardia)
const PHRASES = [
    // Bloque 1: Horas 0 a 4 (Inicio de la Guardia)
    [
        { text: "¡Empezamos con energía! Tu sonrisa cura más que cualquier medicina. 🩺✨", emoji: "🩺" },
        { text: "Guardia iniciada. Pacientes listos, bolis listos... ¡y tú lista para brillar! 💪🏥", emoji: "🏥" },
        { text: "Café en mano y estetoscopio al cuello. ¡A por ello, mi enfermera favorita! ☕❤️", emoji: "☕" },
        { text: "Que esta guardia sea tranquila, rápida y llena de cafés calentitos. 🍀☕", emoji: "🍀" },
        { text: "¡A por las primeras horas! El hospital tiene suerte de tenerte hoy al mando. 🏨✨", emoji: "🏨" },
        { text: "Energía al 100% y lista para cuidar. ¡Eres increíble! 💪🌟", emoji: "💪" },
        { text: "¡Primeros timbres bajo control! Esto no es nada para una superheroína como tú. 🩺🏃‍♀️", emoji: "🩺" },
        { text: "Que tu turno sea tan leve y brillante como tu propia sonrisa. ✨😊", emoji: "✨" },
        { text: "Empieza el viaje de 24 horas. ¡Mucha fuerza en este arranque! 🚀🏥", emoji: "🚀" },
        { text: "Acuérdate de respirar hondo y tomar agua desde el principio. 💧❤️", emoji: "💧" },
        { text: "¡Estetoscopio listo y corazón contento! Que tengas un inicio excelente. ❤️🩺", emoji: "❤️" },
        { text: "El primer café de la guardia sabe a superación. ¡Tú puedes con todo! ☕💪", emoji: "☕" },
        { text: "¡A por el día con fuerza! La mejor enfermera ya está en su puesto. 🩺🥇", emoji: "🩺" },
        { text: "Con tu empatía y tu profesionalidad, esta guardia será pan comido. 🍞🏥", emoji: "🍞" },
        { text: "Que el turno empiece suave y siga igual de bonito. ¡Mucho ánimo, mi amor! 💕✨", emoji: "💕" }
    ],
    // Bloque 2: Horas 4 a 8 (Mañana/Tarde - Avance)
    [
        { text: "El ritmo no para, pero tú eres más fuerte. ¡Lo estás haciendo increíble! 🩹", emoji: "🩹" },
        { text: "Un pinchazo por aquí, una cura por allá... ¡Tu dedicación es de otro planeta! 🪐✨", emoji: "🪐" },
        { text: "El turno avanza y tú sigues con esa paciencia de oro. ¡Sigue así! 💕", emoji: "❤️" },
        { text: "Paso a paso, ya te has adaptado al ritmo. ¡La mejor enfermera del mundo! 🩺🥇", emoji: "🥇" },
        { text: "Ánimo con los ingresos y las curas. ¡Tú puedes con todo lo que te echen! 💪❤️", emoji: "💪" },
        { text: "El primer cuarto ya es historia. ¡Sigue así, campeona! 📈🏃‍♀️", emoji: "📈" },
        { text: "Tu simpatía es el mejor analgésico para tus pacientes. 😊💊", emoji: "😊" },
        { text: "Haciendo fácil lo difícil, como siempre. ¡Qué gran enfermera eres! 🩺🌟", emoji: "🩺" },
        { text: "Las horas van pasando y tú sigues brillando en los pasillos. ✨🏥", emoji: "✨" },
        { text: "¡Ya llevas unas cuantas horas salvando el día! Muy orgulloso de ti. ❤️🏆", emoji: "❤️" },
        { text: "No hay vena que se te resista ni cura que no dejes perfecta. 🩹💉", emoji: "🩹" },
        { text: "¡Un pasito más dado! Tu esfuerzo de hoy vale oro. 🥇✨", emoji: "🥇" },
        { text: "El turno sigue su curso, pero con tu actitud todo es más fácil. 😎🏥", emoji: "😎" },
        { text: "Recuerda que cada hora que pasa es una hora menos para volver a casa. 🏠❤️", emoji: "🏠" },
        { text: "Sigue repartiendo esa magia que tienes para cuidar a los demás. 🩺🪄", emoji: "🪄" }
    ],
    // Bloque 3: Horas 8 a 12 (Tarde - Ecuador)
    [
        { text: "¡Mitad del camino superada! Momento de respirar, estirar las piernas y comer algo. 🍕🥤", emoji: "🍕" },
        { text: "Tu empatía marca la diferencia hoy para mucha gente. ¡Orgulloso de ti! 😊❤️", emoji: "😊" },
        { text: "Ya hemos cruzado la mitad del turno. ¡Recarga pilas que el final está más cerca! ⚡", emoji: "⚡" },
        { text: "¡Llegamos al ecuador de la guardia! Un pasito más y cuesta abajo. 🏔️👣", emoji: "🏔️" },
        { text: "Respira hondo, hidrátate y descansa cuando puedas. ¡Te lo estás ganando! 💧🍏", emoji: "💧" },
        { text: "¡Cerca de la mitad! Aprovecha para picar algo y recuperar fuerzas. 🍎🍫", emoji: "🍎" },
        { text: "El tiempo vuela cuando haces lo que amas. ¡Mucho ánimo con esta tarde! ✈️❤️", emoji: "✈️" },
        { text: "Has superado un montón de retos hoy. ¡Eres una máquina de cuidar! 🩺🤖", emoji: "🩺" },
        { text: "A mitad de guardia, te mando un abrazo enorme para darte energía. 🤗⚡", emoji: "🤗" },
        { text: "¡El ecuador del turno ya está a la vista! Mantén esa energía tan bonita. 🌟💪", emoji: "🌟" },
        { text: "Tus pacientes agradecen cada segundo de tu dedicación. ¡Vales muchísimo! 💕🏥", emoji: "💕" },
        { text: "Un café rápido para celebrar que ya va quedando menos. ☕🍰", emoji: "☕" },
        { text: "Mitad hecha, mitad por delante. ¡Tú puedes con la segunda parte sin despeinarte! 💁‍♀️🩺", emoji: "💁‍♀️" },
        { text: "¡La cima de la guardia ya ha sido conquistada! Ahora toca bajar. ⛰️🚶‍♀️", emoji: "⛰️" },
        { text: "Que la energía no decaiga en esta tarde de hospital. ¡Ánimo, bonita! 💪🏥", emoji: "💪" }
    ],
    // Bloque 4: Horas 12 a 16 (Tarde/Noche)
    [
        { text: "El sol se oculta pero tu brillo sigue encendido. ¡Mucho ánimo con la noche! 🌙🩺", emoji: "🌙" },
        { text: "Ya queda menos de la mitad. Prepárate un café calentito de mi parte. ☕🖤", emoji: "☕" },
        { text: "El hospital entra en modo nocturno (¡crucemos dedos!) y tú sigues al pie del cañón. 💪✨", emoji: "💪" },
        { text: "Comienza el turno de noche. ¡Que los timbres respeten tus descansos! 🔔🤫", emoji: "🔔" },
        { text: "Las luces bajan, pero tu vocación sigue iluminando los pasillos. 🕯️🩺", emoji: "🕯️" },
        { text: "Pasada la mitad del turno, entramos en las horas más tranquilas. ¡A por ellas! 🌌✨", emoji: "🌌" },
        { text: "El cansancio se nota, pero tu dedicación nunca baja. ¡Qué profesional! 🩺💼", emoji: "🩺" },
        { text: "Que la noche te sea leve, pacífica y sin apenas incidencias. 🍀🌙", emoji: "🍀" },
        { text: "Una ronda más y ya quedará menos para cerrar el día. 🚶‍♀️📝", emoji: "🚶‍♀️" },
        { text: "Tu fuerza en el turno nocturno es admirable. ¡Mucho ánimo, valiente! 💪🌌", emoji: "💪" },
        { text: "La luna te acompaña en tus rondas nocturnas. 🌙🏥", emoji: "🌙" },
        { text: "Que los pacientes duerman plácidamente y te dejen descansar un ratito. 🛌  ", emoji: "🛌" },
        { text: "¡Entrando en el terreno de la noche! Que fluya el café en vena. ☕💉", emoji: "☕" },
        { text: "Ya has superado más del 60% de la guardia. ¡El final se empieza a ver! 👀✨", emoji: "👀" },
        { text: "¡Mucho ánimo con el cambio de turno y la noche! Te mando mi amor. ❤️🌙", emoji: "❤️" }
    ],
    // Bloque 5: Horas 16 a 20 (Madrugada)
    [
        { text: "Las horas más duras de la madrugada están aquí. ¡Tú puedes con esto y más! 🌌💪", emoji: "🌌" },
        { text: "Si el sueño aprieta, cierra los ojos y piensa en lo cómoda que estará tu cama. 🛌  ", emoji: "🛌" },
        { text: "Falta muy poco para ver amanecer. ¡Eres una campeona incansable! 🌅🧸", emoji: "🌅" },
        { text: "La noche avanza y el amanecer está a la vuelta de la esquina. ¡Fuerza! 🩺🌙", emoji: "🩺" },
        { text: "Mantén la guardia alta en estas horas tranquilas. ¡Ya casi se ve la luz del día! 🌟🏥", emoji: "🌟" },
        { text: "El silencio de la madrugada te acompaña. ¡Falta muy poco para acabar! 🤫✨", emoji: "🤫" },
        { text: "¡Las horas críticas ya pasaron! Solo queda mantener el rumbo. 🧭💪", emoji: "🧭" },
        { text: "Piensa en el desayuno calentito que te espera al salir. 🥐🥛", emoji: "🥐" },
        { text: "Tu resistencia es legendaria. ¡Orgulloso de mi enfermera todoterreno! 🦸‍♀️❤️", emoji: "🦸‍♀️" },
        { text: "Que el sueño no te gane la batalla. ¡Tú eres más fuerte! ☕👁️", emoji: "☕" },
        { text: "El hospital duerme y tú velando por todos. ¡Qué bonita es tu labor! 💕🏥", emoji: "💕" },
        { text: "Faltan pocas horas para el relevo. ¡Ya casi rozamos el final! 🤏✨", emoji: "🤏" },
        { text: "Un último esfuerzo en esta madrugada. ¡Estás muy cerca! 💪🌌", emoji: "💪" },
        { text: "Que esta madrugada sea lo más tranquila posible para que puedas descansar algo. 🛌🤫", emoji: "🛌" },
        { text: "Las estrellas brillan y tú en el control de enfermería dando lo mejor. ✨🩺", emoji: "✨" }
    ],
    // Bloque 6: Horas 20 a 24 (Último Tirón)
    [
        { text: "¡Recta final! Ya se huele el café del desayuno y el final de la guardia. 🥐☕", emoji: "🥐" },
        { text: "¡Últimas horas! Ve preparando el relevo y lista para salir volando a casa. 🏃‍♀️🏠", emoji: "🏃‍♀️" },
        { text: "¡La línea de meta está ahí mismo! Qué orgullo de enfermera tengo. ❤️🏁", emoji: "❤️" },
        { text: "El último empujón. Deja los informes listos y prepárate para descansar. 📝🛌", emoji: "📝" },
        { text: "¡Despierta el nuevo día y tú has sobrevivido a las 24h! Ya casi estás fuera. 🌅🏥", emoji: "🌅" },
        { text: "Últimos cartuchos de energía. ¡Lo tienes en tus manos! 🔋💪", emoji: "🔋" },
        { text: "¡La luz del sol ya está aquí y la guardia casi terminada! ☀️🏥", emoji: "☀️" },
        { text: "Apunta las últimas constantes y prepárate para desconectar el chip. 📝🩺", emoji: "📝" },
        { text: "¡Qué ganas de darte un abrazo gigante al salir! Ya no queda nada. 🤗❤️", emoji: "🤗" },
        { text: "Las 24h casi completadas. ¡Toda una gesta heroica! 🏆✨", emoji: "🏆" },
        { text: "Ve guardando el bolígrafo de cuatro colores, ¡la libertad te espera! 🖊️🏃‍♀️", emoji: "🖊️" },
        { text: "Tu cama está llamándote y el despertador ya se apaga. 🛌😴", emoji: "🛌" },
        { text: "El último esfuerzo del turno de mañana. ¡Casi en casita! 🏠💖", emoji: "🏠" },
        { text: "¡Última hora! Pasa el relevo con alegría y a descansar. 👋🏥", emoji: "👋" },
        { text: "¡Se acabó el turno! Enhorabuena por otra guardia superada como una campeona. 🏆🎉🛌", emoji: "🏆" }
    ],
    // Bloque 7: Guardia Terminada (Hora 24+)
    [
        { text: "¡MISIÓN CUMPLIDA! 24 horas salvando vidas. Ahora, directo a la cama a hibernar. 💤🛌🎉", emoji: "🎉" },
        { text: "¡Guardia terminada! Apaga el busca, olvida el hospital y vuela a descansar. 🏠😴✨", emoji: "🏠" },
        { text: "¡Eres una super heroína! Has completado las 24h. Tu cama te espera con ansias. 🛌💤💖", emoji: "🛌" },
        { text: "Fin del turno. Ahora toca dormir todo el día y recuperar energías. ¡Te lo has ganado! 💤🍕", emoji: "💤" },
        { text: "¡Se acabó! A descansar, a desconectar y a disfrutar del merecido descanso. 🛌🎈💤", emoji: "🎈" },
        { text: "¡Guardia superada con éxito! Eres increíble, ahora a soñar con los angelitos. 😴👼", emoji: "😴" },
        { text: "Desconexión total activada. Prohibido pensar en hospitales por hoy. ❌🏥", emoji: "❌" },
        { text: "Duerme todo lo que necesites, te mereces el descanso del siglo. 🛌😴🏆", emoji: "🛌" },
        { text: "¡A dormir a pierna suelta! Qué bien te has ganado este descanso. 🛌💤✨", emoji: "🛌" },
        { text: "Misión 24 horas: Completada. Modo hibernación: Activado. 🛌❄️", emoji: "🛌" },
        { text: "Ducha caliente, ropa cómoda, cama suave y a dormir. El plan perfecto. 🚿🛌", emoji: "🚿" },
        { text: "¡Libertad! Gracias por cuidar de todos, ahora te toca descansar a ti. ❤️🛌", emoji: "❤️" },
        { text: "El hospital queda atrás. ¡Por fin a casita a desconectar! 🏠💤", emoji: "🏠" },
        { text: "Tu cama y yo te estábamos esperando. ¡A descansar, preciosa! 🛌💖", emoji: "🛌" },
        { text: "¡Se acabó el turno! Enhorabuena por otra guardia superada como una campeona. 🏆🎉🛌", emoji: "🏆" }
    ]
];


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
let lastRangeIndex = -1;
let currentPhraseIndex = 0;

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

    // Resetear el control de frases para que seleccione una nueva al reconfigurar
    lastRangeIndex = -1;
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
        
        const finishedIndex = 6;
        if (lastRangeIndex !== finishedIndex) {
            lastRangeIndex = finishedIndex;
            currentPhraseIndex = Math.floor(Math.random() * PHRASES[finishedIndex].length);
        }
        
        const phraseObj = PHRASES[finishedIndex][currentPhraseIndex];
        messageEmojiEl.textContent = phraseObj.emoji;
        motivationalMessageEl.textContent = phraseObj.text;
        
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

    // Determinar el rango de la guardia (6 bloques de 4 horas en un turno de 24h)
    let rangeIndex = 0;
    if (progressPercent < 16.67) rangeIndex = 0;
    else if (progressPercent < 33.33) rangeIndex = 1;
    else if (progressPercent < 50.0) rangeIndex = 2;
    else if (progressPercent < 66.67) rangeIndex = 3;
    else if (progressPercent < 83.33) rangeIndex = 4;
    else rangeIndex = 5;

    // Si cambia de rango de hora, elegimos otra frase aleatoria de ese rango
    if (rangeIndex !== lastRangeIndex) {
        lastRangeIndex = rangeIndex;
        currentPhraseIndex = Math.floor(Math.random() * PHRASES[rangeIndex].length);
    }

    const phraseObj = PHRASES[rangeIndex][currentPhraseIndex];
    motivationalMessageEl.textContent = phraseObj.text;
    messageEmojiEl.textContent = phraseObj.emoji;
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
