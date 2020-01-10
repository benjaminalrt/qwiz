/**
 * Delete special characters by formatting them to UTF8
 */
export const utf8 = (string)=>{
    var txt = document.createElement("textarea");
    txt.innerHTML = string;
    return txt.value;
}