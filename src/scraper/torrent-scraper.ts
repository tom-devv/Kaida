import puppeteer from 'puppeteer';


export interface FetchedTorrent {
    name: string;
    magnet: string;
    size: string;
    date: string
    seeds: string
}

export const scrape = async (query: string): Promise<FetchedTorrent[]> => {
    const url = `https://thepiratebay.org/search.php?q=${encodeURIComponent(query)}&all=on&search=Pirate+Search&page=0&orderby=`;
    let browser;

    try {
        browser = await puppeteer.launch({ headless: true });
    } catch (err) {
        console.error("!![FATAL] Failed to launch puppeteer!!")
        console.error(err);
        process.exit(1);
    }

    const page = await browser.newPage();

    await page.goto(url)

    const torrents: FetchedTorrent[] = await page.$$eval('ol#torrents > li.list-entry', (items) =>
        Array.from(items)
            .slice(0, 10) // Top 20 results
            .map((el) => {
                const name = el.querySelector('.item-title a')?.textContent?.trim() || '';
                const magnet = el.querySelector('a[href^="magnet:"]')?.getAttribute('href') || '';
                const size = el.querySelector('.item-size')?.textContent?.trim() || '';
                const date = el.querySelector('.item-uploaded label')?.textContent?.trim() || '';
                const seeds = el.querySelector('.item-seed')?.textContent?.trim() || '';

                return { name, magnet, size, date, seeds };
            })
    );

    await browser.close();

    return torrents;
}