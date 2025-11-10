# TODO: Remove Phone Number Verification from Patient and Doctor Signup

## Steps to Complete

- [x] Remove phone number verification logic from PatientSignup.vue

  - Remove checkPhoneNumber method
  - Remove phoneNumberError and checkingPhone data properties
  - Remove checkPhoneNumber call in handleCreateAccountClick
  - Remove UI elements for checking and error messages related to phone verification

- [x] Remove phone number verification logic from DoctorSignup.vue

  - Remove checkPhoneNumber method
  - Remove phoneNumberError and checkingPhone data properties
  - Remove @blur="checkPhoneNumber" from phone input
  - Remove checkPhoneNumber call in nextStep
  - Remove UI elements for checking and error messages related to phone verification

- [ ] Test the signup forms to ensure phone number input still works without verification
