import { FastAverageColor } from "fast-average-color"

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

export function getRandomColor() {
    //   var letters = '0123456789ABCDEF';
    //   var color = '#';
    //   for (var i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    //   }

    const colors = ['#0055cc', '#7f5f01', '#a54800', '#ae2e24', '#206a83', '#5e4db2', '#216e4e']
    const color = colors[getRandomIntInclusive(0, colors.length - 1)]
    return color;
}

export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function getRandomTimestamp() {
    const now = new Date();
    const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

    const randomTimestamp = twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime());

    return Math.floor(randomTimestamp);
}

export function getFormattedTime(time) {
    const date = new Date(time);
    const today = new Date();
    const currYear = today.getFullYear();
    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    return formatter.format(date);
}

export function getFormattedShortTime(time) {
    const date = new Date(time)
    const today = new Date()
    const currYear = today.getFullYear()
    const dateYear = date.getFullYear()

    const formatterWithoutYear = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
    })

    const formatterWithYear = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

    if (dateYear === currYear) {
        return formatterWithoutYear.format(date)
    } else {
        return formatterWithYear.format(date)
    }
}

// async function getAverageColor() {

//     const fac = new FastAverageColor()
//     fac.getColorAsync(document.querySelector('img'))
//         .then(color => {
//             return color
//         })
//         .catch(e => {
//             console.log(e)
//             throw (e)
//         })

// }