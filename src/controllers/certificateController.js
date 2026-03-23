import PDFDocument from "pdfkit";
import Report from "../models/Report.js";
import User from "../models/User.js";

// 🎓 Generate Certificate
export const generateCertificate = async (req, res) => {
  try {
    const studentId = req.params.id;

    const user = await User.findById(studentId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // get reports
    const reports = await Report.find({ studentId });

    const avgRating =
      reports.reduce((acc, r) => acc + (r.rating || 0), 0) /
      (reports.length || 1);

    // 🎯 AI-like message (simple for now)
    const performance =
      avgRating > 8
        ? "Excellent Performance"
        : avgRating > 5
        ? "Good Performance"
        : "Needs Improvement";

    // 📄 Create PDF
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate-${user.name}.pdf`
    );

    doc.pipe(res);

    // 🎨 Design Certificate
    doc.fontSize(26).text("Internship Certificate", { align: "center" });

    doc.moveDown();
    doc.fontSize(18).text(`This is to certify that`, { align: "center" });

    doc.moveDown();
    doc.fontSize(22).text(user.name, { align: "center", underline: true });

    doc.moveDown();
    doc.fontSize(16).text(
      `has successfully completed the internship with ${performance}.`,
      { align: "center" }
    );

    doc.moveDown();
    doc.text(`Average Rating: ${avgRating.toFixed(1)} / 10`, {
      align: "center",
    });

    doc.moveDown(2);
    doc.text("EduTrack Platform", { align: "center" });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};