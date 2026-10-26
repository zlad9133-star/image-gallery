# Lenscape — معرض صور

تطبيق React/Vite لعرض صور Unsplash، مع البحث، عرض الصورة بالحجم الكبير، وحفظ المفضلة محلياً في المتصفح.

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
