import { JSDOM } from "jsdom";

export async function GET(req: Request) {
    const headers = req.headers;
    const source = headers.get('source');
    if (!source) {
        return new Response('No source provided', { status: 400 });
    } else if (!validUrl(source)) {
        return new Response('Invalid URL', { status: 400 });
    }

    const request = await fetch(source);
    const html = await request.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const website = new URL(source).hostname.split('.')[1];
    let content: string | null = null;

    switch (website) {
        case 'cnn':
            content = cnn(document);
            break;
        case 'foxnews':
            content = fox(document);
            break;
        case 'bbc':
            content = bbc(document);
            break;
        case 'npr':
            content = npr(document);
            break;
        case 'nbcnews':
            content = nbc(document);
            break;
        case 'washingtonpost':
            content = washingtonpost(document);
            break;
        case 'cbsnews':
            content = cbs(document);
            break;
        default:
            return new Response('Unsupported website', { status: 400 });
    }

    if (!content) {
        return new Response('Unable to scrape content', { status: 404 });
    }
    return new Response(content);
}

function validUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function cnn(document: Document) {
    const paragraphs = document.querySelectorAll('.paragraph');
    const content = Array.from(paragraphs).map(p => p.textContent).join('\n');
    return content;
}

function fox(document: Document) {
    const article = document.querySelector('.article-body');
    if (!article) return null;
    const paragraphs = article.querySelectorAll('p');
    const content = Array.from(paragraphs).map(p => p.textContent).join('\n');
    return content;
}

function bbc(document: Document) {
    const paragraphs = document.querySelectorAll('p');
    const content = Array.from(paragraphs).map(p => p.textContent).join('\n');
    return content;
}

function npr(document: Document) {
    const paragraphs = document.querySelectorAll('.storytext p');
    const content = Array.from(paragraphs).map(p => p.textContent).join('\n');
    return content;
}

function nbc(document: Document) {
    const paragraphs = document.querySelectorAll('.article-body__content p');
    const content = Array.from(paragraphs).map(p => p.textContent).join('\n');
    return content;
}

function washingtonpost(document: Document) {
    const paragraphs = document.querySelectorAll('.article-body p');
    const content = Array.from(paragraphs).map(p => p.textContent).join('\n');
    return content;
}

function cbs(document: Document) {
    const paragraphs = document.querySelectorAll('.content__body p');
    const content = Array.from(paragraphs).map(p => p.textContent).join('\n');
    return content;
}