class Engine {
    constructor() {

    }

    search(keywords) {
        let arrayKeywords = uniq(createArray(keywords, " ", true));
        let results = {
            count: 0,
            list: []
        };
        for (let book = 0; book < bookOfMormon.books.length; book++) {
            for (let chapter = 0; chapter < bookOfMormon.books[book].chapters.length; chapter++) {
                for (let verse = 0; verse < bookOfMormon.books[book].chapters[chapter].verses.length; verse++) {
                    let thisVerse = bookOfMormon.books[book].chapters[chapter].verses[verse];
                    let thisResult = JSON.parse(JSON.stringify(thisVerse));
                    thisResult.occurrences = [];
                    for (let word = 0; word < thisVerse.parsedText.length; word++) {
                        for (let keyword = 0; keyword < arrayKeywords.length; keyword++) {
                            if (thisVerse.parsedText[word] === arrayKeywords[keyword]) {
                                thisResult.occurrences.push(word);
                            }
                        }
                    }
                    if (thisResult.occurrences.length > 0) {
                        results.count++;
                        results.list.push(thisResult);
                    }
                }
            }
        }
        return results;
    }

    generateResults(result) {
        let r = "";
        let totalOccurrences = 0;
        for (let i = 0; i < result.list.length; i++) {
            let txt = result.list[i].text.split(" ");
            for (let o = 0; o < result.list[i].occurrences.length; o++) {
                totalOccurrences++;
                txt[result.list[i].occurrences[o]] = "<span class='bold'>" + txt[result.list[i].occurrences[o]] + "</span>";
            }
            r += "<span class='reference'>" + result.list[i].reference;
            if (result.list[i].occurrences.length > 1) {
                r += " (" + result.list[i].occurrences.length + " occurrences)";
            }
            r += "</span><br>" + txt.join(" ") + "<br><br>";
        }
        let preamble = "";
        preamble += (result.count != 1) ? result.count + " verses" : "1 verse";
        preamble += ", " + ((totalOccurrences === 1) ? "1 occurrence" : totalOccurrences + " occurrences");
        preamble += "<br><br>";
        return preamble + r;
    }
}

function createArray(string, splitter, convertToLower = false) {
    let ar = string.split(splitter);
    for (let i = 0; i < ar.length; i++) {
        let s = ar[i].split("");
        let r = "";
        for (let j = 0; j < s.length; j++) {
            let c = s[j].charCodeAt();
            if (c > 64 && c < 91 || c > 96 && c < 123 || c === 39) {
                // if is A-Z, a-z, or ' (apostrophe)
                r += (convertToLower) ? s[j].toLowerCase() : s[j];
            }
        }
        ar[i] = r;
    }
    return ar;
}

function uniq(a) {
    var newArr = [a[0]];
    for (var i = 1; i < a.length; i++) {
        if (a[i - 1] != a[i]) {
            newArr.push(a[i]);
        }
    }
    return newArr;
}

// function prepFullText() {
//     for (let book = 0; book < bookOfMormon.books.length; book++) {
//         for (let chapter = 0; chapter < bookOfMormon.books[book].chapters.length; chapter++) {
//             for (let verse = 0; verse < bookOfMormon.books[book].chapters[chapter].verses.length; verse++) {
//                 let thisVerse = bookOfMormon.books[book].chapters[chapter].verses[verse];
//                 thisVerse.parsedText = createArray(thisVerse.text.toLowerCase(), " ");
//             }
//         }
//     }
//     console.log(JSON.stringify(bookOfMormon));
// }