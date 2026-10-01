import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../services/EmailService.js";
import User from "../models/UserModel.js";
import Tenant from "../models/TenantModel.js";


// Register User
export const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            tenantId,
            storeName,
            slug,
            subdomain
        } = req.body;

        // Required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email and password."
            });
        }

        // Only customer and seller can register publicly
        const userRole = role || "customer";

        if (!["customer", "seller"].includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to register with this role."
            });
        }

        // Seller store details validation
        if (userRole === "seller") {
            if (!storeName || !slug || !subdomain) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Seller must provide store name, slug and subdomain."
                });
            }
        }

        // Customer tenant validation
        if (userRole === "customer") {
            if (!tenantId) {
                return res.status(400).json({
                    success: false,
                    message: "Tenant ID is required for customer registration."
                });
            }

            const tenant = await Tenant.findOne({
                _id: tenantId,
                isActive: true
            });

            if (!tenant) {
                return res.status(404).json({
                    success: false,
                    message: "Active tenant not found."
                });
            }
        }

        // Strong password validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters."
            });
        }

        const hasUppercase = [...password].some(
            (char) => char >= "A" && char <= "Z"
        );

        const hasLowercase = [...password].some(
            (char) => char >= "a" && char <= "z"
        );

        const hasNumber = [...password].some(
            (char) => char >= "0" && char <= "9"
        );

        const specialCharacters = "@$!%*?&";

        const hasSpecialCharacter = [...password].some(
            (char) => specialCharacters.includes(char)
        );

        if (!hasUppercase) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one uppercase letter."
            });
        }

        if (!hasLowercase) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one lowercase letter."
            });
        }

        if (!hasNumber) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one number."
            });
        }

        if (!hasSpecialCharacter) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one special character."
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        // If seller, check tenant slug/subdomain
        if (userRole === "seller") {
            const existingTenant = await Tenant.findOne({
                $or: [
                    {
                        slug: slug.toLowerCase()
                    },
                    {
                        subdomain: subdomain.toLowerCase()
                    }
                ]
            });

            if (existingTenant) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Store slug or subdomain already exists."
                });
            }
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashPassword,
            role: userRole,

            // Customer gets selected tenant
            // Seller gets tenant after tenant creation
            tenantId: userRole === "customer" ? tenantId : null
        });

        // Seller -> Create Tenant automatically
        if (userRole === "seller") {
            try {
                const newTenant = await Tenant.create({
                    name: storeName,
                    slug: slug.toLowerCase(),
                    subdomain: subdomain.toLowerCase(),

                    // Seller becomes tenant owner
                    owner: newUser._id,

                    settings: {
                        storeName: storeName,
                        currency: "INR",
                        contactEmail: email.toLowerCase()
                    },

                    // Seller needs Super Admin approval
                    isActive: false
                });

                // Assign generated Tenant ID to seller
                newUser.tenantId = newTenant._id;

                await newUser.save();

                // Remove password from response
                const userResponse = newUser.toObject();
                delete userResponse.password;

                return res.status(201).json({
                    success: true,
                    message:
                        "Seller registered successfully. Your store is waiting for admin approval.",
                    user: userResponse,
                    tenant: newTenant
                });

            } catch (tenantError) {
                // If tenant creation fails, remove created user
                await User.findByIdAndDelete(newUser._id);

                throw tenantError;
            }
        }

        // Customer registration
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: userResponse
        });

    } catch (error) {
        console.error("REGISTER USER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Check user active status
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive."
            });
        }

        // Compare password
        const isValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Seller tenant approval check
        if (user.role === "seller" && user.tenantId) {
            const tenant = await Tenant.findById(user.tenantId);

            if (!tenant) {
                return res.status(403).json({
                    success: false,
                    message: "Tenant not found."
                });
            }

            if (!tenant.isActive) {
                return res.status(403).json({
                    success: false,
                    message:
                        "Your store is waiting for admin approval."
                });
            }
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                tenantId: user.tenantId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Remove password
        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            user: userResponse,
            token
        });

    } catch (error) {
        console.error("LOGIN USER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide your email."
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        // Security: don't reveal whether email exists
        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, a password reset link has been sent."
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Save token and expiry (15 minutes)
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(
            Date.now() + 15 * 60 * 1000
        );

        await user.save();

        // Frontend reset password URL
        const resetUrl =
            `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        // Send email
        await sendEmail({
            to: user.email,
            subject: "Reset Your Password - E-Commerce SaaS",
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Password Reset Request</h2>

                    <p>Hello ${user.name},</p>

                    <p>
                        We received a request to reset your password.
                    </p>

                    <p>
                        Click the button below to create a new password:
                    </p>

                    <a
                        href="${resetUrl}"
                        style="
                            display:inline-block;
                            padding:12px 20px;
                            background:#2563eb;
                            color:white;
                            text-decoration:none;
                            border-radius:6px;
                        "
                    >
                        Reset Password
                    </a>

                    <p>
                        This link will expire in 15 minutes.
                    </p>

                    <p>
                        If you did not request this, you can safely ignore this email.
                    </p>

                    <p>
                        Regards,<br>
                        E-Commerce SaaS Team
                    </p>
                </div>
            `
        });

        return res.status(200).json({
            success: true,
            message:
                "If an account exists with this email, a password reset link has been sent."
        });

    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Reset token is required."
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please provide a new password."
            });
        }

        // Same password validation as registration
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters."
            });
        }

        const hasUppercase = [...password].some(
            (char) => char >= "A" && char <= "Z"
        );

        const hasLowercase = [...password].some(
            (char) => char >= "a" && char <= "z"
        );

        const hasNumber = [...password].some(
            (char) => char >= "0" && char <= "9"
        );

        const specialCharacters = "@$!%*?&";

        const hasSpecialCharacter = [...password].some(
            (char) => specialCharacters.includes(char)
        );

        if (!hasUppercase) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one uppercase letter."
            });
        }

        if (!hasLowercase) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one lowercase letter."
            });
        }

        if (!hasNumber) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one number."
            });
        }

        if (!hasSpecialCharacter) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one special character."
            });
        }

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token."
            });
        }

        // Hash new password
        const hashPassword = await bcrypt.hash(password, 10);

        user.password = hashPassword;

        // Clear reset token
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully. You can now login."
        });

    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
};

// Get all users - Super Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .populate("tenantId", "name slug subdomain isActive");

        return res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        console.error("GET ALL USERS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get single user by ID - Super Admin
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .select("-password")
            .populate("tenantId", "name slug subdomain isActive");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error("GET USER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get logged-in user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password")
            .populate("tenantId", "name slug subdomain isActive");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully.",
            user
        });

    } catch (error) {
        console.error("GET ME ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};