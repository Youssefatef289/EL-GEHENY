## تشغيل المشروع محلياً (Docker MySQL + phpMyAdmin)

### المتطلبات
- Docker Desktop
- Node.js 18+

### الخطوات

**1. شغّل قاعدة البيانات:**
```bash
npm run docker:up
```

**2. شغّل الموقع والـ API معاً:**
```bash
npm run dev:full
```

**3. افتح:**
- الموقع: http://localhost:5173
- لوحة التحكم: http://localhost:5173/admin
- phpMyAdmin: http://localhost:8080
- بيانات الدخول: `admin` / `geheny2024`

**4. رفع الجداول/الأدمن (مرة واحدة):**
```bash
curl -X POST http://localhost:3001/api/setup -H "x-setup-secret: setup_local_2024"
```
ثم من لوحة التحكم اضغط **رفع البيانات الأولية**.

**إعادة تعيين قاعدة البيانات:**
```bash
npm run docker:reset
```

### ملاحظات
- محلياً: MySQL على `127.0.0.1:3306` عبر Docker
- على Vercel: استخدم `DATABASE_URL` (Neon) + `VITE_API_ENABLED=true`
- ملف `.env.local` محلي فقط ولا يُرفع على GitHub
