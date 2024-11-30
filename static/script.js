document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");
    const chatDisplay = document.getElementById("chatDisplay");

    // Function to create and append a message to the chat display
    const appendMessage = (content, senderClass, senderLabel = "") => {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("response");

        if (senderLabel) {
            const senderName = document.createElement("div");
            senderName.textContent = senderLabel;
            senderName.classList.add("question");
            messageContainer.appendChild(senderName);
        }

        const messageContent = document.createElement("div");
        messageContent.textContent = content;
        messageContent.classList.add(senderClass);
        messageContainer.appendChild(messageContent);

        chatDisplay.appendChild(messageContainer);

        // Scroll chatDisplay to the bottom
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    };

    // Event listener for the Send button
    sendButton.addEventListener("click", async () => {
        const message = userInput.value.trim();
        if (message === "") return;

        // Display user message
        appendMessage(message, "user-message", "You");

        // Send message to the server
        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // Display bot response
            appendMessage(data.response, "bot-message", "GlycanAge Expert");
        } catch (error) {
            console.error("Error:", error);
            appendMessage(
                "Something went wrong. Please try again.",
                "error-message",
                "Error"
            );
        }

        userInput.value = ""; // Clear input field
    });

    // Allow pressing "Enter" to send a message
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});
