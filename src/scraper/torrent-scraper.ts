import puppeteer from 'puppeteer';


export interface Torrent {
    name: string;
    magnet: string;
    size: string;
    date: string
}

export default async function scrape(query: string): Promise<Torrent[]> {
    const url = `https://thepiratebay.org/search.php?q=${encodeURIComponent(query)}&all=on&search=Pirate+Search&page=0&orderby=`;

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(url)



    const torrents: Torrent[] = await page.$$eval('ol#torrents > li.list-entry', (items) =>
        Array.from(items)
            .slice(0, 20) // Top 20 results
            .map((el) => {
            const name = el.querySelector('.item-title a')?.textContent?.trim() || '';
            const magnet = el.querySelector('a[href^="magnet:"]')?.getAttribute('href') || '';
            const size = el.querySelector('.item-size')?.textContent?.trim() || '';
            const date = el.querySelector('.item-uploaded label')?.textContent?.trim() || '';

            return { name, magnet, size, date };
        })
    );

    await browser.close();

    return torrents;
}