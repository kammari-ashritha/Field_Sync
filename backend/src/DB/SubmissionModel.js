import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    region: { type: String, required: true },
    activityType: { type: String, required: true },
    participantsCount: { type: Number, default: 0 },
    majorIssue: { type: String },
    description: { type: String },
    beneficiaryInfo: { type: String },
    dateConducted: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
