sendButton = document.getElementById("sendButton");
Question = document.querySelector(".Question");
Solution = document.querySelector(".Solution");
historyQuestion = document.querySelector(".historyQuestion");
async function postData(url = "/deleteChat", data = {}) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  return response.json();
}

sendButton.addEventListener("click", async () => {
  questionInput = document.getElementById("questionInput").value;

  if (questionInput == "") {
    alert("An question cannot be empty or null.. retry!");
    return;
  }
  document.getElementById("questionInput").value = "";

  document.querySelector(".right2").style.display = "block";
  document.querySelector(".right1").style.display = "none";
  Question.innerHTML = questionInput;
  let result = await postData("/api", { question: questionInput });

  console.log(result);
  Solution.innerHTML =
    result.answer +
    "<br><br><hr><br>" +
    "Thank you for your question!✨ I am here to help you with any queries you may have. Please feel free to ask me anything, and I will do my best to assist you😊";
});
chats = document.querySelector(".chats");
chats.addEventListener("click", async (e) => {
  if (e.target.classList.contains("chat")) {
    let qHist = e.target.textContent;
    console.log(qHist);
    document.querySelector(".right2").style.display = "block";
    document.querySelector(".right1").style.display = "none";
    Question.innerHTML = qHist;
    let result = await postData("/api", { question: qHist });

    console.log(result);
    Solution.innerHTML =
      result.answer +
      "<br><br><hr><br>" +
      "Thank you for your question!✨ I am here to help you with any queries you may have. Please feel free to ask me anything, and I will do my best to assist you😊";
  }
});

async function delData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get error message
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in delData:", error);
    throw error; // Re-throw to be handled by the caller
  }
}

// const delChatButton = document.querySelector(".deleteChat"); // Corrected selector
// if (delChatButton) {
//   // Check if the button exists
//   delChatButton.addEventListener("click", async (e) => {
//     try {
//       const historyQuestionElement = e.target.closest(".historyQuestion"); // More descriptive name

//       if (historyQuestionElement) {
//         const chatElement = historyQuestionElement.querySelector(".chat");
//         if (chatElement) {
//           const chatText = chatElement.textContent?.trim() || ""; // Handle null and whitespace
//           console.log("Deleting chat with text:", chatText);

//           const result = await delData("/deleteChat", { chat_text: chatText });
//           console.log("Deletion result:", result);

//           historyQuestionElement.remove(); // Remove after successful deletion
//         } else {
//           console.warn("No .chat element found within .historyQuestion");
//         }
//       } else {
//         console.warn("No .historyQuestion element found");
//       }
//     } catch (error) {
//       // Handle errors from delData or DOM manipulation
//       console.error("Error during deleteChat click:", error);
//       //  Consider showing a user-friendly message (e.g., using a toast library)
//     }
//   });
// } else {
//   console.warn(
//     "Element with class 'deleteChat' not found.  Ensure it exists in the DOM."
//   );
// }

async function delData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  return response.json();
}

delChat = document.querySelector(".deleteChat");
document.addEventListener("click", async (e) => {
  const parentNode = e.target.closest(".historyQuestion");

  if (parentNode) {
    let child = parentNode.querySelector(".chat").textContent;
    console.log(child);
    let result = await delData("/deleteChat", { chat_text: child });
    console.log(result);
  }
  if (parentNode) {
    parentNode.remove();
    console.log("Parent node removed successfully.");
  }

  deleteData("/delete", {});
});
