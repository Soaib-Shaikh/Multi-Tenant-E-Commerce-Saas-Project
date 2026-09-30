import Tenant from "../models/TenantModel.js";
import User from "../models/UserModel.js";

// Create Tenant - Super Admin
export const createTenant = async (req, res) => {
  try {
    const {
      name,
      slug,
      subdomain,
      owner,
      settings
    } = req.body;

    if (!name || !slug || !subdomain || !owner) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields."
      });
    }

    const existingTenant = await Tenant.findOne({
      $or: [{ slug }, { subdomain }]
    });

    if (existingTenant) {
      return res.status(400).json({
        success: false,
        message: "Tenant with this slug or subdomain already exists."
      });
    }

    const seller = await User.findById(owner);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Owner user not found."
      });
    }

    if (seller.role !== "seller") {
      return res.status(400).json({
        success: false,
        message: "Tenant owner must be a seller."
      });
    }

    if (seller.tenantId) {
      return res.status(400).json({
        success: false,
        message: "This seller is already assigned to a tenant."
      });
    }

    const newTenant = await Tenant.create({
      name,
      slug,
      subdomain,
      owner,
      settings,
      isActive: true
    });

    seller.tenantId = newTenant._id;
    await seller.save();

    return res.status(201).json({
      success: true,
      message: "Tenant created successfully.",
      tenant: newTenant
    });
  } catch (error) {
    console.error("CREATE TENANT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get All Tenants - Super Admin
export const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate("owner", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      tenants
    });
  } catch (error) {
    console.error("GET ALL TENANTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get Tenant By ID
export const getTenantById = async (req, res) => {
  try {
    const { id } = req.params;

    const tenant = await Tenant.findById(id)
      .populate("owner", "name email role");

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tenant fetched successfully.",
      tenant
    });
  } catch (error) {
    console.error("GET TENANT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Approve Tenant - Super Admin
export const approveTenant = async (req, res) => {
  try {
    const { id } = req.params;

    const tenant = await Tenant.findById(id);

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found."
      });
    }

    tenant.isActive = true;
    await tenant.save();

    return res.status(200).json({
      success: true,
      message: "Tenant approved successfully.",
      tenant
    });
  } catch (error) {
    console.error("APPROVE TENANT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Reject Tenant - Super Admin
export const rejectTenant = async (req, res) => {
  try {
    const { id } = req.params;

    const tenant = await Tenant.findById(id);

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found."
      });
    }

    tenant.isActive = false;
    await tenant.save();

    return res.status(200).json({
      success: true,
      message: "Tenant rejected successfully.",
      tenant
    });
  } catch (error) {
    console.error("REJECT TENANT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};