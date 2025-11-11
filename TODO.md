# TODO: Fix Doughnut Chart in Financial Page

## Steps Completed

1. **Update FinancialPage.vue**:

   - Modified `calculateFromBookings` method to count "confirmed" instead of "pending" for active bookings.
   - Updated status counting logic: completed, confirmed, cancelled.
   - Changed props passed to `<donghut-chart>`: `:completed`, `:confirmed`, `:cancelled`.
   - Ensured realtime updates trigger recalculation.

2. **Update DonghutChart.vue**:

   - Changed prop from `pending` to `confirmed` (type Number, default 0).
   - Updated chart labels to ["Completed", "Confirmed", "Cancelled"].
   - Updated legend text: Changed "Waiting approval: {{ pending }}" to "Confirmed: {{ confirmed }}".
   - Updated `createChart` and `updateChart` methods: Used `this.confirmed` in data array at index 1.
   - Removed hardcoded fallbacks (70, 10, 20) to show true 0s if no data.

3. **Test Changes**:
   - Restart dev server if needed.
   - Verify chart updates dynamically with sample bookings in Firebase.
   - Check console logs for booking data and status matching.
