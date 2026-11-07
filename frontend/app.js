const API_BASE = "http://127.0.0.1:8000";

// 1. Load Questions List in questions.html
async function loadQuestions() {
    const container = document.getElementById("questions-container");
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE}/questions`);
        if (!response.ok) throw new Error("Failed to fetch questions");
        const questions = await response.json();

        container.innerHTML = "";
        questions.forEach(q => {
            const card = document.createElement("div");
            card.className = "bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex justify-between items-center hover:border-indigo-500/50 transition";
            card.innerHTML = `
                <div>
                    <div class="flex gap-2 mb-2">
                        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">${q.category}</span>
                        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">${q.difficulty}</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">${q.title}</h3>
                </div>
                <a href="question-detail.html?id=${q.question_id}" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transition">Solve</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = `<p class="text-red-400 text-center col-span-full">Failed to connect to backend server.</p>`;
    }
}

// 2. Load Single Question Detail in question-detail.html
async function loadQuestionDetail() {
    const params = new URLSearchParams(window.location.search);
    const questionId = params.get("id");
    if (!questionId) return;

    try {
        const res = await fetch(`${API_BASE}/questions/${questionId}`);
        if (!res.ok) throw new Error("Question not found");
        const q = await res.json();

        document.getElementById("q-title").innerText = q.title;
        document.getElementById("q-category").innerText = q.category;
        document.getElementById("q-difficulty").innerText = q.difficulty;
        document.getElementById("q-description").innerText = q.description;
        document.getElementById("question-id").value = q.question_id;
    } catch (error) {
        document.getElementById("question-detail-container").innerHTML = `<p class="text-red-400">Error loading question details.</p>`;
    }
}

// 3. Submit Code Solution / Attempt
async function submitAttempt(event) {
    event.preventDefault();
    const questionId = document.getElementById("question-id").value;
    const answer = document.getElementById("submitted-answer").value;

    const payload = {
        student_id: 1, // Default test student ID
        question_id: parseInt(questionId),
        submitted_answer: answer,
        score: 100.0, // Assuming successful submission
        completed: true
    };

    try {
        const res = await fetch(`${API_BASE}/attempts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert("Solution submitted successfully!");
            window.location.href = "progress.html";
        } else {
            alert("Submission failed.");
        }
    } catch (error) {
        alert("Error connecting to backend.");
    }
}

// 4. Load Student Progress in progress.html
// 4. Load Student Progress in progress.html
async function loadStudentProgress() {
    const progressContainer = document.getElementById("progress-table-body");
    if (!progressContainer) return;

    try {
        const res = await fetch(`${API_BASE}/students/1/progress`);
        if (!res.ok) throw new Error("Failed to load progress");
        const data = await res.json();

        const attemptedEl = document.getElementById("total-attempted");
        if (attemptedEl) attemptedEl.innerText = data.total_attempts;

        const solvedEl = document.getElementById("total-solved");
        if (solvedEl) solvedEl.innerText = data.total_solved;

        progressContainer.innerHTML = "";
        if (data.attempts.length === 0) {
            progressContainer.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500">No attempts recorded yet.</td></tr>`;
            return;
        }

        data.attempts.forEach(att => {
            const row = document.createElement("tr");
            row.className = "border-b border-slate-800/60 hover:bg-slate-900/40 transition";
            row.innerHTML = `
                <td class="py-4 px-4 font-semibold text-white">${att.title}</td>
                <td class="py-4 px-4"><span class="px-2.5 py-1 rounded-full text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">${att.category}</span></td>
                <td class="py-4 px-4 text-emerald-400 font-semibold">${att.score}%</td>
                <td class="py-4 px-4"><span class="px-2.5 py-1 rounded-full text-xs ${att.completed ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'}">${att.completed ? 'Completed' : 'Attempted'}</span></td>
                <td class="py-4 px-4 text-slate-400 text-sm">${new Date(att.attempted_at).toLocaleDateString()}</td>
            `;
            progressContainer.appendChild(row);
        });
    } catch (error) {
        const errorEl = document.getElementById("progress-container-error");
        if (errorEl) errorEl.innerText = "Error loading progress data.";
    }
}

// 5. Chatbot Handler in chatbot.html
async function sendChatMessage(event) {
    if (event) event.preventDefault();
    const inputField = document.getElementById("chat-input");
    const chatBox = document.getElementById("chat-box");
    const message = inputField.value.trim();
    if (!message) return;

    // Append user message
    chatBox.innerHTML += `
        <div class="flex justify-end mb-4">
            <div class="bg-indigo-600 text-white px-4 py-3 rounded-2xl max-w-md shadow-md">${message}</div>
        </div>
    `;
    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const res = await fetch(`${API_BASE}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });
        const data = await res.json();

        // Append bot reply
        chatBox.innerHTML += `
            <div class="flex items-start space-x-3 mb-4">
                <div class="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">BOT</div>
                <div class="bg-slate-900 border border-slate-800 text-slate-300 px-4 py-3 rounded-2xl max-w-md shadow-md">${data.reply}</div>
            </div>
        `;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Chat error:", error);
    }
}

// Auto-initialize based on active page
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("questions-container")) loadQuestions();
    if (document.getElementById("question-detail-container")) loadQuestionDetail();
    if (document.getElementById("progress-table-body")) loadStudentProgress();
});