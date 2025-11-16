# تعليمات النشر على Netlify

## الخطوات المطلوبة:

### 1. إضافة Environment Variables على Netlify

اذهب إلى Netlify Dashboard > Site Settings > Environment Variables وأضف:

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
VITE_API_URL=https://your-app-name.netlify.app/.netlify/functions
```

### 2. تحديث ملف .env المحلي

في ملف `.env` المحلي، غير:

```
VITE_API_URL=https://your-app-name.netlify.app/.netlify/functions
```

استبدل `your-app-name` باسم موقعك على Netlify.

### 3. إعادة النشر

بعد إضافة Environment Variables، قم بإعادة نشر الموقع على Netlify.

## ملاحظات:

- الـ Netlify Function موجودة في: `netlify/functions/create-checkout-session.js`
- الـ URL الخاص بالـ function سيكون: `https://your-app-name.netlify.app/.netlify/functions/create-checkout-session`
- تأكد من إضافة STRIPE_SECRET_KEY في Netlify Environment Variables
- للتطوير المحلي، استخدم: `VITE_API_URL=http://localhost:4242`
