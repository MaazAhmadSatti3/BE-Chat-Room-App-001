export const userMessages = function (messageBody: string, userId: string, messageArray: any) {
    messageArray.map((data: any) => {
        let userMessages: any = []

        for(let i=0; i<data.messageArray.length; i++) {
            if(data.messageArray[i].userId.toString() == userId) {
                userMessages.push(data.messageArray[i])
            }
        }
        data.messageArray = userMessages;
    })

    return messageArray.filter((element: any) => {
        return element.messageArray.length != 0
    })
}