# TODO: Fix Appointment Issues

## Issues to Fix:

1. Appointment card repeated in calendar - Ensure unique appointments in CalenDar.vue
2. Cancel button fails but wallet increases - Add refund to patient cancel in PatientAppointments.vue, standardize status to "cancelled"
3. Calendar booking card shows "Patient" instead of actual name - Fetch proper patient names in CalenDar.vue, DoctorsPage.vue

## Steps:

- [x] Update PatientAppointments.vue: Change status to "cancelled", add refund logic
- [x] Update CalenDar.vue: Fetch patient names from patients collection, ensure unique appointments, change status to "cancelled"
- [x] Update DoctorsPage.vue: Fetch patient name from patients collection in confirmBooking
- [x] Update DoctorAppointments.vue: Add refund logic to cancelAppointment
- [x] Test cancellations, wallet updates, and patient names in calendar

# TODO: Add Red Dots on Calendar Days with Appointments

## Steps:

- [x] Modify updateCalendarEvents() in CalenDar.vue to collect unique appointment dates excluding today and create background events with className 'red-dot-event'
- [x] Add CSS in <style scoped> for .red-dot-event to display a small red dot on the calendar day
- [x] Test the calendar to ensure red dots appear on days with appointments (excluding today)
