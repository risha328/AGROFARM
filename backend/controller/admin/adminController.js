const Admin = require('../../models/Admin');
const asyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');

// @desc    Register a new admin
// @route   POST /api/admin/signup
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    const admin = await Admin.create({
        name,
        email,
        password
    });

    if (admin) {
        generateToken(res, admin._id);
        
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: true
        });
    } else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
});

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id);
        
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: true
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout admin / clear cookie
// @route   POST /api/admin/logout
// @access  Private
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Admin logged out successfully' });
});

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: true
        });
    } else {
        res.status(404);
        throw new Error('Admin not found');
    }
});

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private
const updateAdminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;

        if (req.body.password) {
            admin.password = req.body.password;
        }

        const updatedAdmin = await admin.save();

        res.json({
            _id: updatedAdmin._id,
            name: updatedAdmin.name,
            email: updatedAdmin.email,
            isAdmin: true
        });
    } else {
        res.status(404);
        throw new Error('Admin not found');
    }
});

// In adminController.js
const protectedRoute = asyncHandler(async (req, res) => {
    res.json({
        message: 'This is a protected route',
        admin: req.admin
    });
});

module.exports = {
    registerAdmin,
    authAdmin,
    logoutAdmin,
    protectedRoute,
    getAdminProfile,
    updateAdminProfile
};