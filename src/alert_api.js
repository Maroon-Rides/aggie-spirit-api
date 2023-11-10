import DomParser from "dom-parser"

export async function getAlerts() {
    var page = await fetch("https://transport.tamu.edu/busroutes.web/")
    var text = await page.text()

    var parser = new DomParser()
    var dom = parser.parseFromString(text)

    var alerts = dom.getElementsByClassName("rssalert")

    var parsedAlerts = []

    alerts.forEach((alert) => {
        var link = alert.getElementsByTagName("a")[0]
        var href = "https:" + link.getAttribute("href")
        
        var title = link.innerHTML.split("</i>")[1]

        parsedAlerts.push({
            title: title,
            link: href
        })
    })
    return parsedAlerts
}

