# تعليمات النشر على Netlify

## الخطوات المطلوبة:

### 1. إضافة Environment Variables على Netlify

اذهب إلى Netlify Dashboard > Site Settings > Environment Variables وأضف:

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
VITE_API_URL=https://your-app-name.netlify.app/.netlify/functions

# Firebase Admin SDK (مهم جداً لحذف المستخدمين من Authentication)
FIREBASE_PROJECT_ID=health-care-456db
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@health-care-456db.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/sNKDTNmGByUx\n0dRRfjIMozioQDnm8hDC4duYlXwhFok07wNk7NCGwAgs4SLcPsjFyXA/6W6WhrQS\nq9XtbOTilNB7/bJmZyw+JioONkiQ16snbIcYwWJMuNYJS5ojF6kWQYPsN0XtR9px\nj/Ft+Key86O1rDBAImq9WhVxk0ZQZ8FykIkgteTpiCosnbEquCcGRHBLPcap3wEu\nulwbO5js7WzbCgWqldDGoUoDVG1mTfNrEaXxFPjxoAOgjMUdkR6KaKK3EKU/2Qer\ntdqJV0K8CZpwfj1GAaOpJxEi/QIjRYgbwb4O0uZKmHCNMZkS5kfUPnnQiKzeIhX6\nlqze947fAgMBAAECggEANHJhtpDxNw1/bLkXWVCoyvJhjw87iGeUlG2NUpsbwkXT\nNotqp1Nv3l5uHjFfA1mePxdVQfdRTZf/bthbCMHxgdjrjfEkvYXfAgYZHZhWlGKd\nroSwFeLbTViJHzPzMUTI+5DjUl7xH/G337hdexQ8debZVNyOuw1vnO0nztJXu6me\nUKRRsWWfc40vnA7Qi9bG9k77nppOTXxmK7gB5pFIM1peFInC0p1XSNihUnl4ml17\nftz0dL+hg7frKolsoVHhSfxsytWAqeZm3lO6LSLyhbwJrJWw3xZdqJWkzAmf9Rnp\nyiBWKoR6NobJli4mQ1jutpDnEzTqAXi955TleCPjQQKBgQDpD4IKIlNImnmuxE8n\n7PCjk4YtYcqTqNstCASKf7xCUA8Khs6GTKm5Y1qlXxUIaEiY0FHvPjsJE6Y1ulBT\nlz8tUuYT7vVFhELuX+X62EWc3zl6N8HYdjEFrkK0dXhbiy7YALFIxqf8oenlK0yx\nVkQPPczI8RUaCfs1xkG+dA61/wKBgQDSjugHeJsMriHIPhVyvuyM++cUiDJMLV0J\nN4pLNdQh6FBzZC6ZrIdecQafdSL7dZp6iX7y6KVHowUkT61fKw32BAuw5l6uw6M4\n/q3uJ/raPCV/BqWsMx86yNUuIA5dxXLGmwqDxmx9mLwFMZ0ACxx87KARTD3yQBbW\nYJQxFyfnIQKBgECIpcZumMca1yTYgN6aUkvJFrdMQ869S+tdM/yxwAxQpMmSaG9x\nnPGTnE78VBOe5LNDw9xOTASIZ1arP4DV+Y1wTfspCMt2Ax6EeWcLKcN1YDICbG+m\n0o4zIY9ck7YthQwUrQJs16kxoFVvtu3H6FKcFy9w6hnqt5+9RQkak9Q7AoGBAIgr\nMTU7sxIVPvWv6NEHVhWrBvtJRTXslGFUkNQo4KJ5CiZF4LkzUWwrLjxLVa9Hk/qx\nFu9isxjL/ZRJDvcf8exrG2Bw60Scct92HOeK5XjjMuCeXOArQ4QRw4QL6R6NhbeZ\nJsintxvWfaniNwWDKg5EPRRSuTEEb4B+fvfsYLrhAoGBAMV/WHjIDeFC9xfXXzYK\n60uOMeMvJzTmFEe6SL+plxADgd682yq8VqZNCtiRXosFKQdCFZybY+da5Xr+k9g9\nYO4cWtwlkGo3DOybTzhL61ev5J1gNnusqXmY9SAuRGyV9abUUqH4qlTuX090lddw\n2lk+xAD8RVbyHNwdiTLxOcuo\n-----END PRIVATE KEY-----\n"
```

⚠️ **مهم جداً**: عند إضافة `FIREBASE_PRIVATE_KEY` على Netlify، تأكد من:

- نسخ القيمة كاملة مع علامات التنصيص
- الـ `\n` لازم تكون موجودة في النص (مش أسطر حقيقية)

### 2. تحديث ملف .env المحلي

في ملف `.env` المحلي، غير:

```
VITE_API_URL=https://your-app-name.netlify.app/.netlify/functions
```

استبدل `your-app-name` باسم موقعك على Netlify.

### 3. إعادة النشر

بعد إضافة Environment Variables، قم بإعادة نشر الموقع على Netlify.

## ملاحظات:

- الـ Netlify Functions موجودة في: `netlify/functions/`
  - `create-checkout-session.js` - للدفع
  - `create-payment-intent.js` - للدفع
  - `delete-auth-user.js` - لحذف المستخدمين من Firebase Authentication
- الـ URL الخاص بالـ functions سيكون: `https://your-app-name.netlify.app/.netlify/functions/function-name`
- تأكد من إضافة جميع Environment Variables في Netlify
- للتطوير المحلي، استخدم: `VITE_API_URL=http://localhost:4242`

## حل مشكلة حذف المستخدمين:

إذا كان حذف الدكتور أو المريض لا يحذف الإيميل من Firebase Authentication بعد الـ deployment:

1. تأكد من إضافة الـ Firebase credentials في Netlify Environment Variables
2. تأكد من إعادة deploy الموقع بعد إضافة الـ variables
3. تحقق من الـ Netlify Function logs للتأكد من عدم وجود أخطاء
