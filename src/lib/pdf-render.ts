import { headers } from "next/headers";
import puppeteer, { PDFOptions } from "puppeteer";

export default async function pdfRender(type: string, dataParse: any) {
    try {
        const browser: any = await puppeteer.launch({
            // executablePath: process.env.NODE_ENV === 'production' ? '/usr/bin/chromium-browser' : '',
            executablePath: process.env.NODE_ENV === 'production' ? '' : '',
            headless: true,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        const pdfOptions = {
            // path: "test.pdf",
            format: 'A4',
        } as PDFOptions;

        const createdAt = headers().get('X-CreatedAt')
        const version = headers().get('X-version')

        if (createdAt && version) {
            await page.setExtraHTTPHeaders({
                'X-CreatedAt': headers().get('X-CreatedAt'),
                'X-version': headers().get('X-version')
            });
        }

        const port = process.env.NODE_ENV === 'production' ? 7000 : 3001

        await page.goto(`http://localhost:${port}/${type}${dataParse}`, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf(pdfOptions);
        await browser.close();

        return pdfBuffer as BlobPart
    } catch (error: any) {
        return false
    }

}
