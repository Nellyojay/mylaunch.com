export const formatPhoneEA = (phone: string | undefined) => {
  if (!phone) return "";

  // remove spaces and dashes
  phone = phone.replace(/\s+/g, "").replace(/-/g, "");

  // remove +
  if (phone.startsWith("+")) {
    phone = phone.slice(1);
  }

  // Uganda numbers starting with 0
  if (phone.startsWith("0") && phone.length === 10) {
    return "256" + phone.slice(1);
  }

  // numbers starting without country code
  if (phone.length === 9) {
    return "256" + phone;
  }

  return phone;
};