export async function getAuthentication() {
    var res = await fetch("https://aggiespirit.ts.tamu.edu/")
    var cookies = res.headers.getSetCookie()

    // extract to a header 
    var header = ""
    for (var cookie of cookies) {
        cookie = cookie.split(";")[0]
        header += cookie + "; "
    }

    return header
}