
import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs";
import mammoth from "https://esm.sh/mammoth@1.9.0";
import JSZip from "https://esm.sh/jszip@3.10.1";

// READ PDF FILE
async function readPDF(file) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";

    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({
        data: buffer
    }).promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();

        text += content.items
            .map(item => item.str)
            .join(" ") + "\n";
    }

    return text;
}

// READ DOCX FILE
async function readDOCX(file) {
    const result = await mammoth.extractRawText({
        arrayBuffer: await file.arrayBuffer()
    });

    return result.value;
}

// READ PPTX FILE
async function readPPTX(file) {
    const zip = await JSZip.loadAsync(file);
    const slideFiles = Object.keys(zip.files)
        .filter(name => /^ppt\/slides\/slide\d+\.xml$/.test(name))
        .sort((a, b) => {
            const numberA = Number(a.match(/slide(\d+)/)[1]);
            const numberB = Number(b.match(/slide(\d+)/)[1]);
            return numberA - numberB;
        });

    let text = "";

    for (const slideFile of slideFiles) {
        const xml = await zip.file(slideFile).async("text");
        const document = new DOMParser().parseFromString(
            xml,
            "application/xml"
        );

        const words = [...document.getElementsByTagName("a:t")]
            .map(element => element.textContent);

        text += words.join(" ") + "\n";
    }

    return text;
}

// MAIN FILE READER
export async function readFileContent(file) {
    const extension = file.name.toLowerCase().split(".").pop();

    if (extension === "txt") {
        return await file.text();
    }

    if (extension === "pdf") {
        return await readPDF(file);
    }

    if (extension === "docx") {
        return await readDOCX(file);
    }

    if (extension === "pptx") {
        return await readPPTX(file);
    }

    throw new Error("Unsupported file format.");
}
