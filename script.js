$(document).ready(function() {
    const apiKey = 'AIzaSyBXoLW4aFxzOVre1lqKJIqyFPZnK';
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

    function appendMessage(message, isUser) {
        const messageDiv = $('<div>').addClass(isUser ? 'user-message' : 'bot-message').text(message);
        $('#chatBody').append(messageDiv);
        $('#chatBody').scrollTop($('#chatBody')[0].scrollHeight);
    }

    async function getBotResponse(userMessage) {
        try {
            const response = await $.ajax({
                url: `${apiUrl}?key=${apiKey}`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: userMessage
                        }]
                    }]
                })
            });

            const botReply = response.candidates[0].content.parts[0].text;
            appendMessage(botReply, false);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Sorry, kuch gadbad ho gaya. Fir se try karo!', false);
        }
    }

    $('#sendBtn').click(function() {
        const userMessage = $('#userInput').val().trim();
        if (userMessage) {
            appendMessage(userMessage, true);
            $('#userInput').val('');
            getBotResponse(userMessage);
        }
    });

    $('#userInput').keypress(function(e) {
        if (e.which === 13) {
            $('#sendBtn').click();
        }
    });
});
