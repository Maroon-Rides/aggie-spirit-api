import EventSource from "eventsource"

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4585.0 Safari/537.36"

export function TimetableConnection() {
    return new Connection("https://transport.tamu.edu/busroutes.web/timeHub")
}

export function MapConnection() {
    return new Connection("https://transport.tamu.edu/busroutes.web/mapHub")
}

class Connection {

    constructor(baseURL) {
        this.pendingRequests = {}
        this.baseURL = baseURL
    }

    async connect() {
        // Get Session ID for Authentication
        const sessionIdResponse = await fetch('https://transport.tamu.edu/busroutes.web', {
            signal: AbortSignal.timeout(10000),
            headers: {
                'User-Agent': USER_AGENT
            }
        })

        this.tsessionID = sessionIdResponse.headers.get("set-cookie").split(";")[0].split("=")[1]

        // Negotiate Connection to Server
        const negotiate_response = await fetch(
            this.baseURL + '/negotiate?negotiateVersion=1',
            {
                method: 'POST',
                headers: {
                    'User-Agent': USER_AGENT,
                    'Cookie': "TSSESSIONID=" + this.tsessionID + ";"
                }
            }
        )

        // extract connection token from response
        this.connectionToken = (await negotiate_response.json()).connectionToken
        await new Promise(r => setTimeout(r, 200)) // wait for hub to be ready

        // connect to sse server
        this.es = new EventSource(this.baseURL + "?id=" + this.connectionToken, {
            headers:
            {
                "User-Agent": USER_AGENT,
                "Cookie": "TSSESSIONID=" + this.tsessionID + ";",
                "Accept": "text/event-stream"

            }
        })

        // listen for messages
        this.es.addEventListener("message", async (event) => {
            this.handleMessage(event)
        })

        this.es.addEventListener("error", (event) => {
            console.log("API ERROR: ")
            console.log(event)
        })

         // wait 500ms
        await new Promise(r => setTimeout(r, 200))

        // send handshake
        const handshake = await fetch(this.baseURL + "?id=" + this.connectionToken, 
            {
                method: 'POST', 
                body: `{"protocol":"json","version":1}`, 
                headers: {"User-Agent": USER_AGENT, "Cookie": "TSSESSIONID=" + this.tsessionID + ";"}
            }
        )
    }

    handleMessage(event) {
        // cut last charachter off of data, its weird
        const dataString = event.data.trim().slice(0, -1)
        
        // grab the json data
        const data = JSON.parse(dataString)

        if (data.error) throw new Error(data.error)
        
        var pending = this.pendingRequests[data.invocationId]
        if (pending) {
            pending.resolve(data.result)
            delete this.pendingRequests[data.invocationId]
        }
    }

    send(target, args) {
        // generate a random request ID
        const requestId = Math.floor(Math.random() * 1000000000)

        // create a promise to resolve when the response comes back
        const promise = new Promise(async (resolve, reject) => {
            this.pendingRequests[requestId.toString()] = { resolve, reject }

            // send the message
            await fetch(this.baseURL + "?id=" + this.connectionToken, 
            {
                method: 'POST', 
                body: `{"arguments":${JSON.stringify(args)},"invocationId":"${requestId}","target":"${target}","type":1}`, 
                headers: {"User-Agent": USER_AGENT, "Cookie": "TSSESSIONID=" + this.tsessionID + ";"}
            })
        })

        return promise
    }

    close() {
        this.es.close()
    }

}
