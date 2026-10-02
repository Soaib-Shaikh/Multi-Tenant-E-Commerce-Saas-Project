import Razorpay from "razorpay";
import "dotenv/config";

const razorpay = new Proxy({}, {
    get(_target, property) {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            throw new Error("Payments are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in the backend environment.");
        }
        const client = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        return client[property];
    }
});

export default razorpay;
