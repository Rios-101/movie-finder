export const errorMessages = (error: any) => {
    if (error?.response?.data?.message) {
        if (typeof error?.response?.data?.message === "string") {
            return error?.response?.data?.message;
        } else {
            return error?.response?.data?.message[0];
        }
    } else if (error?.response?.data?.error) {
        if (typeof error?.response?.data?.error === "string") {
            return error?.response?.data?.error;
        } else {
            return error?.response?.data?.error[0];
        }
    } else if (error?.response?.data?.errors) {
        if (typeof error?.response?.data?.errors === "string") {
            return error?.response?.data?.errors;
        } else {
            return error?.response?.data?.errors[0];
        }
    }
    return "Something went wrong";
};

type voidFn = () => void;
let resetState: voidFn = () => { };

export const APICall = async (
    fn: (...args: any) => Promise<any>,
    args?: any,
    showSuccessToast: boolean = true,
    showLoadingBar: boolean = false
) => {
    try {
        // showLoadingBar && loadingBarRef.current?.continuousStart();
        const response =
            args &&
                typeof args[Symbol.iterator] === "function" &&
                !(typeof args == "string")
                ? await fn(...args)
                : await fn(args);
        // if (showSuccessToast) toast(response.data.message, { type: "success" });
        // showLoadingBar && loadingBarRef.current?.complete();
        return response;
    } catch (error: any) {
        if (error.response) {
            //   if (showSuccessToast) toast(errorMessages(error), { type: "error" });

            if (error.response.status === 401) {
                resetState();
            }
        }
        // showLoadingBar && loadingBarRef.current?.complete();
        throw error;
    }
};

export function getYearFromDate(dateString: string): string {
    if (!dateString) return "";

    // Split by hyphen and take the first part
    const [year] = dateString.split("-");
    return year;
}

/**
 * Converts minutes to a formatted string in hours and minutes.
 * @param minutes The total minutes to convert.
 * @returns A string like "2h 10m"
 */
export function convertMinutesToHoursMinutes(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hrsPart = hrs > 0 ? `${hrs}h` : "";
    const minsPart = mins > 0 ? `${mins}m` : "";
    return [hrsPart, minsPart].filter(Boolean).join(" ");
}

export function formatDateLong(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function formatToMillionUSD(amount: number): string {
    if (isNaN(amount) || amount <= 0) return "$0";

    if (amount >= 1_000_000) {
        const millions = amount / 1_000_000;
        const formatted = millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1);
        return `$${formatted} million`;
    }

    if (amount >= 1_000) {
        const thousands = amount / 1_000;
        const formatted = thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1);
        return `$${formatted}k`;
    }

    return `$${amount}`;
}

