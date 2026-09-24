import Tenant from "../models/TenantModel.js"

// Create Tenant
export const createTenant = async (req, res) => {
    try {
        const { name, slug, subdomin, owner, settings} = req.body;
        if(!name || !slug || !subdomin || !owner){
            return res.status(400).json({message: "Please provide all required fields."});
        }
        const existigTenant = await Tenant.findOne ({slug})
        if(existigTenant){
            return res.status(400).json({message: "Tenant already exists."});
        }

        const newTenant = await Tenant.create({
            name,
            slug,
            subdomin,
            owner,
            settings
        })
        return res.status(201).json({message: "Tenant created successfully.", tenant: newTenant});
    } catch (error) {
        res.status(500).json({
              message: error.message
            });
    }
}

// Get Tenant bt ID
export const getTenantById = async (req,res) => {
    try {
        const {id} = req.params;
        const tenant = await Tenant.findById(id);
        if(!tenant){
            return res.status(404).json({message: "Tenant not found."});
        }

        return res.status(200).json({message: "Tenant fetched successfully.", tenant});
        
    } catch (error) {
        res.status(500).json({
              message: error.message
            });
    }
}