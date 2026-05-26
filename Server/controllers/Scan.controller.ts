import { Request, Response } from "express";
import { scanWebsite } from "../services/ScanWebsite";

export const scanWebsiteController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const { url } = req.body;

    if (!url) {
      res.status(400).json({
        message: "URL manquante",
      });

      return;
    }

    const result = await scanWebsite(url);

    res.status(200).json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur lors du scan",
    });

  }
};