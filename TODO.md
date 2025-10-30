# Notification System Implementation

## Tasks

- [x] Update NavBar.vue to use real-time Firestore listener (onSnapshot) for notifications
- [x] Implement logic to mark notifications as read when popup opens
- [x] Ensure red badge updates dynamically based on unread count
- [x] Test the notification flow: Admin approves doctor -> Notification added -> Doctor sees badge -> Opens popup -> Badge disappears
- [x] Add console logs for debugging notification issues
- [x] Fix auth timing issue by using onAuthStateChanged listener

## Notes

- Admin approval logic already exists in AdminHome.vue (approveItem method adds notification)
- Focus on doctor notifications for now
- Use Options API in Vue.js
- Added testNotification method for manual testing by clicking the bell icon
- Notifications should now appear for doctors after admin approval

# Booking System Fix

## Tasks

- [ ] Modify getAvailableSlotsForDay in DoctorsPage.vue to fetch existing bookings and filter out booked slots
- [ ] Add validation in confirmBooking to prevent double booking
- [ ] Test booking flow: Book a slot, verify it disappears for other users, prevent double booking
- [ ] Ensure bookings are checked for the specific doctor, date, and time
