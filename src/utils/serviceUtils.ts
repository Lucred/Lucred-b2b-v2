export const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    } else {
        return str;
    }
};

export const formatAmount = (amount: number | string | null, decimalPlaces: number = 2) => {
    // Check if the input is a valid number
    if (isNaN(Number(amount)) || amount === null) {
        return 'Invalid input';
    }

    // Convert the amount to a fixed number of decimal places
    const fixedAmount: string = parseFloat(amount as string).toFixed(decimalPlaces);

    // Add commas for thousands
    const parts: string[] = fixedAmount.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the parts back together
    return parts.join('.');
};