export function convertMinutesToHours(minutesAmount: number){
    const hours = Math.floor(minutesAmount / 60); //pega o primeiro número da divisão das horas 
    const minutes = minutesAmount % 60;

    // Adiciona zeros na frente da hora e dos minutos caso tenha apenas um único número
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
