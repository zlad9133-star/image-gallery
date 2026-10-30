# Lenscape — معرض صور

**المعاينة المباشرة:** https://zlad9133-star.github.io/image-gallery/


تطبيق React/Vite لعرض صور Unsplash، مع البحث، عرض الصورة بالحجم الكبير، وحفظ المفضلة محلياً في المتصفح.

## المميزات
- البحث عن الصور
- عرض الصورة بالحجم الكامل (Lightbox) مع الإغلاق بزر Esc
- حفظ المفضلة في المتصفح (localStorage)
- تصميم متجاوب مع كل الشاشات
- وضع تجريبي يعمل بدون مفتاح API (صور Picsum)

## التقنيات
React 19 · Vite · Axios · React Icons · GitHub Actions

## التشغيل

1. انسخ `.env.example` إلى ملف جديد باسم `.env`.
2. أنشئ مفتاح Access Key من [Unsplash Developers](https://unsplash.com/developers) وضعه في `VITE_UNSPLASH_ACCESS_KEY`.
3. ثبّت الاعتمادات وشغّل التطبيق:

```bash
npm install
npm run dev
```

## أوامر التسليم

```bash
npm run lint
npm run build
npm run preview
```

لا ترفع ملف `.env` إلى المستودع؛ يحتوي على مفتاح API الخاص بك.

## النشر
يتم النشر تلقائياً على GitHub Pages عبر GitHub Actions عند كل push على `main`. لتفعيل صور Unsplash في النسخة المنشورة، أضف المفتاح كـ Secret باسم `VITE_UNSPLASH_ACCESS_KEY` في إعدادات المستودع.
