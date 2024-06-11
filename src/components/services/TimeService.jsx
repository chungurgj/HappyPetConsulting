export const fixMinutes = (minutes) =>{
    return minutes === 0 ? '00' : minutes < 10 ? `0${minutes}` : minutes
    }

export const fixHours = (hours) =>{
    return hours < 10 ? `0${hours}` : hours
}

export const combineHoursAndMin = (hours,minutes) =>{
    return `${fixHours(hours)}:${fixMinutes(minutes)}`
}
export const combinePreciseTime = (hours,minutes,seconds) =>{
    return `${fixHours(hours)}:${fixMinutes(minutes)}:${fixMinutes(seconds)}`
}
export const combineDate = (mydate) =>{
    const date = new Date(mydate)
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()

    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`
} 

export const combineDateAndTime = (mydate) =>{
    const date = new Date(mydate)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${combineDate(mydate)} ${combineHoursAndMin(hours,minutes)}`
}

export const calculatePastTime = (mydate) => {
    const date = new Date(mydate);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return combinePreciseTime(hours,minutes,seconds)
};
