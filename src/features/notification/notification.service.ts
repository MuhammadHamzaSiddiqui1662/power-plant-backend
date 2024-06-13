import { CustomRequestHandler } from "../../types/common";
import { Notification } from "./notification.entity";

export const getAllNotifications: CustomRequestHandler = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createNotification: CustomRequestHandler = async (req, res) => {
    try {
        const { title, description, link, userId } = req.body;
        const newNotification = new Notification({
            title,
            description,
            link,
            userId,
        });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getNotificationById: CustomRequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateNotification: CustomRequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, link, userId } = req.body;
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        if (title) notification.title = title;
        if (description) notification.description = description;
        if (link) notification.link = link;
        if (userId) notification.userId = userId;

        await notification.save();
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteNotification: CustomRequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};
