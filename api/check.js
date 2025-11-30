export default async function handler(req, res) {
    const { emails } = req.body;

    // فحص وهمي (أي إيميل فيه حرف x نعتبره مربوط)
    const linked = emails.filter(e => e.toLowerCase().includes("x"));

    res.status(200).json(linked);
}
