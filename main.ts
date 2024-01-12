//% color=026 weight=100 icon="\uf26c" block="CocoCloud Hacker"
namespace CocoCloudHacker {

	let cocoSent = false
	
    //% subcategory="Future Fx"
    //% weight=29
    //% blockGap=8
    //% blockId=send_cococloud
    //% block="send message to CocoCloud:|API Key %apiKeysec|Properties %pps|Value %vle"
    export function sendToCococloud(apiKeysec: string, pps: string, vle: string) {

        // Reset the upload successful flag.
        cocoSent = false

        // Make sure the WiFi is connected.
        if (esp8266.isWifiConnected() == false) return

        // Connect to Telegram. Return if failed is deleted
        esp8266.sendCommand("AT+CIPSTART=\"TCP\",\"" + "api.cocorobo.hk" + "\",80", "OK", 60)

        // Construct the data to send.
	let data = "POST /iot/data/eventAPIKeyJson/" + apiKeysec + "/ HTTP/1.1\r\n"
	data += "Host: " + "api.cocorobo.hk" + "\r\n"
	data += "Content-Type: " + "application/json;charset=utf-8" + "\r\n"
	//data += "Content-Type: " + "text/plain" + "\r\n"
	data += "Content-Length: " + (pps.length + vle.length + 7) + "\r\n" 
	data += "\r\n"
	data += "\{\"" + pps + "\":\"" + vle+ "\"\}" 

        // Send the data.
        esp8266.sendCommand("AT+CIPSEND=" + (data.length + 2))
        esp8266.sendCommand(data)

        /* Return if "SEND OK" is not received.
        if (esp8266.getResponse("EVENT UPDATE", 1000) == "") {
            // Close the connection and return.
            esp8266.sendCommand("AT+CIPCLOSE", "OK", 1000)
            return
        }*/

        // Close the connection.
        esp8266.sendCommand("AT+CIPCLOSE", "OK", 1000)

        // Set the upload successful flag and return.
        cocoSent = true
        return
    }
}
