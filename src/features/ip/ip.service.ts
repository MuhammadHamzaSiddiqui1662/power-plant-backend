import { CustomRequestHandler } from "../../types/common";
import { IpStatus } from "../../types/ip";
import { IP } from "./ip.entity";
import { ObjectId } from "mongodb";

const generateMatchQueryForAggregation = (filterQuery: {
  [key: string]: string | string[];
}) => {
  const matchStage: any = {};

  if (filterQuery.categories && filterQuery.categories.length > 0) {
    matchStage.categories = {};
    matchStage.categories.$in = Array.isArray(filterQuery.categories)
      ? filterQuery.categories
      : [filterQuery.categories];

    delete filterQuery.categories;
  }

  if (filterQuery.min && filterQuery.min !== "") {
    if (!matchStage.price) matchStage.price = {};
    matchStage.price.$gte = parseFloat(filterQuery.min as string);
    delete filterQuery.min;
  }

  if (filterQuery.max && filterQuery.max !== "") {
    if (!matchStage.price) matchStage.price = {};
    matchStage.price.$lte = parseFloat(filterQuery.max as string);
    delete filterQuery.max;
  }

  for (const [key, value] of Object.entries(filterQuery)) {
    if (typeof value === "string") {
      if (value.startsWith("not_")) {
        matchStage[key] = { $ne: value.substring(4) };
      } else {
        matchStage[key] = value;
      }
    }
  }

  console.log(matchStage);

  return matchStage;
};

export const getAllIPs: CustomRequestHandler = async (req, res) => {
  const userId = req.user?.userId;
  try {
    const ips = await IP.aggregate([
      {
        $match: userId
          ? {
              ...generateMatchQueryForAggregation(req.query as any),
              status: IpStatus.Published,
              userId: {
                $ne: new ObjectId(userId),
              },
            }
          : {
              ...generateMatchQueryForAggregation(req.query as any),
              status: IpStatus.Published,
            },
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          publishedDate: 1,
          patentNumber: 1,
          categories: 1,
          mainImg: 1,
        },
      },
    ]);

    res.status(200).json(ips);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getIPById: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const ip = await IP.findById(id).populate("userId", "reviewsAsInnovator");

    if (!ip) {
      return res.status(404).json({ message: "IP not found" });
    }
    res.status(200).json(ip);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMyIps: CustomRequestHandler = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from the token
    // const { id } = req.params;
    const ips = await IP.find({ userId }).select(
      "name description price publishedDate patentNumber categories mainImg status"
    );

    if (!ips) {
      return res.status(404).json({ message: "IP not found" });
    }
    res.status(200).json(ips);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getIPDetailsById: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const ip = await IP.findById(id).populate("userId", "reviewsAsInnovator");
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
    const ipData = JSON.parse(req.body.data || "{}");
    const { files, user } = req;

    ipData.images = [];
    if (Array.isArray(files)) {
      files.forEach((file) => {
        const filePath = `${req.protocol}://${req.get("host")}/assets/uploads/${
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
      userId: user.userId,
    });
    const savedIP = await newIP.save();
    res.status(201).json(savedIP);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateIP: CustomRequestHandler = async (req, res) => {
  try {
    const ipData = JSON.parse(req.body.data);
    const updatedIP = await IP.findByIdAndUpdate(ipData._id, ipData, {
      new: true,
    });
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
