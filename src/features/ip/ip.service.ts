import { CustomRequestHandler } from "../../types/common";
import { IpStatus } from "../../types/ip";
import { IP } from "./ip.entity";

export const getAllIPs: CustomRequestHandler = async (req, res) => {
  try {
    const ips = await IP.find().select(
      "name description price publishedDate patentNumber category"
    );
    res.status(200).json(ips);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getIPById: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const ip = await IP.findById(id).select(
      "name description price publishedDate patentNumber category"
    );
    if (!ip) {
      return res.status(404).json({ message: "IP not found" });
    }
    res.status(200).json(ip);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getIPDetailsById: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const ip = await IP.findById(id);
    if (!ip) {
      return res.status(404).json({ message: "IP not found" });
    }
    res.status(200).json(ip);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createIP: CustomRequestHandler = async (req, res) => {
  try {
    console.log("create");
    const ipData = JSON.parse(req.body.data || "{}");
    const { files } = req;

    ipData.images = [];
    if (Array.isArray(files)) {
      files.forEach((file) => {
        const filePath = `/uploads/${
          req.baseUrl.split("/").pop() || "default"
        }/${file.filename}`;
        if (file.fieldname === "backgroundImage") {
          ipData.mainImg = filePath;
        } else {
          ipData.images.push(filePath);
        }
      });
    }

    const newIP = new IP({
      ...ipData,
      userId: "6697be93a02430946870a493",
    });
    const savedIP = await newIP.save();
    res.status(201).json(savedIP);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateIP: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const ipData = req.body;
    const updatedIP = await IP.findByIdAndUpdate(id, ipData, { new: true });
    if (!updatedIP) {
      return res.status(404).json({ message: "IP not found" });
    }
    res.status(200).json(updatedIP);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteIP: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const ip = await IP.findByIdAndDelete(id);
    if (!ip) {
      return res.status(404).json({ message: "IP not found" });
    }
    res.status(200).json({ message: "IP deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const publishIp: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedIP = await IP.findByIdAndUpdate(
      id,
      { status: IpStatus.Published },
      { new: true }
    );
    if (!updatedIP) {
      return res.status(404).json({ message: "IP not found" });
    }
    res.status(200).json(updatedIP);
  } catch (error) {
    res.status(500).json(error);
  }
};
