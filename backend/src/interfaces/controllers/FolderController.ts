import { Request, Response } from "express";
import { FolderService } from "../../application/services/FolderService";

export class FolderController {
  constructor(private folderService: FolderService) {}

  getFolderTree = async (req: Request, res: Response): Promise<void> => {
    try {
      const tree = await this.folderService.getFolderTree();
      res.json({ success: true, data: tree });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getFolderContents = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const contents = await this.folderService.getFolderContents(id);
      res.json({ success: true, data: contents });
    } catch (error: any) {
      if (error.message === "Folder not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  };

  search = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.q as string;
      const results = await this.folderService.search(query);
      res.json({ success: true, data: results });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
