# TODO: Make Revenue Chart Dynamic

- [x] Add data properties for selectedPeriod and selectedYear in FinancialPage.vue
- [x] Update select elements in template to bind to selectedPeriod and selectedYear, and add multiple options (e.g., periods: Monthly, Weekly; years: 2023, 2024, 2025)
- [x] Modify calculateFromBookings method to filter bookings by selectedYear and group revenue data based on selectedPeriod (monthly or weekly aggregation)
- [x] Update labels for the chart dynamically (e.g., months for Monthly, weeks for Weekly)
- [x] Add watchers for selectedPeriod and selectedYear to trigger recalculation of data
- [x] Ensure chart updates by passing new revenueData and labels to LineChart component
- [ ] Test the functionality: change filters and verify chart updates, ensure real-time updates still work
