# TODO: Fix Patient Email Fetching for Cancellation Emails

## Tasks

- [x] Modify mail.js: Import Firebase DB, change sendCancellationEmail to accept patientId, fetch patient email from 'patients' collection, and use it for sending.
- [x] Update server.js: Change /send-cancellation-email endpoint to accept patientId instead of 'to'.
- [x] Update DoctorAppointments.vue: Pass patientId instead of patientEmail in the fetch call to the endpoint.
