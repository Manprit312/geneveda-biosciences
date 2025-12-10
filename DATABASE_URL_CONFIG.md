# 🔗 DATABASE_URL Configuration for Hostinger

## ✅ Your Database Details

- **Host:** `46.202.161.241`
- **User:** `u896634865_manprit`
- **Password:** `mnprt@Bharatail`
- **Database:** `u896634865_manprit`
- **Port:** `3306`

## 📝 Add to .env.local

Add this line to your `.env.local` file:

```env
DATABASE_URL="mysql://u896634865_manprit:mnprt%40Bharatail@46.202.161.241:3306/u896634865_manprit"
```

**Important:** Password mein `@` character hai, isliye `%40` se replace kiya hai.

## 🔄 Alternative: Legacy Format (Auto-converted)

Agar aap legacy format prefer karte hain:

```env
DB_HOST=46.202.161.241
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatail
DB_NAME=u896634865_manprit
DB_PORT=3306
```

Ye automatically `DATABASE_URL` mein convert ho jayega.

## ✅ Test Connection

After adding to `.env.local`:

```bash
npm run dev
# Visit: http://localhost:3000/api/test-db
```

## 🚀 For Vercel

Vercel Dashboard → Settings → Environment Variables mein add karein:

```env
DATABASE_URL=mysql://u896634865_manprit:mnprt%40Bharatail@46.202.161.241:3306/u896634865_manprit
```

Ya legacy format:

```env
DB_HOST=46.202.161.241
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatail
DB_NAME=u896634865_manprit
DB_PORT=3306
```

## 🔐 Password URL Encoding

Agar password change karein, to special characters ko encode karein:

- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`

