export class SlackNotification {
    constructor(authUri) {
        this.authUri = authUri;
        this.url = "https://hooks.slack.com/services/" + authUri;
    }

    async sendMessage(messageText) {
        if (!this.authUri) {
            return;
        }

        let messageBlock = {
            "text": messageText
        }

        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(messageBlock),
            });

            if (response.ok) console.log(`notification sent successfully`);
            else {
                const errorMessage = await response.text();
                console.error('SlackError' + errorMessage);
            }
        } catch (error) {
            console.error(error);
        }
    }
}