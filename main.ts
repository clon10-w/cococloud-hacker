//% color=026 weight=100 icon="\uf26c" block="CocoCloud Hacker"
namespace CocoCloudHacker {

let cocoSent = false
	
    //% subcategory="Future Fx"
    //% weight=29
    //% blockGap=8
    //% blockId=send_cococloud
    //% block="send to CocoCloud:|API Key %apiKeysec|Properties %pps|Value %vlen"
    export function sendToCococloud(apiKeysec: string, pps: string, vlen: number) {

        // Reset the upload successful flag.
        cocoSent = false
	var vle = vlen.toString()

        // Make sure the WiFi is connected.
        if (esp8266.isWifiConnected() == false) return

        // Connect to Telegram. Return if failed is deleted
        esp8266.sendCommand("AT+CIPSTART=\"TCP\",\"" + "api.cocorobo.hk" + "\",80", "OK", 60)

        // Construct the data to send.
	let data = "POST /iot/data/eventAPIKeyJson/" + apiKeysec + "/ HTTP/1.1\r\n"
	data += "Host: " + "api.cocorobo.hk" + "\r\n"
	data += "Content-Type: " + "application/json" + "\r\n"
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

    //% subcategory="Future Fx"
    //% weight=29
    //% blockGap=8
    //% blockId=send_cococloud_x3
    //% block="send greenhouse data to CocoCloud:|API Key %apiKeyth|Properties1 %pps1 Value1 %vlen1|Properties2 %pps2 Value2 %vlen2|Properties3 %pps3 Value3 %vlen3"
    export function sendToCococloudx3(apiKeyth: string, pps1: string, vlen1: number, pps2: string, vlen2: number, pps3: string, vlen3: number) {

        // Reset the upload successful flag.
        cocoSent = false
	let vle1 = vlen1.toString()
	let vle2 = vlen2.toString()
	let vle3 = vlen3.toString()

        // Make sure the WiFi is connected.
        if (esp8266.isWifiConnected() == false) return

        // Connect to Telegram. Return if failed is deleted
        esp8266.sendCommand("AT+CIPSTART=\"TCP\",\"" + "api.cocorobo.hk" + "\",80", "OK", 60)

        // Construct the data to send.
	let data = "POST /iot/data/eventAPIKeyJson/" + apiKeyth + "/ HTTP/1.1\r\n"
	data += "Host: " + "api.cocorobo.hk" + "\r\n"
	data += "Content-Type: " + "application/json" + "\r\n"
	//data += "Content-Type: " + "text/plain" + "\r\n"
	data += "Content-Length: " + (pps1.length + vle1.length + pps2.length + vle2.length + pps3.length + vle3.length + 19) + "\r\n" 
	data += "\r\n"
	data += "\{\"" + pps1 + "\":\"" + vle1+ "\",\"" + pps2 + "\":\"" + vle2+ "\",\"" + pps3 + "\":\"" + vle3+ "\"}" 

        // Send the data.
        esp8266.sendCommand("AT+CIPSEND=" + (data.length + 2))
        esp8266.sendCommand(data)

        //Return if "SEND OK" is not received.
        if (esp8266.getResponse("EVENT UPDATE", 1000) == "") {
            // Close the connection and return.
            esp8266.sendCommand("AT+CIPCLOSE", "OK", 1000)
            return
        }

        // Close the connection.
        esp8266.sendCommand("AT+CIPCLOSE", "OK", 1000)

        // Set the upload successful flag and return.
        cocoSent = true
        return
    }
}
