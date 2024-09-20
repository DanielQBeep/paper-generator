import { headers } from "next/headers";
import puppeteer, { PDFOptions } from "puppeteer";

export default async function pdfRender(type: string, dataParse: any) {
    const browser: any = await puppeteer.launch({
        executablePath: process.env.NODE_ENV === 'production' ? '/usr/bin/chromium-browser' : '',
        headless: true,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    const pdfOptions = {
        // path: "test.pdf",
        format: 'A4',
    } as PDFOptions;

    await page.setExtraHTTPHeaders({
        'X-CreatedAt': headers().get('X-CreatedAt'),
        'X-version': headers().get('X-version')
    });

    await page.goto(`http://localhost:3000/${type}${dataParse}`, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf(pdfOptions);
    await browser.close();

    return pdfBuffer as BlobPart

}
