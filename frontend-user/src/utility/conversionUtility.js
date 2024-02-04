const convertMinutesToReadable = (duration = 0) => {
    if (duration === 0) {
        return ``;
    }
    const hour = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    const hourString = hour > 1 ? `${hour} hours` : `${hour} hour`;
    const minutesString = minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;
    if (hour === 0) {
        return minutesString;
    } else if (minutes === 0) {
        return hourString;
    } else {
        return `${hourString} ${minutesString}`;
    }
};

export {
    convertMinutesToReadable
}
