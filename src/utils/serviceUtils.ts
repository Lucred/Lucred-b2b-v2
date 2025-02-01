export const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
};

export const formatAmount = (
  amount: number | string | null,
  decimalPlaces = 2
) => {
  // Check if the input is a valid number
  if (isNaN(Number(amount)) || amount === null) {
    return "";
  }

  // Convert the amount to a fixed number of decimal places
  const fixedAmount: string = parseFloat(amount as string).toFixed(
    decimalPlaces
  );

  // Add commas for thousands
  const parts: string[] = fixedAmount.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the parts back together
  return "₦" + parts.join(".");
};

export const numberWithCommas = (x: string | number | null): string => {
  if (x == null) return "";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatDate = (dateString: string, format: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};
