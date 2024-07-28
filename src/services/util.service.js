import axios from "axios"
import { FastAverageColor } from "fast-average-color"

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || process.env.VITE_UNSPLASH_ACCESS_KEY

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
    const now = new Date()
    const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate())

    const randomTimestamp = twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime());

    return Math.floor(randomTimestamp)
}

export function getFormattedTime(time) {
    if (!time) return
    const date = new Date(time)
    const today = new Date()
    const currYear = today.getFullYear()
    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    })

    return formatter.format(date)
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

function parseColor(color) {
    if (/^#/.test(color)) {
        return hexToRgb(color)
    }
    if (/^rgb/.test(color)) {
        return rgbStringToRgb(color)
    }
    return colorNameToRgb(color)
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '')
    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    return { r, g, b }
}

function rgbStringToRgb(rgb) {
    const result = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/)
    return {
        r: parseInt(result[1]),
        g: parseInt(result[2]),
        b: parseInt(result[3])
    }
}

function colorNameToRgb(color) {
    let dummy = document.createElement("div")
    dummy.style.color = color
    document.body.appendChild(dummy)
    let rgb = window.getComputedStyle(dummy).color
    document.body.removeChild(dummy)
    return rgbStringToRgb(rgb)
}

function getLuminance({ r, g, b }) {
    r = r / 255
    g = g / 255
    b = b / 255
    if (r <= 0.03928) r = r / 12.92
    else r = Math.pow((r + 0.055) / 1.055, 2.4)
    if (g <= 0.03928) g = g / 12.92
    else g = Math.pow((g + 0.055) / 1.055, 2.4)
    if (b <= 0.03928) b = b / 12.92
    else b = Math.pow((b + 0.055) / 1.055, 2.4)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function isLightColor(color) {
    if (!color) return false
    const rgb = parseColor(color)
    const luminance = getLuminance(rgb)
    const threshold = 0.179
    return luminance > threshold
}

export async function getAverageColorFromAttachment(attachment) {

    if (attachment.type.slice(0, 5) !== 'image') return 'transparent'
    try {
        const img = new Image()
        img.crossOrigin = "Anonymous"
        img.src = attachment.url
        await new Promise((resolve) => {
            img.onload = resolve
        })

        const fac = new FastAverageColor()
        const color = await fac.getColorAsync(img)
        return color.hexa
    } catch (er) {
        console.log(er)
        throw (er)
    }
}

export async function getAverageColorFromUrl(styleObject) {
    if (!styleObject || !styleObject.background) {
        console.log('Invalid style object or missing background property');
        return 'transparent';
    }

    const urlMatch = styleObject.background.match(/url\(["']?(.+?)["']?\)/);
    if (!urlMatch) {
        console.log('No URL found in background property');
        return 'transparent';
    }

    const imageUrl = urlMatch[1];

    try {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;

        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        const fac = new FastAverageColor();
        const color = await fac.getColorAsync(img);
        return color.hexa;
    } catch (er) {
        console.log('Error getting average color:', er);
        return 'transparent'; // Return a default color instead of throwing
    }
}

export async function onDownloadUrl(url, filename) {
    if (!url) {
        console.error('Missing URL')
        return
    }

    // Function to get file name from URL if filename is not provided
    const getFileNameFromUrl = (url) => {
        const parts = url.split('/')
        return parts[parts.length - 1]
    }

    try {
        // Start the download
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const blob = await response.blob()

        // Create a temporary URL for the blob
        const blobUrl = window.URL.createObjectURL(blob)

        // Create a temporary anchor element and trigger the download
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = blobUrl
        a.download = filename || getFileNameFromUrl(url)
        document.body.appendChild(a)
        a.click()

        // Clean up
        window.URL.revokeObjectURL(blobUrl)
        document.body.removeChild(a)
    } catch (error) {
        console.error('Error downloading the file:', error)
        // Here you might want to show an error message to the user
    }
}

const imageCache = {}

function saveToLocalCache(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function getFromLocalCache(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

export async function getUnsplashImages(query = 'random', count = 1) {
    const cacheKey = 'all_images'

    let allImages = getFromLocalCache(cacheKey)
    if (allImages) {
        return allImages
    }

    if (Object.keys(imageCache).length > 0) {
        return Object.values(imageCache)
    }

    try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                query,
                count,
                orientation: 'landscape',
                w: 4000,
                client_id: UNSPLASH_ACCESS_KEY
            }
        })

        const images = response.data.map(image => ({
            id: image.id,
            title: image.description || image.alt_description || 'Untitled',
            url: image.urls.raw,
            smallUrl: image.urls.small,
            thumbnailUrl: image.urls.thumb,
            description: image.description || image.alt_description,
            type: 'image'
        })
        )

        for (let i = 0; i < images.length; i++) {
            images[i].backgroundColor = await getAverageColorFromAttachment(images[i])
            // FOR DEV
            if (i >= 6) break
        }

        saveToLocalCache(cacheKey, images)
        images.forEach(image => {
            imageCache[image.id] = image
        })

        return images
    } catch (error) {
        console.error('Error fetching images from Unsplash:', error)
        return []
    }
}

export async function getUnsplashImageById(imageId) {
    const cacheKey = 'all_images'

    let allImages = getFromLocalCache(cacheKey)
    if (allImages) {
        const image = allImages.find(img => img.id === imageId)
        if (image) {
            return image
        }
    }

    if (imageCache[imageId]) {
        return imageCache[imageId]
    }

    try {
        const response = await axios.get(`https://api.unsplash.com/photos/${imageId}`, {
            params: {
                client_id: UNSPLASH_ACCESS_KEY
            }
        })

        const image = {
            id: response.data.id,
            url: response.data.urls.regular,
            title: image.description || image.alt_description || 'Untitled',
            smallUrl: response.data.urls.small,
            thumbnailUrl: response.data.urls.thumb,
            description: response.data.description || response.data.alt_description
        }

        allImages = getFromLocalCache(cacheKey) || []
        allImages.push(image)
        saveToLocalCache(cacheKey, allImages)
        imageCache[image.id] = image

        return image
    } catch (error) {
        console.error('Error fetching image by ID from Unsplash:', error)
        return null
    }
}

export function clearUnsplashCache() {
    localStorage.removeItem('all_images')
    Object.keys(imageCache).forEach(key => delete imageCache[key])
    console.log('Unsplash image cache cleared')
}


export async function getBackgroundImages() {
    const cacheKey = 'all_images'
    let images = getFromLocalCache(cacheKey)
    if (!images) {
        images = await getUnsplashImages('nature', 40)
        saveToLocalCache(cacheKey, images)
    }
    return images
}