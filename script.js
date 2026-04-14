// 1. تعريف العناصر الأساسية
const chatInput = document.getElementById("chat-input");
const chatLogs = document.getElementById("chat-logs");
const chatCircle = document.getElementById("chat-circle");
const chatBox = document.getElementById("chat-box");

// 2. دالة النطق الصوتي (عشان البوت يتكلم)
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // نطق عربي سعودي/مصري
    utterance.pitch = 1;      // درجة الصوت
    utterance.rate = 0.9;     // سرعة الكلام (هادية عشان تتفهم)
    window.speechSynthesis.speak(utterance);
}

// 3. أول ما الصفحة تفتح (Welcome Message)
window.onload = () => {
    const welcomeText = "أهلاً بكِ يا منة في منصة طوارئ، أنا مساعدكِ الذكي، كيف يمكنني مساعدتكِ الآن؟";
    
    // إظهار الرسالة في الشات بعد ثانية
    setTimeout(() => {
        addMessage(welcomeText, "bot");
        speak(welcomeText);
    }, 1000);
};

// 4. فتح وقفل صندوق الشات عند الضغط على الدائرة
chatCircle.onclick = () => {
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "flex";
    } else {
        chatBox.style.display = "none";
    }
};

// 5. منطق الرد على الرسائل (الذكاء الاصطناعي البسيط)
function getBotResponse(userText) {
    let text = userText.toLowerCase();
    let botReply = "";

    if (text.includes("سكر") || text.includes("غيبوبة")) {
        botReply = "في حالة غيبوبة السكر: لو المريض واعي أعطيه سكر فوراً، لو غايب عن الوعي لا تضعي شيئاً في فمه وضعيه في وضعية الإفاقة.";
    } else if (text.includes("حادث") || text.includes("عربية")) {
        botReply = "ثبّتي رقبة المصاب ولا تحركيه إلا للضرورة القصوى، واتصلي بالإسعاف فوراً.";
    } else if (text.includes("حرق")) {
        botReply = "ضعي الحرق تحت ماء جاري فاتر لمدة 15 دقيقة، ولا تستخدمي معجون الأسنان.";
    } else if (text.includes("ضغط")) {
        botReply = "اجعلي المريض يستلقي ويرفع قدميه للأعلى قليلاً، ووفري له تهوية جيدة.";
    } else {
        botReply = "أنا معكِ، قولي لي الحالة (حادث، سكر، حرق) عشان أقدر أساعدكِ بالإسعافات الصح.";
    }

    setTimeout(() => {
        addMessage(botReply, "bot");
        speak(botReply);
    }, 600);
}

// 6. إضافة الرسالة للشاشة
function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
    msgDiv.innerText = text;
    chatLogs.appendChild(msgDiv);
    
    // سحب الشات لأسفل تلقائياً
    chatLogs.scrollTop = chatLogs.scrollHeight;
}

// 7. الإرسال عند الضغط على مفتاح Enter
chatInput.onkeypress = (e) => {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
        const userMsg = chatInput.value;
        addMessage(userMsg, "user");
        getBotResponse(userMsg);
        chatInput.value = ""; // مسح الخانة بعد الإرسال
    }
};
