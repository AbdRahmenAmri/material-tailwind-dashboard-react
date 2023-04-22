const base_uri = `https://bms.pythonanywhere.com`;

const API = {
  /* --------------- AUTH API ---------------------- */
  register: `${base_uri}/api/v1/auth/register`,
  confirmEmail: `${base_uri}/api/v1/auth/confirm-email/`,
  login: `${base_uri}/api/v1/auth/login`,
  resetPasswordRequest: `${base_uri}/api/v1/auth/reset-password-request`,
  confirmResetPasswordToken: `${base_uri}/api/v1/auth/reset-password/`,
  resetPasswordPost: `${base_uri}/api/v1/auth/reset-password/`,
  logout: `${base_uri}/api/v1/auth/logout`,
  isAdmin: `${base_uri}/api/v1/auth/is-admin`,

  /* -------------- ADMIN API ----------------------- */
  monthlyEarn: `${base_uri}/api/v1/admin/payments/monthly`,
  yearlyEarn: `${base_uri}/api/v1/admin/payments/yearly`,
  yearlyUser: `https://bms.pythonanywhere.com/api/v1/admin/users/monthly`,
  dailyUser: `${base_uri}/api/v1/admin/users/daily`,
  
  /* ---------------- USER API ---------------------- */
  userInfo: `${base_uri}/api/v1/user/user-info`,
  generateApiKey: `${base_uri}/api/v1/user/generate/apikey`,
  updateUser: `${base_uri}/api/v1/user/update`,
  currentSubscription: `${base_uri}/api/v1/user/current-subscription`,

  /* ---------------- USER API ---------------------- */
  createPlan: `${base_uri}/api/v1/plans/create`,
  getActivePlan: `${base_uri}/api/v1/plans/`,
  getAllPlan: `${base_uri}/api/v1/plans/all`,
  updatePlan: `${base_uri}/api/v1/plans/update/`,

  /* ----------------- Payment API ------------------ */
  createPaymet: `${base_uri}/api/v1/payment/`,
  executePayment: `${base_uri}/api/v1/payment/execute`,
  paymentsHistory: `${base_uri}/api/v1/user/payments/history`,
  
};

export {
    API,
}
