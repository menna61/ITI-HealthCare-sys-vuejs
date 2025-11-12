# إعداد حذف المستخدمين من Firebase Authentication

## الخطوات المطلوبة:

### 1. الحصول على Service Account Key من Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروعك: `health-care-456db`
3. اذهب إلى **Project Settings** (⚙️ أيقونة الإعدادات)
4. اختر تبويب **Service Accounts**
5. اضغط على **Generate New Private Key**
6. سيتم تحميل ملف JSON

### 2. تحديث ملف .env

افتح الملف `.env` في جذر المشروع وضع القيم التالية من ملف JSON الذي حملته:

```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@health-care-456db.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

**ملاحظات مهمة:**
- انسخ قيمة `client_email` من ملف JSON وضعها في `FIREBASE_CLIENT_EMAIL`
- انسخ قيمة `private_key` من ملف JSON وضعها في `FIREBASE_PRIVATE_KEY`
- تأكد من وضع الـ private key بين علامات التنصيص المزدوجة
- احتفظ بـ `\n` في الـ private key كما هي

### 3. تشغيل السيرفر

```bash
npm run server
```

السيرفر سيعمل على: `http://localhost:4242`

### 4. اختبار الحذف

1. شغل التطبيق: `npm run dev`
2. سجل دخول كأدمن
3. اذهب إلى صفحة المستخدمين
4. احذف مستخدم
5. تحقق من أن المستخدم تم حذفه من:
   - Firestore Database ✅
   - Firebase Authentication ✅

## ملاحظات الأمان

⚠️ **مهم جداً:**
- لا تشارك ملف `.env` أو الـ Service Account Key مع أي شخص
- أضف `.env` إلى `.gitignore` (موجود بالفعل)
- لا ترفع الـ credentials على GitHub أو أي مكان عام

## استكشاف الأخطاء

إذا ظهرت أخطاء:

1. **Error: Missing uid**
   - تأكد من أن المستخدم له `authUid` في Firestore

2. **Error: Failed to delete user from Authentication**
   - تحقق من صحة الـ credentials في `.env`
   - تأكد من أن السيرفر يعمل على port 4242

3. **CORS Error**
   - تأكد من أن السيرفر يعمل
   - تحقق من أن CORS مفعل في `server.js`
