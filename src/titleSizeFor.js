function countCharacters(text) {
    const matches = text.match(/\p{L}/gu);
    return matches ? matches.length : 0;
}

export default function titleSizeFor(title){
    if (countCharacters(title) > 20){
        return 13
    } else {return}
}