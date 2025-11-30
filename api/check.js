export default async function handler(req, res) {
    const { emails } = req.body;

    let results = [];

    for (let email of emails) {
        // فقط مثال لفحص وجود الإيميل في X
        const exists = email.toLowerCase().includes("x.com") ? true : false;

        if (exists) results.push(email);
    }

    res.status(200).json(results);
}
