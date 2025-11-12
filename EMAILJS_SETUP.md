# إعداد EmailJS للإيميلات

## المعلومات المطلوبة
تم إضافة بيانات EmailJS في ملف `.env`:
- Service ID: `service_7jd6hf9`
- Template ID للتأكيد: `template_u4nyr74`
- Template ID للإلغاء: `template_u4nyr74` (نفس الـ template)
- Public Key: `yXN5soDjbM2S3Nkb1`

## إعداد Templates في EmailJS

### 1. Template تأكيد موعد Telemedicine

يجب أن يحتوي الـ template على المتغيرات التالية:

#### Template Variables:
- `{{to_email}}` - إيميل المريض
- `{{patient_name}}` - اسم المريض
- `{{doctor_name}}` - اسم الدكتور
- `{{appointment_date}}` - تاريخ الموعد
- `{{appointment_time}}` - وقت الموعد
- `{{session_link}}` - رابط جلسة Telemedicine

#### مثال على محتوى الإيميل:

**Subject:** تأكيد موعد Telemedicine مع {{doctor_name}}

**Body:**
```
مرحباً {{patient_name}}،

تم تأكيد موعدك بنجاح!

تفاصيل الموعد:
- الدكتور: {{doctor_name}}
- التاريخ: {{appointment_date}}
- الوقت: {{appointment_time}}
- نوع الخدمة: Telemedicine

للانضمام إلى الجلسة، استخدم الرابط التالي:
{{session_link}}

ملاحظة: يمكنك الانضمام إلى الجلسة في الوقت المحدد للموعد.

شكراً لاستخدامك خدماتنا!
```

### 2. Template إلغاء الموعد

يجب أن يحتوي الـ template على المتغيرات التالية:

#### Template Variables:
- `{{to_email}}` - إيميل المريض
- `{{patient_name}}` - اسم المريض
- `{{doctor_name}}` - اسم الدكتور
- `{{appointment_date}}` - تاريخ الموعد
- `{{appointment_time}}` - وقت الموعد
- `{{refund_amount}}` - مبلغ الاسترجاع
- `{{cancellation_reason}}` - سبب الإلغاء

#### مثال على محتوى الإيميل:

**Subject:** إلغاء موعد مع {{doctor_name}}

**Body:**
```
مرحباً {{patient_name}}،

نأسف لإبلاغك بأنه تم إلغاء موعدك.

تفاصيل الموعد الملغي:
- الدكتور: {{doctor_name}}
- التاريخ: {{appointment_date}}
- الوقت: {{appointment_time}}

سبب الإلغاء: {{cancellation_reason}}

تم إرجاع مبلغ ${{refund_amount}} إلى محفظتك.

نعتذر عن أي إزعاج قد يسببه هذا.

شكراً لتفهمك!
```

## كيفية العمل

### 1. عند حجز موعد telemedicine:
1. يتم حفظ الحجز في Firebase بعد الدفع الناجح
2. يتم إرسال إيميل تأكيد للمريض يحتوي على:
   - تفاصيل الموعد
   - رابط جلسة Telemedicine

### 2. عند إلغاء الموعد:
يتم إرسال إيميل إلغاء في الحالات التالية:

#### أ. إلغاء من المريض:
1. المريض يلغي الموعد من صفحة المواعيد
2. يتم حساب مبلغ الاسترجاع حسب سياسة الاسترجاع
3. يتم إرسال إيميل للمريض بتفاصيل الإلغاء والمبلغ المسترجع

#### ب. حذف الدكتور من الأدمن:
1. الأدمن يحذف الدكتور من النظام
2. يتم إلغاء جميع مواعيد الدكتور تلقائياً
3. يتم إرجاع المبلغ كاملاً لكل مريض
4. يتم إرسال إيميل لكل مريض بتفاصيل الإلغاء والسبب

## الملفات المعدلة

1. `.env` - إضافة بيانات EmailJS
2. `src/utils/emailService.js` - دوال إرسال الإيميلات (تأكيد وإلغاء)
3. `src/Components/Pages/PatientFlow/PatientAppointments.vue` - إرسال إيميل عند الحجز والإلغاء
4. `src/Components/Pages/AdminFlow/AllDoctorsPage.vue` - إرسال إيميل للمرضى عند حذف الدكتور
