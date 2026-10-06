# Deployment Options for Capluk Portfolio on mataque.com

> [!NOTE]
> The client's site (`mataque.com`) is on **Niaga Hoster (Hostinger)**.  
> The portfolio is deployed at **portfolio-capluk.vercel.app**.  
> The client will add a button on their site that links to the portfolio.

---

## Option 1: Subdomain — `capluk.mataque.com` ⭐ Recommended

This connects a subdomain of the client's domain directly to the Vercel deployment. The portfolio runs natively with full Next.js features, SEO, and performance.

**Final result**: User clicks button → goes to `capluk.mataque.com` → sees the full portfolio.

---

### Step 1: Add Domain in Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Open the **portfolio-capluk** project
3. Go to **Settings** → **Domains**
4. Type `capluk.mataque.com` and click **Add**
5. Vercel will show you DNS configuration instructions — it will say something like:

| Type | Name | Value |
|------|------|-------|
| **CNAME** | `capluk` | `cname.vercel-dns.com` |

6. Keep this page open — you'll need it for Step 2

---

### Step 2: Add DNS Record in Hostinger

1. Log in to [hpanel.hostinger.com](https://hpanel.hostinger.com) (Niaga Hoster)
2. Select the **mataque.com** domain
3. Go to **DNS / Nameservers** → **DNS Records** (or "Kelola DNS")
4. Click **Add Record** and fill in:

| Field | Value |
|-------|-------|
| **Type** | `CNAME` |
| **Name** (or Host) | `capluk` |
| **Target** (or Points to) | `cname.vercel-dns.com` |
| **TTL** | `14400` (or default) |

5. Click **Save** / **Tambah Record**

> [!IMPORTANT]
> DNS propagation can take **5 minutes to 48 hours** (usually 10-30 minutes).  
> You can check status at [dnschecker.org](https://dnschecker.org/#CNAME/capluk.mataque.com)

---

### Step 3: Verify in Vercel

1. Go back to Vercel → **Settings** → **Domains**
2. `capluk.mataque.com` should show a ✅ green checkmark once DNS propagates
3. Vercel automatically provisions an **SSL certificate** (HTTPS) — no extra setup needed

---

### Step 4: Client Adds Button

On the client's website (mataque.com), they add a button/link wherever they want:

```html
<a href="https://capluk.mataque.com" target="_blank" rel="noopener noreferrer">
  View Portfolio
</a>
```

Or if they're using WordPress, they can add a **Button Block** with the URL `https://capluk.mataque.com`.

---

### Pros & Cons

| ✅ Pros | ❌ Cons |
|---------|---------|
| Full Next.js functionality | URL is `capluk.mataque.com` not `mataque.com/capluk` |
| Automatic HTTPS/SSL | Requires DNS access |
| Perfect SEO | |
| Fast (served from Vercel CDN) | |
| No code changes needed | |
| Professional look | |

---
---

## Option 2: iframe at `mataque.com/capluk`

This embeds the portfolio inside the client's existing site. The URL stays as `mataque.com/capluk`.

**Final result**: User clicks button → goes to `mataque.com/capluk` → sees the portfolio embedded in an iframe.

---

### Step 1: Create the Folder & File in Hostinger

1. Log in to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Go to **File Manager** (or "Pengelola File")
3. Navigate to `public_html/` (the root of `mataque.com`)
4. Create a new folder called **`capluk`**
5. Inside `capluk/`, create a file called **`index.html`**
6. Paste the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capluk Portfolio</title>
    <meta name="description" content="Capluk Portfolio - Creative works and projects">

    <style>
        /* Reset & Full-screen iframe */
        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        iframe {
            width: 100vw;
            height: 100vh;
            border: none;
            display: block;
        }

        /* Loading state while iframe loads */
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0a0a;
            color: #ffffff;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 1.1rem;
            z-index: 10;
            transition: opacity 0.4s ease;
        }

        .loader.hidden {
            opacity: 0;
            pointer-events: none;
        }

        .loader-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ffffff;
            margin: 0 4px;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        .loader-dot:nth-child(1) { animation-delay: -0.32s; }
        .loader-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    </style>
</head>
<body>
    <!-- Loading indicator -->
    <div class="loader" id="loader">
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
    </div>

    <!-- Portfolio iframe -->
    <iframe
        id="portfolio"
        src="https://portfolio-capluk.vercel.app/"
        title="Capluk Portfolio"
        allowfullscreen
        loading="eager"
        onload="document.getElementById('loader').classList.add('hidden')"
    ></iframe>
</body>
</html>
```

7. Click **Save**

---

### Step 2: Test It

Visit `https://mataque.com/capluk` — you should see the portfolio loading inside the page.

> [!WARNING]
> **Potential issue**: If the portfolio uses `X-Frame-Options` or `Content-Security-Policy` headers that block framing, the iframe will show a blank page.  
> In that case, we need to add response headers in the Vercel project. See the fix below.

---

### Step 2b: Allow iframe Embedding (If Blocked)

If the iframe shows blank, we need to update the portfolio's Vercel config. Add a `vercel.json` in the portfolio project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "ALLOW-FROM https://mataque.com"
        },
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://mataque.com"
        }
      ]
    }
  ]
}
```

Then redeploy the portfolio project.

> [!NOTE]
> `X-Frame-Options: ALLOW-FROM` is deprecated in modern browsers.  
> The `Content-Security-Policy: frame-ancestors` header is the modern standard and is supported by all major browsers.  
> We include both for maximum compatibility.

---

### Step 3: Client Adds Button

Same as before — on their site, they link to:

```html
<a href="https://mataque.com/capluk">
  View Portfolio
</a>
```

Since it's on the same domain, they don't even need `target="_blank"` unless they want it to open in a new tab.

---

### Pros & Cons

| ✅ Pros | ❌ Cons |
|---------|---------|
| URL stays as `mataque.com/capluk` | Weak SEO (search engines don't index iframe content well) |
| No DNS changes needed | Scrolling can feel slightly off on mobile |
| Easy to set up (just upload a file) | May need Vercel header config to allow framing |
| Works on any hosting | Links inside portfolio won't update the browser URL |

---
---

## Quick Comparison

| | Subdomain ⭐ | iframe |
|---|---|---|
| **URL** | `capluk.mataque.com` | `mataque.com/capluk` |
| **Setup time** | ~15 min (+ DNS propagation) | ~5 min |
| **SEO** | ✅ Full | ❌ Weak |
| **Performance** | ✅ Native | ⚠️ Extra layer |
| **Mobile UX** | ✅ Perfect | ⚠️ Can be janky |
| **Maintenance** | Zero — auto-deploys from Vercel | Zero — points to Vercel |
| **Requires DNS access** | Yes | No |
| **Professional feel** | ✅✅ | ✅ |
| **Code changes needed** | None | Maybe (Vercel headers) |

---

## 💡 Since the Client Will Use a Button Anyway...

Since the user flow is: **click button → go to portfolio**, both options work equally well from a UX perspective. The user won't notice much difference because they're navigating to a new page either way.

The **subdomain** is still better because:
- It loads faster (no iframe overhead)
- Mobile scrolling works perfectly
- Google can index it properly
- It looks more professional (`capluk.mataque.com` vs an iframe wrapper)

But if the client doesn't want to touch DNS settings, **iframe is totally fine** for a button-redirect flow.
