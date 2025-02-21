import _ from 'lodash'

export const addSlashIfNeeded = (str) => _.endsWith(str, '/') ? str : str + '/'

export const typeAsDescription = (typeNumber) => {
    switch(typeNumber) {
        case 1:
            return "newbie"
        case 2:
            return "bishop"
        case 3:
            return "king"
        default:
            return "newbie"
    }
}

export const getYouTubeThumbnail = (url) => {
    // Regex melhorada para capturar o ID do vídeo corretamente em diferentes formatos de URL do YouTube
    const videoIdMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|shorts\/))([\w-]{11})/
    )

    if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1]
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
    return null // Retorna null se o link não for válido
}