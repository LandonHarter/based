export function getNewsSite(url: string) {
    const hostname = new URL(url).hostname.split('.')[1];

    switch (hostname) {
        case 'cnn':
            return 'CNN';
        case 'foxnews':
            return 'Fox News';
        case 'bbc':
            return 'BBC';
        case 'npr':
            return 'NPR';
        case 'nbcnews':
            return 'NBC News';
        case 'washingtonpost':
            return 'Washington Post';
        default:
            return 'Unknown';
    }
}