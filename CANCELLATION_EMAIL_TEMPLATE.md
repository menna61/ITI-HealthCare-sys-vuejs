# إعداد Template إلغاء الموعد في EmailJS

## معلومات الـ Template

يمكنك استخدام نفس الـ template (`template_u4nyr74`) أو إنشاء template جديد للإلغاء.

## المتغيرات المطلوبة في الـ Template

يجب أن يحتوي الـ template على المتغيرات التالية:

```
{{to_email}}              - إيميل المريض
{{patient_name}}          - اسم المريض
{{doctor_name}}           - اسم الدكتور
{{appointment_date}}      - تاريخ الموعد (YYYY-MM-DD)
{{appointment_time}}      - وقت الموعد (HH:MM)
{{refund_amount}}         - مبلغ الاسترجاع بالدولار
{{cancellation_reason}}   - سبب الإلغاء
```

## مثال على محتوى الإيميل

### Subject (العنوان):
```
إلغاء موعد مع د. {{doctor_name}}
```

أو بالإنجليزية:
```
Appointment Cancellation with Dr. {{doctor_name}}
```

### Body (المحتوى):

#### النسخة العربية:
```html
<div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #dc2626; margin: 0;">⚠️ إلغاء موعد</h1>
    </div>

    <p style="font-size: 16px; color: #333; line-height: 1.6;">
      مرحباً <strong>{{patient_name}}</strong>،
    </p>

    <p style="font-size: 16px; color: #333; line-height: 1.6;">
      نأسف لإبلاغك بأنه تم إلغاء موعدك الطبي.
    </p>

    <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #dc2626;">
      <h3 style="color: #dc2626; margin-top: 0;">تفاصيل الموعد الملغي:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>الدكتور:</strong></td>
          <td style="padding: 8px 0; color: #333;">{{doctor_name}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>التاريخ:</strong></td>
          <td style="padding: 8px 0; color: #333;">{{appointment_date}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>الوقت:</strong></td>
          <td style="padding: 8px 0; color: #333;">{{appointment_time}}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #16a34a;">
      <h3 style="color: #16a34a; margin-top: 0;">💰 معلومات الاسترجاع:</h3>
      <p style="font-size: 18px; color: #333; margin: 10px 0;">
        تم إرجاع مبلغ <strong style="color: #16a34a; font-size: 24px;">${{refund_amount}}</strong> إلى محفظتك.
      </p>
    </div>

    <div style="background-color: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e;">
        <strong>سبب الإلغاء:</strong><br>
        {{cancellation_reason}}
      </p>
    </div>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">
      نعتذر عن أي إزعاج قد يسببه هذا الإلغاء. يمكنك حجز موعد جديد في أي وقت من خلال منصتنا.
    </p>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
        شكراً لتفهمك
      </p>
      <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
        فريق الرعاية الصحية
      </p>
    </div>

  </div>
</div>
```

#### النسخة الإنجليزية:
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #dc2626; margin: 0;">⚠️ Appointment Cancelled</h1>
    </div>

    <p style="font-size: 16px; color: #333; line-height: 1.6;">
      Hello <strong>{{patient_name}}</strong>,
    </p>

    <p style="font-size: 16px; color: #333; line-height: 1.6;">
      We regret to inform you that your medical appointment has been cancelled.
    </p>

    <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
      <h3 style="color: #dc2626; margin-top: 0;">Cancelled Appointment Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 120px;"><strong>Doctor:</strong></td>
          <td style="padding: 8px 0; color: #333;">{{doctor_name}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Date:</strong></td>
          <td style="padding: 8px 0; color: #333;">{{appointment_date}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Time:</strong></td>
          <td style="padding: 8px 0; color: #333;">{{appointment_time}}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
      <h3 style="color: #16a34a; margin-top: 0;">💰 Refund Information:</h3>
      <p style="font-size: 18px; color: #333; margin: 10px 0;">
        An amount of <strong style="color: #16a34a; font-size: 24px;">${{refund_amount}}</strong> has been refunded to your wallet.
      </p>
    </div>

    <div style="background-color: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e;">
        <strong>Cancellation Reason:</strong><br>
        {{cancellation_reason}}
      </p>
    </div>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">
      We apologize for any inconvenience this may cause. You can book a new appointment anytime through our platform.
    </p>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
        Thank you for your understanding
      </p>
      <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
        Healthcare Team
      </p>
    </div>

  </div>
</div>
```

## متى يتم إرسال هذا الإيميل؟

### 1. إلغاء من المريض:
- عندما يلغي المريض الموعد من صفحة "My Appointments"
- يتم حساب مبلغ الاسترجاع حسب سياسة الاسترجاع
- السبب: "Cancelled by patient"

### 2. حذف الدكتور من الأدمن:
- عندما يحذف الأدمن الدكتور من النظام
- يتم إلغاء جميع مواعيد الدكتور تلقائياً
- يتم إرجاع المبلغ كاملاً (100%)
- السبب: "Doctor removed from platform. Reason: [سبب الحذف من الأدمن]"

## خطوات الإعداد في EmailJS:

1. سجل دخول إلى [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. اختر Service الخاص بك (`service_7jd6hf9`)
3. اذهب إلى Email Templates
4. اختر Template (`template_u4nyr74`) أو أنشئ واحد جديد
5. انسخ والصق المحتوى أعلاه في Template Editor
6. تأكد من إضافة جميع المتغيرات المطلوبة
7. احفظ الـ Template
8. اختبر الإيميل باستخدام Test Email

## ملاحظات مهمة:

- يمكنك استخدام نفس الـ template للتأكيد والإلغاء بإضافة شرط في الـ template
- أو إنشاء template منفصل للإلغاء وتحديث `VITE_EMAILJS_CANCELLATION_TEMPLATE_ID` في `.env`
- تأكد من أن جميع المتغيرات موجودة في الـ template
- يمكنك تخصيص التصميم حسب رغبتك
