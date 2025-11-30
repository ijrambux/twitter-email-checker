export default async function handler(req, res) {
  const email = req.query.email || "";

  try {
    const response = await fetch("https://x.com/i/api/account/password_reset.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "x-twitter-active-user": "yes",
        "x-twitter-client-language": "en"
      },
      body: JSON.stringify({ email })
    });

    const json = await response.json();

    if (json?.errors?.[0]?.code === 370) {
      return res.json({ status: "NOT FOUND ✖️" });
    }

    return res.json({ status: "FOUND ✔️" });

  } catch (e) {
    return res.json({ status: "ERROR ⚠️" });
  }
}
