export default async function handler(req, res) {
    let email = req.query.email;
    if (!email) return res.json({ error: "no email" });

    // بحث علني في تويتر/X
    let searchUrl = `https://duckduckgo.com/?q="${email}"+site:twitter.com`;

    try {
        let response = await fetch(searchUrl);
        let text = await response.text();

        let exists = !text.includes("no results");

        res.json({
            email,
            exists
        });

    } catch (e) {
        res.json({ email, exists: false });
    }
}
