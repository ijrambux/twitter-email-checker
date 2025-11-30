async function processCombo() {
    let file = document.getElementById("comboFile").files[0];
    if (!file) return alert("اختر ملف combo أولاً");

    let text = await file.text();

    let lines = text.split("\n");
    let emails = [];

    for (let line of lines) {
        let parts = line.trim().split(":");
        if (parts[0].includes("@")) {
            emails.push(parts[0]);  // استخراج الإيميل فقط
        }
    }

    document.getElementById("results").innerHTML = "جاري الفحص...";

    let checked = [];

    for (let email of emails) {
        let res = await fetch(`/api/check?email=${encodeURIComponent(email)}`);
        let data = await res.json();
        checked.push(data);
    }

    let output = "";
    for (let c of checked) {
        output += `${c.email} → ${c.exists ? "✔ موجود في X" : "✖ غير موجود"}<br>`;
    }

    document.getElementById("results").innerHTML = output;

    // حفظ ملف النتيجة
    let blob = new Blob([output], { type: "text/plain" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "results.txt";
    a.click();
}
