const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

const register = async (req, res) => {
    try {
        const { userName, email, password, mobileNumber } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ error: "userName, email, and password are required" });
        }

        const existingEmail = await prisma.client.findUnique({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already registered" });
        }

        if (mobileNumber) {
            const existingMobile = await prisma.client.findUnique({ where: { mobileNumber } });
            if (existingMobile) {
                return res.status(400).json({ error: "Mobile number already registered" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePictureUrl = null;
        if (req.file && req.file.location) {
            profilePictureUrl = req.file.location;
        }

        const newClient = await prisma.client.create({
            data: {
                userName,
                email,
                password: hashedPassword,
                mobileNumber,
                profilePicture: profilePictureUrl,
            },
        });

        const { password: _, ...safeClient } = newClient;

        res.status(201).json({
            message: "Client registered successfully",
            client: safeClient,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllClients = async (req, res) => {
    try {
        const clients = await prisma.client.findMany({
            select: {
                id: true,
                userName: true,
                email: true,
                mobileNumber: true,
                profilePicture: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            message: "All clients fetched successfully",
            total: clients.length,
            clients,
        });
    } catch (error) {
        console.error("Fetch clients error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { register, getAllClients };
