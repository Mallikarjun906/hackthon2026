import PDFDocument from "pdfkit";
import fs from "fs";

export const generateCertificate = (req, res) => {
  const doc = new PDFDocument();

  const filePath = `uploads/certificates/${Date.now()}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("INTERNSHIP CERTIFICATE", { align: "center" });
  doc.moveDown();
  doc.text("This certifies successful completion.");

  doc.end();

  res.json({ filePath });
};